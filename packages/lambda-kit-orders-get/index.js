const middy = require('middy')
const httpErrors = require('http-errors')
const {
  cors
} = require('middy/middlewares')
const {
  errorHandler,
  tokenValidator
} = require('./middleware')
const {
  getOrders
} = require('./kit')
const {
  getUser
} = require('./account')

async function kitOrdersGetHandler ({ userId }) {
  const user = await getUser(userId)

  if (!user) {
    throw new httpErrors.BadRequest('No user found for that ID')
  }

  if (!user.kitAdmin) {
    throw new httpErrors.Forbidden('Nope')
  }

  const orders = await getOrders()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orders)
  }
}

module.exports = {
  handler: middy(kitOrdersGetHandler)
    .use(errorHandler())
    .use(tokenValidator())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
