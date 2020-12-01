const httpErrors = require('http-errors')
const {
  validateToken,
  extendToken
} = require('./token')

const errorHandler = () => ({
  onError: (handler, next) => {
    if (handler.error instanceof httpErrors.HttpError) {
      if (handler.error.message.includes('failed validation')) {
        const details = handler.error.details[0]

        handler.response = {
          statusCode: 422,
          body: JSON.stringify({
            field: details.dataPath.replace('.body.', '')
          })
        }

        next()
      } else {
        handler.response = handler.error

        next()
      }
    } else {
      next(handler.error)
    }
  }
})

const tokenValidator = (opts) => ({
  before: async (handler) => {
    opts = opts || {}

    const { headers } = handler.event

    if (!headers) {
      throw new httpErrors.Unauthorized('Missing or invalid credentials')
    }

    const auth = headers.Authorization || headers.authorization

    if (!auth) {
      throw new httpErrors.Unauthorized('Missing or invalid credentials')
    }

    let {
      email,
      token,
      name
    } = JSON.parse(Buffer.from(auth, 'base64'))

    email = email.toLowerCase()

    console.info('received email', email, token, name)

    try {
      if (!await validateToken(email, token)) {
        throw new Error('Invalid token')
      }

      await extendToken(email)

      handler.event.user = {
        email,
        name
      }
    } catch (err) {
      console.info('token was invalid', err)

      throw new httpErrors.Unauthorized('Missing or invalid credentials')
    }
  }
})

module.exports = {
  errorHandler,
  tokenValidator
}
