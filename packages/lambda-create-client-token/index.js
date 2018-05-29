const middy = require('middy')
const {
  httpErrorHandler,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const braintree = require('braintree')
const gateway = braintree.connect({
  environment: braintree.Environment[process.env.BT_ENVIRONMENT],
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
})

const createClientToken = function (body, context, callback) {
  console.info('Creating client token')
  try {
    console.info('Args', Array.prototype.slice.call(arguments))
  } catch (error) {
    console.error(error)
  }

  return gateway.clientToken.generate()
}

const handler = middy(createClientToken)
  .use(cors({
    origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
  }))
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler())

module.exports = {
  handler
}
