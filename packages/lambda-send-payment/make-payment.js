const braintree = require('braintree')
const gateway = braintree.connect({
  environment: braintree.Environment[process.env.BT_ENVIRONMENT],
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
})

module.exports = (amount, nonce, lineItems, firstName, lastName, email, callback) => {
  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonce,
    lineItems: lineItems,
    merchantAccountId: process.env.BT_MERCHANT_ACCOUNT_ID,
    customer: {
      firstName: firstName,
      lastName: lastName,
      email: email
    },
    options: {
      submitForSettlement: true
    }
  }, (error, result) => {
    if (error) {
      return callback(error)
    }

    if (!result) {
      console.info('Result:', JSON.stringify(result, null, 2))
      return callback(new Error('There was no error but also no result!'))
    }

    if (result.errors) {
      console.info('Result:', JSON.stringify(result, null, 2))
      const error = new Error('Error processing payment')
      error.errors = result.errors.deepErrors()

      return callback(error)
    }

    if (!result.success) {
      console.info('Result:', JSON.stringify(result, null, 2))
      return callback(new Error('Result was not an error but also not a success?'))
    }

    if (!result.transaction || !result.transaction.id) {
      console.info('Result:', JSON.stringify(result, null, 2))
      return callback(new Error('Result was not an error but there was no transaction id?'))
    }

    callback(null, result.transaction.id)
  })
}
