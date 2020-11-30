const middy = require('middy')
const { HttpError } = require('http-errors')
const {
  jsonBodyParser,
  validator,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const {
  errorHandler,
  tokenValidator
} = require('./middleware')

async function setPreferences (event) {
  // DynamoDB schema - pcc-ride-roulette-preferences

  // email: S
  // expires: N - epoch timestamp
  // preferences: {
  //  '2020-02-10': {
  //    'distance': 'short'
  //    'speed': 'social'
  //    'type': 'road'
  //  }
  // }
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

module.exports = {
  handler: middy(setPreferences)
    .use(httpHeaderNormalizer())
    .use(tokenValidator())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
