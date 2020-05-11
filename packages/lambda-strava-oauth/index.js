const middy = require('middy')
const { HttpError } = require('http-errors')
const {
  jsonBodyParser,
  validator,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const https = require('https')
const querystring = require('querystring')
const AWS = require('aws-sdk')
const config = require('./config')

async function sendCode (code) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code
    })

    const options = {
      hostname: 'www.strava.com',
      path: '/api/v3/oauth/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }

    const req = https.request(options, (res) => {
      res.setEncoding('utf8')
      let body = ''
      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        resolve(JSON.parse(body))
      })
    })

    req.on('error', err => {
      reject(err)
    })

    // Write data to request body
    req.write(postData)
    req.end()
  })
}

async function exchangeCode (event) {
  console.info(event)
  const { query: { code }} = event
  const result = await sendCode(code)

  const db = new AWS.DynamoDB({
    region: config.aws.dynamodb.region
  })

  await db.putItem({
    TableName: process.env.AWS_DB_TABLE,
    Item: {
      id: result.athlete.id,
      ...result
    }
  })
    .promise()
}

const inputSchema = {
  type: 'object',
  properties: {
    query: {
      type: 'object',
      properties: {
        code: {
          type: 'string'
        }
      },
      required: ['code']
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
  handler: middy(exchangeCode)
    .use(httpHeaderNormalizer())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
