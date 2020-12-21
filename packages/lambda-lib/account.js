const AWS = require('aws-sdk')
const { config } = require('./config')
const { nanoid } = require('nanoid')
const httpErrors = require('http-errors')

AWS.config.update({
  region: config.aws.dynamodb.region
})

const ONE_HOUR = (60 * 60) * 1000
const ONE_DAY = ONE_HOUR * 24

const REDIRECT_URLS = {
  '/profile': true,
  '/shop': true,
  '/ride-roulette': true,
  '/checkout': true
}

function tokenExpiry () {
  return Math.round(new Date(Date.now() + ONE_DAY).getTime() / 1000)
}

async function extendToken (token) {
  const client = new AWS.DynamoDB.DocumentClient()

  await client.update({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Key: {
      token
    },
    UpdateExpression: 'set expires = :e',
    ExpressionAttributeValues: {
      ':e': tokenExpiry()
    },
    ReturnValues: 'UPDATED_NEW'
  }).promise()
}

async function generateLogInLink (email, redirect) {
  if (!REDIRECT_URLS[redirect]) {
    throw httpErrors.BadRequest('Invalid redirect')
  }

  email = email.toLowerCase()

  const client = new AWS.DynamoDB.DocumentClient()
  const token = nanoid()

  await client.put({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Item: {
      email: `${email}`,
      token: `${token}`,
      // ttl is enabled on the DynamoDB table for the 'expires' field
      expires: tokenExpiry()
    }
  })
    .promise()

  return `https://peckham.cc${redirect}?token=${token}`
}

async function getUserIdForToken (token) {
  const client = new AWS.DynamoDB.DocumentClient()

  const existingToken = await client.get({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Key: {
      token
    }
  }).promise()

  if (!existingToken || !existingToken.Item) {
    throw new httpErrors.Unauthorized('Missing or invalid credentials')
  }

  // extend token TTL
  await extendToken(token)

  // return user id from token
  return existingToken.Item.user
}

async function getUser (id) {
  const client = new AWS.DynamoDB.DocumentClient()

  const user = await client.get({
    TableName: process.env.AWS_USERS_DB_TABLE,
    Key: {
      id
    }
  }).promise()

  return user.Item
}

async function updateUser (id, details) {
  const fields = [
    'firstName',
    'lastName',
    'telephone',
    'address1',
    'address2',
    'address3',
    'postCode',
    'gender',
    'size'
  ]

  const expression = []
  const attributeNames = {}
  const attributeValues = {}

  fields.forEach(field => {
    const shortName = field.substring(0, 2).toLowerCase()

    if (details[field] != null) {
      expression.push(`set #${shortName} = :${shortName}`)
      attributeNames[`#${shortName}`] = field
      attributeValues[`:${shortName}`] = details[field]
    }
  })

  const client = new AWS.DynamoDB.DocumentClient()

  await client.update({
    TableName: process.env.AWS_USERS_DB_TABLE,
    Key: {
      id
    },
    UpdateExpression: expression.join(', '),
    ExpressionAttributeNames: attributeNames,
    ExpressionAttributeValues: attributeValues,
    ReturnValues: 'UPDATED_NEW'
  }).promise()
}

async function getUserFoPCCStatus (id) {
  return {}
}

async function getUserOrders (id) {
  return []
}

async function addUserOrder (id, orderId) {
  const client = new AWS.DynamoDB.DocumentClient()

  await client.update({
    TableName: process.env.AWS_USERS_DB_TABLE,
    Key: {
      id
    },
    UpdateExpression: 'set #o = list_append(#o, :o)',
    ExpressionAttributeNames: {
      '#o': 'orders'
    },
    ExpressionAttributeValues: {
      ':o': orderId
    },
    ReturnValues: 'UPDATED_NEW'
  }).promise()
}

async function getUserTrainingSessions (id) {
  return []
}

module.exports = {
  generateLogInLink,
  getUserIdForToken,
  getUser,
  updateUser,
  getUserFoPCCStatus,
  getUserOrders,
  getUserTrainingSessions,
  addUserOrder
}
