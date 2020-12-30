const middy = require('middy')
const {
  cors,
  jsonBodyParser
} = require('middy/middlewares')
const {
  errorHandler,
  tokenValidator
} = require('./middleware')
const {
  getOrCreateCustomerId,
  updateFopccCheckoutSession,
  createFopccCheckoutSession
} = require('./stripe-client')
const {
  updateUser,
  getUser
} = require('./account')

async function fopccJoinHandler ({ userId, body: items }) {
  const user = await getUser(userId)

  if (!user.stripeCustomerId) {
    const stripeCustomerId = await getOrCreateCustomerId(user)

    await updateUser(userId, {
      stripeCustomerId: stripeCustomerId
    })

    user.stripeCustomerId = stripeCustomerId
  }

  let sessionId

  if (user.fopcc && user.fopcc.subscriptionId) {
    // manage existing subscription
    sessionId = await updateFopccCheckoutSession(userId, user.stripeCustomerId, user.fopcc.subscriptionId)
  } else {
    // create new subscription
    await updateUser(userId, {
      fopcc: {
        status: 'pending'
      }
    })

    sessionId = await createFopccCheckoutSession(userId, user.stripeCustomerId)
  }

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

module.exports = {
  handler: middy(fopccJoinHandler)
    .use(errorHandler())
    .use(tokenValidator())
    .use(jsonBodyParser())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
