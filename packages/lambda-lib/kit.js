const AWS = require('aws-sdk')
const { config } = require('./config')

AWS.config.update({
  region: config.aws.dynamodb.region
})

async function getLastOrder () {
  const orders = await getOrders()

  return orders.pop()
}

async function getOrders () {
  const client = new AWS.DynamoDB.DocumentClient()

  const items = await client.scan({
    TableName: process.env.AWS_ORDERS_DB_TABLE
  }).promise()

  const orders = items.Items

  return orders.sort((a, b) => {
    if (a.date < b.date) {
      return -1
    }

    if (a.date > b.date) {
      return 1
    }

    return 0
  })
}

async function createOrder (date, payments) {
  const client = new AWS.DynamoDB.DocumentClient()

  await client.put({
    TableName: process.env.AWS_ORDERS_DB_TABLE,
    Item: {
      date,
      payments
    }
  }).promise()
}

module.exports = {
  getLastOrder,
  getOrders,
  createOrder
}
