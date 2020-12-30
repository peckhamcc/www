const middy = require('middy')
const httpErrors = require('http-errors')
const {
  cors
} = require('middy/middlewares')
const {
  errorHandler,
  tokenValidator
} = require('./middleware')
const {
  getOrderItems
} = require('./stripe-client')
const {
  getUser
} = require('./account')

async function ordersGetHandler ({ userId, pathParameters }) {
  const user = await getUser(userId)

  if (!user) {
    throw new httpErrors.BadRequest('No user found for that ID')
  }

  const items = await getOrderItems(pathParameters.orderId)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(items)
  }
}

module.exports = {
  handler: middy(ordersGetHandler)
    .use(errorHandler())
    .use(tokenValidator())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
