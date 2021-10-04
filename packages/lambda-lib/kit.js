const AWS = require('aws-sdk')
const { config } = require('./config')
const { getOrder: getMemberOrder } = require('./stripe-client')
const cache = require('./cache')

AWS.config.update({
  region: config.aws.dynamodb.region
})

async function getLastOrder () {
  const orders = await getOrders()

  return orders.pop()
}

async function getCachedOrder (orderId) {
  const cacheKey = `kit-order-${orderId}`
  let order = await cache.get(cacheKey)

  if (!order) {
    order = {
      amount: 0,
      items: []
    }

    const client = new AWS.DynamoDB.DocumentClient()

    if (!process.env.AWS_ORDERS_DB_TABLE) {
      throw new Error('No AWS_ORDERS_DB_TABLE var found in environment')
    }

    const { Item: dbOrder } = await client.get({
      TableName: process.env.AWS_ORDERS_DB_TABLE,
      Key: {
        id: orderId
      }
    }).promise()

    for (const paymentId of dbOrder.payments) {
      const memberOrder = await getMemberOrder(paymentId)

      order.amount += memberOrder.amount
      order.items.push(memberOrder)
    }
  }

  await cache.set(cacheKey, order)

  return order
}

async function getOrders () {
  const client = new AWS.DynamoDB.DocumentClient()
  const orders = []

  if (!process.env.AWS_ORDERS_DB_TABLE) {
    throw new Error('No AWS_ORDERS_DB_TABLE var found in environment')
  }

  const items = await client.scan({
    TableName: process.env.AWS_ORDERS_DB_TABLE
  }).promise()

  for (const order of items.Items) {
    orders.push(await getCachedOrder(order.id))
  }

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
  if (!process.env.AWS_ORDERS_DB_TABLE) {
    throw new Error('No AWS_ORDERS_DB_TABLE var found in environment')
  }

  const client = new AWS.DynamoDB.DocumentClient()

  await client.put({
    TableName: process.env.AWS_ORDERS_DB_TABLE,
    Item: {
      date: Math.round(date.getTime() / 1000),
      status: 'pending',
      payments
    }
  }).promise()
}

async function updateOrder (id, details) {
  const fields = [
    'status'
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

  if (!expression.length) {
    // nothing to update here
    return
  }

  const client = new AWS.DynamoDB.DocumentClient()

  if (!process.env.AWS_ORDERS_DB_TABLE) {
    throw new Error('No AWS_ORDERS_DB_TABLE var found in environment')
  }

  await client.update({
    TableName: process.env.AWS_ORDERS_DB_TABLE,
    Key: {
      id
    },
    UpdateExpression: `SET ${expression.join(', ')}`,
    ExpressionAttributeNames: attributeNames,
    ExpressionAttributeValues: attributeValues,
    ReturnValues: 'UPDATED_NEW'
  }).promise()
}

module.exports = {
  getLastOrder,
  getOrders,
  getOrder: getCachedOrder,
  createOrder,
  updateOrder
}
