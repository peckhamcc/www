const middy = require('middy')
const { HttpError } = require('http-errors')
const {
  jsonBodyParser,
  validator,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const {
  getMany
} = require('./db')

async function readTokens (event) {
  if (event.header.Authorization !== process.env.AUTH_TOKEN) {
    return {
      statusCode: 403
    }
  }

  const results = []

  for await (const item of getMany(process.env.AWS_STRAVA_OAUTH_TABLE)) {
    results.push({
      id: parseInt(item.id),
      refresh_token: item.refresh_token,
      access_token: item.access_token
    })
  }

  return results
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
