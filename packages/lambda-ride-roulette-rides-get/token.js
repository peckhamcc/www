const AWS = require('aws-sdk')
const { config } = require('./config')

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

async function validateToken (email, token) {
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
  validateToken,
  extendToken
}
