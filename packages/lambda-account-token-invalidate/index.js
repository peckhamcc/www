const middy = require('middy')
const {
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const {
  errorHandler,
  tokenValidator
} = require('./middleware')
const {
  invalidateToken
} = require('./account')

async function handleInvalidateToken ({ headers: { authorization: token } }) {
  await invalidateToken(token)

  return {
    statusCode: 204
  }
}

module.exports = {
  handler: middy(handleInvalidateToken)
    .use(httpHeaderNormalizer())
    .use(tokenValidator())
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
