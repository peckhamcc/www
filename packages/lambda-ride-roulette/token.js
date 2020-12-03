const AWS = require('aws-sdk')
const { config } = require('./config')
const { nanoid } = require('nanoid')

AWS.config.update({
  region: config.aws.dynamodb.region
})

const ONE_HOUR = (60 * 60) * 1000
const ONE_DAY = ONE_HOUR * 24

function tokenExpiry () {
  return Math.round(new Date(Date.now() + ONE_DAY).getTime() / 1000)
}

async function extendToken (email) {
  email = email.toLowerCase()

  const client = new AWS.DynamoDB.DocumentClient()

  await client.update({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Key: {
      email
    },
    UpdateExpression: 'set expires = :e',
    ExpressionAttributeValues: {
      ':e': tokenExpiry()
    },
    ReturnValues: 'UPDATED_NEW'
  }).promise()
}

async function generateLogInLink (email) {
  email = email.toLowerCase()

  let token

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

    token = existingToken.Item.token
  } else {
    token = nanoid()

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
  }

  const data = Buffer.from(JSON.stringify({ email, token })).toString('base64')

  return `https://peckham.cc/ride-roulette?token=${data}`
}

async function validateToken (email, token) {
  email = email.toLowerCase()

  const client = new AWS.DynamoDB.DocumentClient()

  const existingToken = await client.get({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Key: {
      email
    }
  }).promise()

  if (existingToken && existingToken.Item && existingToken.Item.token === token) {
    // extend token TTL
    await extendToken(email)

    return true
  }

  return false
}

module.exports = {
  generateLogInLink,
  validateToken,
  extendToken
}
