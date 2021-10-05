const { nanoid } = require('nanoid')
const { getOrder: getMemberOrder } = require('./stripe-client')
const cache = require('./cache')
const {
  getOne,
  getMany,
  updateOne,
  putOne
} = require('./db')

async function getLastOrder () {
  const orders = await getOrders()

  return orders[0]
}

async function getCachedOrder (orderId) {
  const cacheKey = `kit-order-${orderId}`
  let order = await cache.get(cacheKey)

  const dbOrder = await getOne(process.env.AWS_ORDERS_DB_TABLE, {
    id: orderId
  })

  if (!order) {
    order = {
      amount: 0,
      items: []
    }

    for (const paymentId of dbOrder.payments) {
      const memberOrder = await getMemberOrder(paymentId)

      order.amount += memberOrder.amount
      order.items.push(memberOrder)
    }

    await cache.set(cacheKey, order)
  }

  return {
    ...order,
    status: dbOrder.status,
    date: dbOrder.date,
    id: dbOrder.id
  }
}

async function getOrders () {
  const orders = []

  for await (const order of getMany(process.env.AWS_ORDERS_DB_TABLE)) {
    orders.push(await getCachedOrder(order.id))
  }

  return orders.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    }

    if (a.date > b.date) {
      return -1
    }

    return 0
  })
}

async function createOrder (date, payments) {
  await putOne(process.env.AWS_ORDERS_DB_TABLE, {
    id: nanoid(),
    date: Math.round(date.getTime() / 1000),
    status: 'pending',
    payments
  })
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

  await updateOne(process.env.AWS_ORDERS_DB_TABLE, {
    id
  }, {
    UpdateExpression: `SET ${expression.join(', ')}`,
    ExpressionAttributeNames: attributeNames,
    ExpressionAttributeValues: attributeValues,
    ReturnValues: 'UPDATED_NEW'
  })
}

module.exports = {
  getLastOrder,
  getOrders,
  getOrder: getCachedOrder,
  createOrder,
  updateOrder
}
