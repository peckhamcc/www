const middy = require('middy')
const {
  cors
} = require('middy/middlewares')
const {
  errorHandler,
  tokenValidator
} = require('./middleware')
const {
  getOrders
} = require('./stripe-client')
const {
  getUser
} = require('./account')

async function ordersGetHandler ({ userId }) {
  const user = await getUser(userId)
  const orders = await getOrders(user)

  return {
    statusCode: 200,
    body: orders
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
