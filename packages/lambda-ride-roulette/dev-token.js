const { nanoid } = require('nanoid')

const tokens = {}

const ONE_HOUR = (60 * 60) * 1000

function tokenExpiry () {
  return Math.round(new Date(Date.now() + ONE_HOUR).getTime() / 1000)
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
  console.info('tokens', tokens)
  console.info('validating', email, token)

  if (tokens[email] && tokens[email].expires < Date.now()) {
    delete tokens[email]
  }

  const existingToken = tokens[email]

  return existingToken && existingToken.token === token
}

module.exports = {
  generateToken,
  validateToken,
  extendToken
}
