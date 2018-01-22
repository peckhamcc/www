var stripe = require('stripe')(process.env.STRIPE_KEY)

exports.handler = (event, context, callback) => {
  stripe.charges.create({
    amount: event.amount,
    currency: event.currency,
    description: event.description,
    source: event.token
  }, (error, result) => {
    var statusCode = 200
    var responseBody = {}

    if (error) {
      statusCode = 500

      if (error.statusCode === 401) {
        statusCode = 502
      }

      responseBody.message = error.message
      responseBody.stack = error.stack
    } else {
      responseBody.result = result
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
