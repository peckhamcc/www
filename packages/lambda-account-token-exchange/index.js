const middy = require('middy')
const {
  jsonBodyParser,
  validator,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const {
  errorHandler
} = require('./middleware')
const {
  exchangeToken
} = require('./account')

async function handleExchangeToken ({ body: { token: loginToken } }) {
  const fullToken = await exchangeToken(loginToken)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: fullToken
    })
  }
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          transform: ['trim']
        }
      },
      required: ['token']
    }
  }
}

module.exports = {
  handler: middy(handleExchangeToken)
    .use(httpHeaderNormalizer())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
