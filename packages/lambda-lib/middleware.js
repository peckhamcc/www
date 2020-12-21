const httpErrors = require('http-errors')
const {
  getUserIdForToken
} = require('./account')

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
        handler.response = {
          statusCode: handler.error.statusCode,
          body: JSON.stringify({
            message: handler.error.message
          })
        }

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

    const token = headers.Authorization || headers.authorization

    if (!token) {
      throw new httpErrors.Unauthorized('Missing or invalid credentials')
    }

    handler.event.user = await getUserIdForToken(token)
  }
})

module.exports = {
  errorHandler,
  tokenValidator
}
