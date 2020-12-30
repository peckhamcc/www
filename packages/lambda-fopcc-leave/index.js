const middy = require('middy')
const httpErrors = require('http-errors')
const {
  cors,
  jsonBodyParser
} = require('middy/middlewares')
const {
  errorHandler,
  tokenValidator
} = require('./middleware')
const {
  cancelFopccMembership
} = require('./stripe-client')
const {
  getUser,
  updateUser
} = require('./account')

async function fopccLeaveHandler ({ userId }) {
  const user = await getUser(userId)

  if (!user) {
    throw new httpErrors.BadRequest('No user found')
  }

  if (!user.stripeCustomerId) {
    throw new httpErrors.PreconditionFailed('Not a customer')
  }

  if (!user.fopcc || !user.fopcc.subscriptionId) {
    throw new httpErrors.PreconditionFailed('Not a Friend')
  }

  await updateUser(userId, {
    fopcc: {
      ...user.fopcc,
      status: 'cancelling'
    }
  })

  await cancelFopccMembership(
    user.stripeCustomerId,
    user.fopcc.subscriptionId
  )

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(await getUser(userId))
  }
}

module.exports = {
  handler: middy(fopccLeaveHandler)
    .use(errorHandler())
    .use(tokenValidator())
    .use(jsonBodyParser())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
