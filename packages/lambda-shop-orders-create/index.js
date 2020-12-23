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
  createCheckoutSession,
  getOrCreateCustomerId
} = require('./stripe-client')
const {
  updateUser,
  getUser
} = require('./account')

async function ordersCreateHandler ({ userId, body: items }) {
  const user = await getUser(userId)

  if (!user.stripeCustomerId) {
    user.stripeCustomerId = await getOrCreateCustomerId(user)

    await updateUser(userId, {
      stripeCustomerId: user.stripeCustomerId
    })
  }

  const sessionId = await createCheckoutSession(user, items)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sessionId
    })
  }
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          slug: {
            type: 'string'
          },
          quantity: {
            type: 'string'
          },
          options: {
            type: 'object'
          }
        },
        required: [
          'slug', 'quantity'
        ]
      }
    }
  }
}

module.exports = {
  handler: middy(ordersCreateHandler)
    .use(errorHandler())
    .use(tokenValidator())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
