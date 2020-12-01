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

const getAllPreferences = async () => {
  const client = new AWS.DynamoDB.DocumentClient()

  const scanResults = {}
  const params = { TableName: process.env.AWS_PREFERENCES_DB_TABLE }
  let items = {
    LastEvaluatedKey: true
  }

  do {
    items = await client.scan(params).promise()
    items.Items.forEach((item) => {
      console.info('found item', item)

      scanResults[item.email] = {
        name: item.name,
        preferences: item.preferences
      }
    })
    params.ExclusiveStartKey = items.LastEvaluatedKey
  } while (items.LastEvaluatedKey)

  return scanResults
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
    UpdateExpression: 'set name = :n, preferences = :p, expires = :e',
    ExpressionAttributeValues: {
      ':n': name,
      ':p': preferences,
      ':e': Math.round(new Date(Date.now() + ONE_MONTH).getTime() / 1000)
    },
    ReturnValues: 'UPDATED_NEW'
  }).promise()
}

module.exports = {
  getRides,
  getAllPreferences,
  getPreferences,
  setPreferences
}
