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
  // updateOrder,
  getOrder
} = require('./kit')
const {
  getOrder: getMemberOrder,
  getPayment
  // setPaymentMetadata
} = require('./stripe-client')
// const { config } = require('./config')
// const {
// sendEmail
// } = require('./email')

async function kitOrdersUpdateHandler ({ userId, body: { id, ...details } }) {
  const user = await getUser(userId)

  if (!user) {
    throw new httpErrors.BadRequest('No user found for that ID')
  }

  if (!user.kitAdmin) {
    throw new httpErrors.Forbidden('Nope')
  }

  // await updateOrder(id, details)

  const order = await getOrder(id)
  const emailed = {}

  if (details.status) {
    for (const item of order.items) {
      const memberOrder = await getMemberOrder(item.payment)

      if (memberOrder.deleted) {
        // order has been cancelled
        continue
      }

      const { customer, metadata } = await getPayment(item.payment)
      let updatedStatus = false

      // update order status for made to order items
      memberOrder.items.forEach((item, index) => {
        if (item.productMetadata.type === 'made-to-order') {
          updatedStatus = true
          metadata[`item-${index}`] = details.status
        }
      })

      if (updatedStatus) {
        // await setPaymentMetadata(item.payment, metadata)
      }

      if (details.status === 'ready') {
        const userId = await getUserIdForCustomerId(customer)

        if (!emailed[userId]) {
          emailed[userId] = true

          const user = await getUser(userId)

          console.info('would email', user.email)

          // send email
          // await sendEmail(user.email, config.email.from, 'PCC order ready for collection', htmlTemplate(user.name), textTemplate(user.name))
        }
      }
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
}
/*
const htmlTemplate = (name) => `
<html>
  <head>
  </head>
  <body>
    <p>Hi ${name},</p>
    <p>Your PCC kit order is ready to be picked up from Rat Race Cycles</p>
  </body>
</html>
`

const textTemplate = (name) => `
Hi ${name},

Your PCC kit order is ready to be picked up from Rat Race Cycles
`
*/
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
