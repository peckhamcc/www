var braintree = require('braintree')
var gateway = braintree.connect({
  environment: braintree.Environment[process.env.BT_ENVIRONMENT],
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
})

const allowedOrigins = [
  'https://dev.peckham.cc',
  'https://www.peckham.cc',
  'https://peckham.cc'
]

const respond = (statusCode, event, response, callback) => {
  let allowOrigin = 'null'

  if (event && event.headers && allowedOrigins.includes(event.headers.origin)) {
    allowOrigin = event.headers.origin
  }

  callback(null, {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Credentials': true
    },
    body: response ? JSON.stringify(response, null, 2) : '',
    isBase64Encoded: false
  })
}

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

    respond(statusCode, event, responseBody, callback)
  })
}
