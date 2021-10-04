const AWS = require('aws-sdk')
const { config } = require('./config')

AWS.config.update({
  region: config.aws.dynamodb.region
})

async function get (key) {
  const client = new AWS.DynamoDB.DocumentClient()

  const result = await client.get({
    TableName: process.env.AWS_CACHE_DB_TABLE,
    Key: {
      key
    }
  }).promise()

  if (result.Item && result.Item.value) {
    return result.Item.value
  }
}

async function set (key, value, ttl) {
  if (!process.env.AWS_CACHE_DB_TABLE) {
    throw new Error('No AWS_CACHE_DB_TABLE var found in environment')
  }

  const client = new AWS.DynamoDB.DocumentClient()

  await client.update({
    TableName: process.env.AWS_CACHE_DB_TABLE,
    Key: {
      key
    },
    UpdateExpression: 'set #v = :v' + (ttl ? ', #e = :e' : ''),
    ExpressionAttributeNames: {
      '#v': 'value',
      ...(ttl ? { '#e': 'expires' } : {})
    },
    ExpressionAttributeValues: {
      ':v': value,
      ...(ttl ? { ':e': Math.round(ttl / 1000) } : {})
    },
    ReturnValues: 'UPDATED_NEW'
  }).promise()
}

async function remove (key) {
  if (!process.env.AWS_CACHE_DB_TABLE) {
    throw new Error('No AWS_CACHE_DB_TABLE var found in environment')
  }

  const client = new AWS.DynamoDB.DocumentClient()

  await client.delete({
    TableName: process.env.AWS_CACHE_DB_TABLE,
    Key: {
      key
    }
  }).promise()
}

module.exports = {
  get,
  set,
  remove
}
