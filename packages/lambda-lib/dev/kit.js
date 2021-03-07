const { nanoid } = require('nanoid')
const jsonDb = require('./json-db')

const orders = jsonDb('orders.json')

async function getLastOrder () {
  const orders = await getOrders()

  return orders.pop()
}

async function getOrders () {
  return Object
    .keys(orders.values)
    .map(id => ({
      id,
      ...orders.values[id]
    }))
    .sort((a, b) => {
      return a.date.compare(b.date)
    })
}

async function createOrder (date) {
  const order = {
    date: Math.round(date.getTime() / 1000)
  }

  orders.values[nanoid()] = order
  orders.save()

  return order
}

module.exports = {
  getLastOrder,
  getOrders,
  createOrder
}
