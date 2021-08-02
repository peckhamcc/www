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
  getOrder,
  getPayment
} = require('./stripe-client')
const {
  getUser
} = require('./account')

async function ordersGetHandler ({ userId, pathParameters }) {
  const user = await getUser(userId)

  if (!user) {
    throw new httpErrors.BadRequest('No user found for that ID')
  }

  const paymentIntentId = pathParameters.orderId

  if (!paymentIntentId) {
    throw new httpErrors.BadRequest('No payment intent found in request')
  }

  const order = await getOrder(paymentIntentId)

  if (!order) {
    throw new httpErrors.BadRequest('No order found for payment intent')
  }

  const { metadata: paymentMetadata } = await getPayment(paymentIntentId)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: order.items,
      shipping: JSON.parse(paymentMetadata.shipping || '{}')
    })
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
