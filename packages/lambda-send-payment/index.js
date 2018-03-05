var braintree = require('braintree')
var gateway = braintree.connect({
  environment: braintree.Environment[process.env.BT_ENVIRONMENT],
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
})

exports.handler = (event, context, callback) => {
  // Work out total cost of items
  const amount = event.items.reduce((total, item) => {
    return total + 0
  }, 0)

  // n.b. need to contact braintree support for find our amount limit and enforce that here

  // store in a vault?

  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: event.nonce,
    options: {
      submitForSettlement: true
    }
  }, (error, result) => {
    let statusCode = 500
    let responseBody = {}

    console.info(error, result)

    if (error) {
      console.error(error)
      statusCode = 500
    }

    if (result.errors) {
      statusCode = result.code
      responseBody = {
        errors: result.errors.deepErrors()
      }
    } else if (result.transaction) {
      statusCode = 200
      responseBody = {
        transaction: result.transaction.id
      }
    }

    var response = {
      statusCode: statusCode,
      headers: {},
      body: JSON.stringify(responseBody),
      isBase64Encoded: false
    }

    callback(null, response)
  })
}
