const middy = require('middy')
const httpErrors = require('http-errors')
const {
  cors
} = require('middy/middlewares')
const {
  errorHandler
} = require('./middleware')
const {
  getUserIdForCustomerId,
  getUser
} = require('./account')
const {
  getOrder,
  setPaymentMetadata,
  getPayment,
  getCheckoutSession
} = require('./stripe-client')
const {
  sendEmail
} = require('./email')
const {
  orderShippedEmail
} = require('./emails')
const {
  config
} = require('./config')
const crypto = require('crypto')

function createSignature (body, secretKey) {
  const shasum = crypto.createHash('sha1')
  shasum.update(body + secretKey)

  return shasum.digest('hex')
}

async function inkthreadableWebhook ({ queryStringParameters, body }) {
  console.info('query', JSON.stringify(queryStringParameters, null, 2))
  console.info('event', JSON.stringify(JSON.parse(body), null, 2))

  if (!queryStringParameters || !queryStringParameters.Signature) {
    throw new httpErrors.BadRequest('No signature found in webhook query string parameters')
  }

  if (!queryStringParameters || !queryStringParameters.AppId) {
    throw new httpErrors.BadRequest('No AppId found in webhook query string parameters')
  }

  if (queryStringParameters.AppId !== config.inkthreadable.appId) {
    throw new httpErrors.BadRequest('Incorrect AppId found in webhook query string parameters')
  }

  const signature = createSignature(body, config.inkthreadable.secretKey)

  if (signature !== queryStringParameters.Signature) {
    throw new httpErrors.BadRequest('Incorrect Signature found in webhook query string parameters')
  }

  const {
    order
  } = JSON.parse(body)

  if (!order || order.type !== 'order') {
    throw new httpErrors.BadRequest('No order found in webhook event')
  }

  const paymentIntent = order.external_id

  if (!paymentIntent) {
    throw new httpErrors.BadRequest('No external order id found in webhook event')
  }

  const checkoutSession = await getCheckoutSession(paymentIntent)

  if (!checkoutSession) {
    throw new httpErrors.BadRequest('No checkout session found for payment intent')
  }

  const {
    customer: customerId
  } = checkoutSession

  if (!customerId) {
    throw new httpErrors.BadRequest('No customer id found in checkout session')
  }

  const userId = await getUserIdForCustomerId(customerId)

  if (!userId) {
    throw new httpErrors.BadRequest('No user id found for customer id')
  }

  const user = await getUser(userId)

  if (!user) {
    throw new httpErrors.BadRequest('No user found for user id')
  }

  const { items: orderItems } = await getOrder(paymentIntent)
  const { metadata } = await getPayment(paymentIntent)

  if (order.deleted) {
    console.info('Order', order.id, 'paymentIntent', paymentIntent, 'was cancelled')

    // order was deleted
    orderItems.forEach((item, index) => {
      if (item.productMetadata.type === 'dropship') {
        metadata[`item-${index}`] = 'cancelled'
      }
    })
  } else if (order.status === 'shipped') {
    console.info('Order', order.id, 'paymentIntent', paymentIntent, 'was shipped')

    // update order status
    orderItems.forEach((item, index) => {
      if (item.productMetadata.type === 'dropship') {
        metadata[`item-${index}`] = 'shipped'
      }
    })

    metadata.shipping = JSON.stringify(order.shipping || {})

    await sendEmail(user.email, config.email.from, 'PCC order shipped', orderShippedEmail.html(user.name), orderShippedEmail.text(user.name))
  }

  await setPaymentMetadata(paymentIntent, metadata)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
}

module.exports = {
  handler: middy(inkthreadableWebhook)
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
