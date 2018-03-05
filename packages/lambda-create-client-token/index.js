var braintree = require('braintree')
var gateway = braintree.connect({
  environment: braintree.Environment[process.env.BT_ENVIRONMENT],
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
})

exports.handler = (event, context, callback) => {
  gateway.clientToken.generate({}, (error, result) => {
    var statusCode = 200
    var responseBody = {}

    if (error) {
      statusCode = 500

      console.error(error)
    } else {
      responseBody.clientToken = result.clientToken
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
