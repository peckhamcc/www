const { nanoid } = require('nanoid')

const tokens = {}

const ONE_HOUR = (60 * 60) * 1000
const ONE_DAY = ONE_HOUR * 24

function tokenExpiry () {
  return new Date(Date.now() + ONE_DAY).getTime()
}

async function extendToken (email) {
  tokens[email].expires = tokenExpiry()
}

async function generateLogInLink (email) {
  email = email.toLowerCase()

  let token

  if (tokens[email] && tokens[email].expires > Date.now()) {
    await extendToken(email)

    token = tokens[email].token
  } else {
    token = nanoid()

    tokens[email] = {
      token,
      expires: tokenExpiry()
    }
  }

  const data = Buffer.from(JSON.stringify({ email, token })).toString('base64')

  return `http://localhost:9000/ride-roulette?token=${data}`
}

async function validateToken (email, token) {
  console.info('validate', email, token, tokens)

  // simulate DynamoDB TTL
  if (tokens[email] && tokens[email].expires < Date.now()) {
    delete tokens[email]
  }

  const existingToken = tokens[email]

  return Boolean(existingToken && existingToken.token === token)
}

module.exports = {
  generateLogInLink,
  validateToken,
  extendToken
}
