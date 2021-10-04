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

async function readTokens (event) {
  if (event.header.Authorization !== process.env.AUTH_TOKEN) {
    return {
      statusCode: 403
    }
  }

  const db = new AWS.DynamoDB({
    region: config.aws.dynamodb.region
  })

  if (!process.env.AWS_STRAVA_OAUTH_TABLE) {
    throw new Error('No AWS_STRAVA_OAUTH_TABLE var found in environment')
  }

  const scanResults = []
  const params = { TableName: process.env.AWS_STRAVA_OAUTH_TABLE }
  let items = {
    LastEvaluatedKey: true
  }

  do {
    items = await db.scan(params).promise()
    items.Items.forEach((item) => scanResults.push({
      id: parseInt(item.id.S),
      refresh_token: item.refresh_token.S,
      access_token: item.access_token.S
    }))
    params.ExclusiveStartKey = items.LastEvaluatedKey
  } while (items.LastEvaluatedKey)

  return scanResults
}

const inputSchema = {
  type: 'object',
  properties: {
    header: {
      type: 'object',
      properties: {
        Authorization: { type: 'string', pattern: '.+' }
      },
      required: ['Authorization']
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
  handler: middy(readTokens)
    .use(httpHeaderNormalizer())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
