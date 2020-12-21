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
  getUser,
  getUserFoPCCStatus,
  getUserOrders,
  getUserTrainingSessions
} = require('./account')

async function getUserHandler ({ user }) {
  const [
    profile,
    membership,
    orders,
    events
  ] = await Promise.all([
    getUser(user),
    getUserFoPCCStatus(user),
    getUserOrders(user),
    getUserTrainingSessions(user)
  ])

  return {
    statusCode: 200,
    body: {
      profile,
      membership,
      orders,
      events
    }
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
