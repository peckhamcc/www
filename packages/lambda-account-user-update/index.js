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
  updateUser
} = require('./account')

async function updateUserHandler (event) {
  return {
    statusCode: 200,
    body: await updateUser(event.user, event.body)
  }
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string'
        },
        lastName: {
          type: 'string'
        },
        address1: {
          type: 'string'
        },
        address2: {
          type: 'string'
        },
        address3: {
          type: 'string'
        },
        postCode: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        telephone: {
          type: 'string'
        },
        gender: {
          type: 'string'
        },
        size: {
          type: 'string'
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
