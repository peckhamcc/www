const middy = require('middy')
const {
  cors,
  jsonBodyParser,
  validator
} = require('middy/middlewares')
const {
  errorHandler,
  tokenValidator
} = require('./middleware')
const {
  createPayment,
  getOrders
} = require('./square-client')
const {
  config
} = require('./config')
const {
  addUserOrder,
  getUser
} = require('./account')
const {
  sendEmail
} = require('./email')

async function paymentsCreateHandler ({ body: { orderId, paymentNonce, idempotencyKey }, user: userId }) {
  const errors = await createPayment(
    config.square.locationId,
    orderId,
    paymentNonce,
    idempotencyKey
  )

  if (!errors.length) {
    await addUserOrder(userId, orderId)

    const user = await getUser(userId)

    console.info('got user', user)

    console.info('getting orders')
    const [order] = await getOrders(config.square.locationId, [orderId])

    console.info(JSON.stringify(order, null, 2))

    const args = [
      user.firstName,
      orderId,
      order.lineItems.map(item => ({
        quantity: item.quantity,
        name: item.name,
        unitAmount: item.basePriceMoney.amount,
        totalAmount: item.totalMoney.amount,
        description: item.variationName
      })),
      order.totalMoney.amount
    ]

    await sendEmail(user.email, config.email.from, 'PCC Log In', htmlTemplate(...args), textTemplate(...args))
  }

  return {
    statusCode: 200,
    body: errors
  }
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        idempotencyKey: {
          type: 'string'
        },
        orderId: {
          type: 'string'
        },
        paymentNonce: {
          type: 'string'
        }
      },
      required: [
        'idempotencyKey',
        'orderId',
        'paymentNonce'
      ]
    }
  }
}

module.exports = {
  handler: middy(paymentsCreateHandler)
    .use(errorHandler())
    .use(tokenValidator())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}

const htmlTemplate = (firstName, orderId, lineItems, amount) => `
<html>
  <head>
  </head>
  <body>
    <p>Hi ${firstName},</p>
    <p>Thanks for your order. Your order number is:</p>
    <p>${orderId}</p>
    <p>The items you have ordered are:</p>
    <p>
      ${displayItems(lineItems, '&pound;', '<br />')}
    </p>
    <p>Total value: &pound;${formatCurrency(amount)}</p>
    <p>We aim to submit orders to the factory every two months.</p>
    <p>
      It then typically takes a further six weeks to print, after which your items will be held at
      <a href="https://ratracecycles.com">Rat Race Cycles</a> for you to pick up.
    </p>
    <p>Once we know the delivery date for your items we'll send you an email to let you know.</p>
    <p>Please get in touch if you'd like any updates in the interim.</p>
    <p>Thank you,</p>
    <p>Peckham Cycle Club</p>
    <p>
      <a href="mailto:peckhamcc@gmail.com">peckhamcc@gmail.com</a><br />
      <a href="https://peckham.cc">https://peckham.cc</a><br />
      <a href="https://facebook.com/PeckhamCC">https://facebook.com/PeckhamCC</a><br />
      <a href="https://twitter.com/PeckhamCC">https://twitter.com/PeckhamCC</a><br />
      <a href="https://instagram.com/PeckhamCC">https://instagram.com/PeckhamCC</a>
    </p>
  </body>
</html>
`

const textTemplate = (firstName, orderId, lineItems, amount) => `
Hi ${firstName},

Thanks for your order. Your order number is:

${orderId}

The items you have ordered are:

${displayItems(lineItems, '£', '\r\n')}

Total value: £${formatCurrency(amount)}

We aim to submit orders to the factory every two months.

It then typically takes about six weeks to print, after which your items will be held at Rat Race Cycles for you to pick up.

Once we know the delivery date for your items we'll send you an email to let you know.

Please get in touch if you'd like any updates in the interim.

Thank you,

Peckham Cycle Club

peckhamcc@gmail.com
https://peckham.cc
https://facebook.com/PeckhamCC
https://twitter.com/PeckhamCC
https://instagram.com/PeckhamCC
`

const formatCurrency = (amount) => {
  return (amount / 100).toFixed(2)
}

const displayItems = (lineItems, pound, delimiter) => {
  return lineItems.map(lineItem => {
    let output = `${lineItem.quantity}x ${lineItem.name} @ ${pound}${formatCurrency(lineItem.unitAmount)} = ${pound}${formatCurrency(lineItem.totalAmount)}`

    if (lineItem.description && lineItem.description.trim()) {
      output += `${delimiter}${lineItem.description.trim()}`
    }

    return output
  })
    .join(`${delimiter}${delimiter}`)
}
