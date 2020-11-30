const { nanoid } = require('nanoid')

const tokens = {}

const ONE_HOUR = (60 * 60) * 1000

function tokenExpiry () {
  return new Date(Date.now() + ONE_HOUR).getTime()
}

async function extendToken (email) {
  tokens[email].expires = tokenExpiry()
}

async function generateToken (email) {
  if (tokens[email] && tokens[email].expires > Date.now()) {
    await extendToken(email)

    return tokens[email].token
  }

  const token = nanoid()

  tokens[email] = {
    token,
    expires: tokenExpiry()
  }

  return token
}

async function validateToken (email, token) {
  console.info('validate', email, token, tokens)

  // simulate DynamoDB TTL
  if (tokens[email] && tokens[email].expires < Date.now()) {
    delete tokens[email]
  }

  const existingToken = tokens[email]

  console.info('token valid', Boolean(existingToken && existingToken.token === token))

  return Boolean(existingToken && existingToken.token === token)
}

module.exports = {
  generateToken,
  validateToken,
  extendToken
}
