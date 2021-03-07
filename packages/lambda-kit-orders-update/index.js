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

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
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
