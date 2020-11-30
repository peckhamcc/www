const middy = require('middy')
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

async function generateRides (event) {
  // DynamoDB schema

  // id: S
  // expires: N - epoch timestamp
  // ??
}

const inputSchema = {
  type: 'object',
  properties: {}
}

module.exports = {
  handler: middy(generateRides)
    .use(httpHeaderNormalizer())
    .use(tokenValidator())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
