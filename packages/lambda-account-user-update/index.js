const middy = require('middy')
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
  updateUser
} = require('./account')
const {
  updateCustomer
} = require('./stripe-client')

async function updateUserHandler ({ userId, body: details }) {
  const user = await getUser(userId)

  await updateCustomer(user, details)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(await updateUser(userId, details))
  }
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          transform: ['trim']
        },
        email: {
          type: 'string',
          format: 'email',
          transform: ['trim', 'toLowerCase']
        },
        phone: {
          type: 'string',
          transform: ['trim']
        },
        gender: {
          type: 'string',
          transform: ['trim'],
          enum: [
            'M',
            'F'
          ]
        },
        size: {
          type: 'string',
          transform: ['trim'],
          enum: [
            'XXS',
            'XS',
            'S',
            'M',
            'L',
            'XL',
            '2XL',
            '3XL'
          ]
        }
      }
    }
  }
}

module.exports = {
  handler: middy(updateUserHandler)
    .use(httpHeaderNormalizer())
    .use(tokenValidator())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
