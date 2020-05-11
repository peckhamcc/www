const middy = require('middy')
const { HttpError } = require('http-errors')
const {
  jsonBodyParser,
  validator,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const AWS = require('aws-sdk')
const { config } = require('./config')

async function updateUser (event) {
  if (event.headers.Authorization !== process.env.AUTH_TOKEN) {
    return {
      statusCode: 403
    }
  }

  const db = new AWS.DynamoDB({
    region: config.aws.dynamodb.region
  })

  await db.update({
    TableName: process.env.AWS_DB_TABLE,
    Key: {
      id: `${event.path.id}`
    },
    UpdateExpression: 'set access_token=:a, refresh_token=:r, expires_at=:e, expires_in:i',
    ExpressionAttributeValues: {
      ':a': event.body.access_token,
      ':r': event.body.refresh_token,
      ':e': `${event.body.expires_at}`,
      ':i': `${event.body.expires_in}`
    },
    ReturnValues: 'UPDATED_NEW'
  }).promise()
}

const inputSchema = {
  type: 'object',
  properties: {
    headers: {
      type: 'object',
      properties: {
        Authorization: { type: 'string', pattern: '.+' }
      },
      required: ['Authorization']
    },
    path: {
      type: 'object',
      properties: {
        id: { type: 'number', pattern: '.+' }
      },
      required: ['id']
    },
    body: {
      type: 'object',
      properties: {
        access_token: { type: 'string', pattern: '.+' },
        refresh_token: { type: 'string', pattern: '.+' },
        expires_at: { type: 'number', pattern: '.+' },
        expires_in: { type: 'number', pattern: '.+' }
      },
      required: ['access_token', 'refresh_token', 'expires_at', 'expires_in']
    }
  }
}

const errorHandler = () => ({
  onError: (handler, next) => {
    if (handler.error instanceof HttpError) {
      if (handler.error.message.includes('failed validation')) {
        const details = handler.error.details[0]

        handler.response = {
          statusCode: 422,
          body: JSON.stringify({
            field: details.dataPath.replace('.body.', '')
          })
        }

        next()
      } else {
        next(handler.error)
      }
    } else {
      next(handler.error)
    }
  }
})

module.exports = {
  handler: middy(updateUser)
    .use(httpHeaderNormalizer())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
