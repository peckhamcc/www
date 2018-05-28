const {
  waterfall,
  capitalise
} = require('./utils')
const sendEmail = require('./send-email')
const makePayment = require('./make-payment')
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
      // 127 char limit
      description: [item.gender && `Gender: ${item.gender.name}`, item.size && `Size: ${item.size.name}`]
        .concat(item.variants
          ? Object.keys(item.variants)
            .map(variant =>
              `${capitalise(variant)}: ${item.variants[variant].name}`) : [])
        .filter(Boolean)
        .join(', ')
        .trim()
    }
  })

  amount = toCurrencyString(amount)

  waterfall([
    (cb) => makePayment(amount, event.nonce, lineItems, event.firstName, event.lastName, event.email, cb),
    (transactionId, cb) => sendEmail(event.email, event.firstName, event.lastName, lineItems, amount, transactionId, cb)
  ], (error, results) => {
    let statusCode = 500
    let responseBody = {}
    const [
      paymentResult
    ] = results || []

    if (error) {
      console.error(error)
      statusCode = 500

      if (error.errors) {
        console.error(error.errors)
        statusCode = 400

        responseBody = {
          errors: paymentResult && paymentResult.errors && paymentResult.errors.deepErrors()
        }
      }
    }

    if (paymentResult) {
      statusCode = 200
      responseBody = {
        transaction: paymentResult
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
