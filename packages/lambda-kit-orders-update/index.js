const middy = require('middy')
const httpErrors = require('http-errors')
const {
  jsonBodyParser,
  validator,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const {
  errorHandler,
  tokenValidator
} = require('./middleware')
const {
  getUser,
  getUserIdForCustomerId
} = require('./account')
const {
  updateOrder,
  getOrder
} = require('./kit')
const {
  getOrder: getMemberOrder,
  getCachedPayment,
  setPaymentMetadata
} = require('./stripe-client')
const { config } = require('./config')
const {
  sendEmail
} = require('./email')

async function kitOrdersUpdateHandler ({ userId, body: { id, ...details } }) {
  const user = await getUser(userId)

  if (!user) {
    throw new httpErrors.BadRequest('No user found for that ID')
  }

  if (!user.kitAdmin) {
    throw new httpErrors.Forbidden('Nope')
  }

  await updateOrder(id, details)

  const order = await getOrder(id)
  const emails = {}

  if (details.status) {
    for (const item of order.items) {
      const memberOrder = await getMemberOrder(item.payment)

      if (memberOrder.deleted) {
        // order has been cancelled
        continue
      }

      const { customer, metadata } = await getCachedPayment(item.payment)
      let updatedStatus = false

      // update order status for made to order items
      memberOrder.items.forEach((item, index) => {
        if (item.productMetadata.type === 'made-to-order') {
          updatedStatus = true
          metadata[`item-${index}`] = details.status
        }
      })

      if (updatedStatus) {
        await setPaymentMetadata(item.payment, metadata)
      }

      if (details.status === 'ready') {
        const userId = await getUserIdForCustomerId(customer)

        if (!userId) {
          console.info('Could not look up user id for', customer)
          continue
        }

        const user = await getUser(userId)

        emails[userId] = emails[userId] || {
          name: user.name,
          email: user.email,
          items: []
        }

        emails[userId].items.push(...memberOrder.items
          .filter(item => item.productMetadata.type === 'made-to-order')
          .map(item => `${item.quantity}x ${item.name} ${item.description ? `- ${item.description}` : ''}`)
        )
      }
    }

    await Promise.all(
      Object.keys(emails)
        .map(userId => emails[userId])
        .map(async ({ name, email, items }) => {
          await sendEmail(email, config.email.from, 'PCC order ready for collection', htmlTemplate(name, items), textTemplate(name, items))
        })
    )
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
}

const htmlTemplate = (name, items) => `
<html>
  <head>
  </head>
  <body>
    <p>Hi ${name},</p>
    <p>You have PCC kit ready to be picked up from Rat Race Cycles.</p>
    <p>The item(s) are:</p>
    <p>${items.join('<br />')}</p>
    <p>United we roll!</p>
    <p>Peckham Cycle Club</p>
  </body>
</html>
`

const textTemplate = (name, items) => `
Hi ${name},

You have PCC kit ready to be picked up from Rat Race Cycles.

The items are:

${items.join('\n')}

United we roll!

Peckham Cycle Club
`

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          transform: ['trim']
        },
        status: {
          type: 'string',
          transform: ['trim', 'toLowerCase'],
          enum: [
            'pending',
            'production',
            'shipped',
            'ready'
          ]
        }
      }
    }
  }
}

module.exports = {
  handler: middy(kitOrdersUpdateHandler)
    .use(httpHeaderNormalizer())
    .use(errorHandler())
    .use(tokenValidator())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
