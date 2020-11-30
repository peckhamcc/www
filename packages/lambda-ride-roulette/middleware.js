const httpErrors = require('http-errors')

const errorHandler = () => ({
  onError: (handler, next) => {
    console.info('error handler', handler, next)

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

    const auth = headers.Auth || headers.auth

    if (!auth) {
      throw new httpErrors.Unauthorized('Missing or invalid credentials')
    }

    const {
      email,
      token
    } = JSON.parse(Buffer.from(auth, 'base64'))

    console.info('received email', email, token)

    try {
      await validateToken(email, token)
      await extendToken(email)
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
