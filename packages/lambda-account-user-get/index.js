const middy = require('middy')
const {
  jsonBodyParser,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const {
  errorHandler,
  tokenValidator
} = require('./middleware')
const {
  getUser
} = require('./account')

async function getUserHandler ({ userId }) {
  return {
    statusCode: 200,
    body: await getUser(userId)
  }
}

module.exports = {
  handler: middy(getUserHandler)
    .use(httpHeaderNormalizer())
    .use(tokenValidator())
    .use(jsonBodyParser())
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
