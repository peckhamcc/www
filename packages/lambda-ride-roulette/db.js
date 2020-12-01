const AWS = require('aws-sdk')
const { config } = require('./config')

AWS.config.update({
  region: config.aws.dynamodb.region
})

const ONE_DAY = 3600000 * 24
const ONE_MONTH = ONE_DAY * 30

const getRides = async () => {
  return []
}

const getPreferences = async (email) => {
  const client = new AWS.DynamoDB.DocumentClient()

  const result = await client.get({
    TableName: process.env.AWS_PREFERENCES_DB_TABLE,
    Key: {
      email
    }
  }).promise()

  return result.Item || { preferences: {} }
}

const setPreferences = async (email, { name, preferences }) => {
  const client = new AWS.DynamoDB.DocumentClient()

  await client.update({
    TableName: process.env.AWS_PREFERENCES_DB_TABLE,
    Key: {
      email
    },
    UpdateExpression: 'set name = :name, preferences = :prefs, expires = :expires',
    ExpressionAttributeValues: {
      ':name': name,
      ':prefs': preferences,
      ':expires': Math.round(new Date(Date.now() + ONE_MONTH).getTime() / 1000)
    },
    ReturnValues: 'UPDATED_NEW'
  }).promise()
}

module.exports = {
  getRides,
  getPreferences,
  setPreferences
}