const braintree = require('braintree')
const gateway = braintree.connect({
  environment: braintree.Environment[process.env.BT_ENVIRONMENT],
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
})
const {
  config
} = require('./config')

const toCurrencyString = (amount) => {
  const asString = amount.toString()

  return `${asString.substring(0, asString.length - 2)}.${asString.substring(asString.length - 2)}`
}

exports.handler = (event, context, callback) => {
  let amount = 0

  // What did they order
  const lineItems = event.items.map(item => {
    const lineItem = config.store.products.find(lineItem => lineItem.sku === item.sku)

    // Work out total cost of items
    amount += (lineItem.price * item.quantity)

    return {
      kind: 'debit',
      name: item.sku,
      quantity: item.quantity,
      totalAmount: toCurrencyString(lineItem.price * item.quantity),
      unitAmount: toCurrencyString(lineItem.price),
      productCode: `${item.gender ? item.gender.name : ''} ${item.size ? item.size.code : ''}`.trim() || undefined
    }
  })

  amount = toCurrencyString(amount)

  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: event.nonce,
    lineItems: lineItems,
    merchantAccountId: process.env.BT_MERCHANT_ACCOUNT_ID,
    customer: {
      firstName: event.firstName,
      lastName: event.lastName,
      email: event.email
    },
    options: {
      submitForSettlement: true
    }
  }, (error, result) => {
    let statusCode = 500
    let responseBody = {}

    if (error) {
      console.error(error)
      statusCode = 500
    }

    if (result) {
      if (!result.success) {
        statusCode = 400
      }

      if (result.errors) {
        console.error('Errors', result.errors.deepErrors())

        responseBody = {
          errors: result.errors.deepErrors()
        }
      }

      if (result.transaction) {
        statusCode = 200
        responseBody = {
          transaction: result.transaction.id
        }
      }
    }

    const response = {
      statusCode: statusCode,
      headers: {},
      body: JSON.stringify(responseBody),
      isBase64Encoded: false
    }

    callback(null, response)
  })
}
