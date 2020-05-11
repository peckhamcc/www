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
  if (event.body.token !== process.env.TOKEN) {
    throw new Error('Denied')
  }

  const db = new AWS.DynamoDB({
    region: config.aws.dynamodb.region
  })

  const scanResults = []
  const params = { TableName: process.env.AWS_DB_TABLE }
  let items = {
    LastEvaluatedKey: true
  }

  do {
    items = await db.scan(params).promise()
    items.Items.forEach((item) => scanResults.push(item))
    params.ExclusiveStartKey = items.LastEvaluatedKey
  } while (items.LastEvaluatedKey)

  return scanResults
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        token: { type: 'string', pattern: '.+' }
      },
      required: ['token']
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
