const AWS = require('aws-sdk')
const { config } = require('./config')
const { nanoid } = require('nanoid')

AWS.config.update({
  region: config.aws.dynamodb.region
})

const ONE_HOUR = (60 * 60) * 1000

function tokenExpiry () {
  return new Date(Date.now() + ONE_HOUR).getTime() / 1000
}

async function extendToken (email) {
  const client = new AWS.DynamoDB.DocumentClient()

  await client.update({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Key: {
      email
    },
    UpdateExpression: 'set expires = :expires',
    ExpressionAttributeValues: {
      ':expires': tokenExpiry()
    },
    ReturnValues: 'UPDATED_NEW'
  }).promise()
}

async function generateToken (email) {
  const client = new AWS.DynamoDB.DocumentClient()

  const existingToken = await client.get({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Key: {
      email
    }
  }).promise()

  console.info('existingToken result', JSON.stringify(existingToken, null, 2))

  // return existing token
  if (existingToken && existingToken.Item) {
    // extend token TTL
    await extendToken(email)

    return existingToken.Item.token
  }

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

  return token
}

async function validateToken (email, token) {
  const client = new AWS.DynamoDB.DocumentClient()

  const existingToken = await client.get({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Key: {
      email
    }
  }).promise()

  if (existingToken && existingToken.token === token) {
    // extend token TTL
    await extendToken(email)

    return true
  }

  return false
}

module.exports = {
  generateToken,
  validateToken,
  extendToken
}
