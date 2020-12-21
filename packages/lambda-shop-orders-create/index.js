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
  createOrder,
  getOrCreateCustomerId
} = require('./square-client')
const {
  nanoid
} = require('nanoid')
const {
  config
} = require('./config')
const {
  updateUser,
  getUser
} = require('./account')

async function ordersCreateHandler ({ body: { user, items }, user: userId }) {
  const idempotencyKey = nanoid()
  const locationId = config.square.locationId

  await updateUser(userId, user)

  const customerId = await getOrCreateCustomerId(user)

  return {
    statusCode: 200,
    body: {
      idempotencyKey,
      user: await getUser(userId),
      ...(await createOrder(customerId, locationId, items, idempotencyKey))
    }
  }
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string'
              },
              quantity: {
                type: 'string'
              }
            },
            required: [
              'id', 'quantity'
            ]
          }
        },
        shopCode: {
          type: 'string',
          const: process.env.PCC_SHOP_CODE
        },
        user: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              pattern: '.+'
            },
            lastName: {
              type: 'string',
              pattern: '.+'
            },
            email: {
              type: 'string',
              pattern: '.+'
            },
            telephone: {
              type: 'string',
              pattern: '.+'
            },
            address1: {
              type: 'string',
              pattern: '.+'
            },
            address2: {
              type: 'string'
            },
            address3: {
              type: 'string'
            },
            postCode: {
              type: 'string',
              pattern: '.+'
            }
          },
          required: [
            'firstName', 'lastName', 'email', 'telephone', 'address1', 'postCode'
          ]
        }
      },
      required: [
        'items', 'shopCode', 'user'
      ]
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
