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
  getOrderItems,
  getPaymentMetadata
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

  const items = await getOrderItems(paymentIntentId)

  // order items are cached, payment metadata is not as it is
  // updated as the order progresses
  const paymentMetadata = await getPaymentMetadata(paymentIntentId)

  items.forEach((item, index) => {
    item.status = paymentMetadata[`item-${index}`]
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items,
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
