const AWS = require('aws-sdk')
const { config } = require('./config')

AWS.config.update({
  region: config.aws.dynamodb.region
})

async function * getMany (table, params = {}) {
  if (!table) {
    throw new Error('Table name not passed to getMany')
  }

  const client = new AWS.DynamoDB.DocumentClient()

  try {
    let items = {
      LastEvaluatedKey: true
    }

    do {
      items = await client.scan({
        TableName: table,
        ...params
      }).promise()

      if (items.Items) {
        yield * items.Items
      }

      params.ExclusiveStartKey = items.LastEvaluatedKey
    } while (items.LastEvaluatedKey)
  } catch (err) {
    console.error(err)

    throw new Error('getMany query failed')
  }
}

async function getOne (table, key) {
  if (!table) {
    throw new Error('Table name not passed to getOne')
  }

  if (!key) {
    throw new Error('Key not passed to getOne')
  }

  const client = new AWS.DynamoDB.DocumentClient()

  try {
    const result = await client.get({
      TableName: table,
      Key: key
    }).promise()

    if (result.Item) {
      return result.Item
    }
  } catch (err) {
    console.error(err)

    throw new Error('getMany query failed')
  }
}

async function updateOne (table, key, fields) {
  if (!table) {
    throw new Error('Table name not passed to updateOne')
  }

  if (!key) {
    throw new Error('Key not passed to updateOne')
  }

  const client = new AWS.DynamoDB.DocumentClient()

  try {
    await client.update({
      TableName: table,
      Key: {
        key
      },
      ...fields
    }).promise()
  } catch (err) {
    console.error(err)

    throw new Error('updateOne query failed')
  }
}

async function removeOne (table, key) {
  if (!table) {
    throw new Error('Table name not passed to removeOne')
  }

  if (!key) {
    throw new Error('Key not passed to removeOne')
  }

  const client = new AWS.DynamoDB.DocumentClient()

  try {
    await client.delete({
      TableName: table,
      Key: {
        key
      }
    }).promise()
  } catch (err) {
    console.error(err)

    throw new Error('removeOne query failed')
  }
}

async function putOne (table, item) {
  if (!table) {
    throw new Error('Table name not passed to putOne')
  }

  if (!item) {
    throw new Error('Item not passed to putOne')
  }

  const client = new AWS.DynamoDB.DocumentClient()

  try {
    await client.put({
      TableName: table,
      Item: item
    }).promise()
  } catch (err) {
    console.error(err)

    throw new Error('putOne query failed')
  }
}

module.exports = {
  getMany,
  getOne,
  updateOne,
  removeOne,
  putOne
}
