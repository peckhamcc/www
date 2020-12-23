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

  const client = new AWS.DynamoDB.DocumentClient()

  // use AWS_USER_LOOKUP_DB_TABLE to turn email into id, maybe creating a new user
  const userLookup = await client.get({
    TableName: process.env.AWS_USER_LOOKUP_DB_TABLE,
    Key: {
      email
    }
  }).promise()

  let id

  if (userLookup.Item) {
    id = userLookup.Item.id
  } else {
    id = nanoid()

    // no user for that email, create a new user
    await client.update({
      TableName: process.env.AWS_USERS_DB_TABLE,
      Key: {
        id
      },
      UpdateExpression: 'set #e = :e',
      ExpressionAttributeNames: {
        '#e': 'email'
      },
      ExpressionAttributeValues: {
        ':e': email
      },
      ReturnValues: 'UPDATED_NEW'
    }).promise()

    // create lookup for next time
    await client.update({
      TableName: process.env.AWS_USER_LOOKUP_DB_TABLE,
      Key: {
        email
      },
      UpdateExpression: 'set #i = :i',
      ExpressionAttributeNames: {
        '#i': 'id'
      },
      ExpressionAttributeValues: {
        ':i': id
      },
      ReturnValues: 'UPDATED_NEW'
    }).promise()
  }

  const token = nanoid()

  await client.put({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Item: {
      token: `${token}`,
      user: `${id}`,
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
    console.info('Nothing in token table for', token)
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
  const user = await getUser(id)

  const fields = [
    'name',
    'phone',
    'email',
    'gender',
    'size'
  ]

  const expression = []
  const attributeNames = {}
  const attributeValues = {}

  fields.forEach(field => {
    const shortName = field.substring(0, 2).toLowerCase()

    if (details[field] != null) {
      expression.push(`#${shortName} = :${shortName}`)
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
    UpdateExpression: `SET ${expression.join(', ')}`,
    ExpressionAttributeNames: attributeNames,
    ExpressionAttributeValues: attributeValues,
    ReturnValues: 'UPDATED_NEW'
  }).promise()

  if (details.email && user.email !== details.email) {
    // update AWS_USER_LOOKUP_DB_TABLE
  }

  return getUser(id)
}

module.exports = {
  generateLogInLink,
  getUserIdForToken,
  updateUser,
  getUser
}
