const { nanoid } = require('nanoid')
const jsonDb = require('./json-db')
const { getOrder: getMemberOrder } = require('../../lambda-kit-orders-get/stripe-client')

const orders = jsonDb('orders.json')
const cache = require('./cache')

async function getLastOrder () {
  const orders = await getOrders()

  return orders.pop()
}

async function getCachedOrder (orderId) {
  let order = await cache.get(`kit-order-${orderId}`)

  if (!order) {
    order = {
      amount: 0,
      items: []
    }

    for (const paymentId of orders.values[orderId].payments) {
      const memberOrder = await getMemberOrder(paymentId)

      order.amount += memberOrder.amount
      order.items.push(memberOrder)
    }

    await cache.set(`kit-order-${orderId}`, order)
  }

  return {
    ...order,
    status: orders.values[orderId].status,
    date: orders.values[orderId].date,
    id: orderId
  }
}

async function getOrders () {
  const output = []

  for (const orderId of Object.keys(orders.values)) {
    output.push(await getCachedOrder(orderId))
  }

  return output.sort((a, b) => {
    if (a < b) {
      return -1
    }

    if (a > b) {
      return 1
    }

    return 0
  })
}

async function createOrder (date, payments) {
  const order = {
    date: Math.round(date.getTime() / 1000),
    status: 'pending',
    payments
  }

  orders.values[nanoid()] = order
  orders.save()

  return order
}

async function updateOrder (id, details) {
  const order = orders.values[id]

  if (!order) {
    throw new Error('Could not load order for id ' + id)
  }

  orders.values[id] = {
    ...order,
    ...details
  }
  orders.save()
}

module.exports = {
  getLastOrder,
  getOrders,
  getOrder: getCachedOrder,
  createOrder,
  updateOrder
}
