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
  getRRCOrders
} = require('./stripe-client')
const {
  getUser
} = require('./account')

async function rrcOrdersGetHandler ({ userId }) {
  const user = await getUser(userId)

  if (!user) {
    throw new httpErrors.BadRequest('No user found for that ID')
  }

  if (!user.rrcAdmin) {
    throw new httpErrors.Forbidden('Nope')
  }

  const orders = await getRRCOrders()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orders)
  }
}

module.exports = {
  handler: middy(rrcOrdersGetHandler)
    .use(errorHandler())
    .use(tokenValidator())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
