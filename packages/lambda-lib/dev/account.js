const { nanoid } = require('nanoid')
const httpErrors = require('http-errors')
const jsonDb = require('./json-db')

const tokens = jsonDb('tokens.json')
const users = jsonDb('users.json')
const userLookup = jsonDb('user-lookup.json')
const customerLookup = jsonDb('customer-lookup.json')

const FIFTEEN_MINUTES = (15 * 60) * 1000
const ONE_HOUR = FIFTEEN_MINUTES * 4
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

function loginTokenExpiry () {
  return new Date(Date.now() + FIFTEEN_MINUTES).getTime()
}

function fullTokenExpiry () {
  return new Date(Date.now() + ONE_WEEK).getTime()
}

async function extendToken (key) {
  tokens.values[key].expires = fullTokenExpiry()
  tokens.save()
}

const REDIRECT_URLS = {
  '/profile': true,
  '/shop': true,
  '/ride-roulette': true,
  '/checkout': true,
  '/admin': true,
  '/admin/members': true,
  '/admin/kit': true,
  '/admin/rrc': true
}

function findToken (key) {
  // simulate DynamoDB TTL
  if (tokens.values[key] && tokens.values[key].expires < Date.now()) {
    delete tokens.values[key]
    tokens.save()

    console.info('token', key, 'expired')
  }

  if (!tokens.values[key]) {
    console.info('token', key, 'missing', tokens.values)
    throw new httpErrors.Unauthorized('Missing or invalid credentials')
  }

  return tokens.values[key]
}

async function generateLogInLink (email, redirect) {
  if (!REDIRECT_URLS[redirect]) {
    throw httpErrors.BadRequest('Invalid redirect')
  }

  let userId = userLookup.values[email]

  // create new user
  if (!userId) {
    console.info('creating new user')
    userId = nanoid()

    users.values[userId] = {
      email
    }
    users.save()

    userLookup.values[email] = userId
    userLookup.save()
  }

  const key = nanoid()

  tokens.values[key] = {
    user: userId,
    expires: loginTokenExpiry(),
    type: 'login'
  }
  tokens.save()

  return `http://localhost:9000${redirect}#token=${key}`
}

async function getUserIdForToken (key) {
  const token = findToken(key)

  if (token.type !== 'full') {
    throw httpErrors.BadRequest('Invalid token')
  }

  await extendToken(key)

  return tokens.values[key].user
}

async function updateUser (id, details) {
  const user = await getUser(id)

  if (!user) {
    throw new Error('Could not load user for id', id)
  }

  users.values[id] = {
    ...user,
    ...details
  }
  users.save()

  if (details.email && user.email !== details.email) {
    delete userLookup.values[user.email]
    userLookup.values[details.email] = id
    userLookup.save()
  }

  if (details.stripeCustomerId && user.stripeCustomerId !== details.stripeCustomerId) {
    customerLookup.values[details.stripeCustomerId] = id
    customerLookup.save()
  }
}

async function getUser (id) {
  return users.values[id]
}

async function getUserIdForCustomerId (customerId) {
  return customerLookup.values[customerId]
}

async function invalidateToken (key) {
  delete tokens.values[key]
  tokens.save()
}

async function exchangeToken (key) {
  const token = findToken(key)

  if (token.type !== 'login') {
    throw new httpErrors.Unauthorized('Missing or invalid credentials')
  }

  // expire the old token
  await invalidateToken(key)

  // create a new token
  key = nanoid()
  tokens.values[key] = {
    user: token.user,
    expires: fullTokenExpiry(),
    type: 'full'
  }
  tokens.save()

  // update user login time
  await updateUser(token.user, {
    lastLogin: Date.now()
  })

  return key
}

module.exports = {
  generateLogInLink,
  getUserIdForToken,
  updateUser,
  getUser,
  getUserIdForCustomerId,
  exchangeToken,
  invalidateToken
}
