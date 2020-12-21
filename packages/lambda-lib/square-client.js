'use strict'

const { Client } = require('square')
const {
  config
} = require('./config')

const getProducts = async () => {
  if (!config.flags.shop) {
    return []
  }

  const client = new Client({
    accessToken: config.square.accessToken,
    environment: config.square.environment
  })

  const { result: { objects } } = await client.catalogApi.listCatalog(undefined, 'ITEM,ITEM_VARIATION,CATEGORY')

  const categories = objects
    .filter(item => item.type === 'CATEGORY' && !item.isDeleted)
    .reduce((categories, category) => {
      categories[category.id] = {
        id: category.id,
        name: category.categoryData.name,
        items: []
      }

      return categories
    }, {})

  objects.filter(item => item.type === 'ITEM' && !item.isDeleted)
    .forEach(item => {
      categories[item.itemData.categoryId].items.push({
        id: item.id,
        name: item.itemData.name,
        description: item.itemData.description,
        variations: item.itemData.variations
          .filter(variation => !variation.isDeleted)
          .map(variation => {
            return {
              id: variation.id,
              name: variation.itemVariationData.name,
              sku: variation.itemVariationData.sku,
              price: variation.itemVariationData.priceMoney.amount,
              options: variation.itemVariationData.itemOptionValues
            }
          })
      })
    })

  return categories
}

const getOrders = async (locationId, orderIds) => {
  const client = new Client({
    accessToken: config.square.accessToken,
    environment: config.square.environment
  })

  const {
    result: {
      orders
    }
  } = await client.ordersApi.batchRetrieveOrders({
    locationId,
    orderIds: orderIds
  })

  return orders
}

const getOrCreateCustomerId = async (user) => {
  const client = new Client({
    accessToken: config.square.accessToken,
    environment: config.square.environment
  })

  // the idempotency key is email address so this is operation is safe to repeat
  const {
    result: {
      customer: {
        id: customerId
      }
    }
  } = await client.customersApi.createCustomer({
    idempotencyKey: user.id,
    emailAddress: user.email,
    givenName: user.firstName,
    familyName: user.lastName,
    phoneNumber: user.telephone,
    address: {
      addressLine1: user.address1,
      addressLine2: user.address2,
      addressLine3: user.address3,
      postalCode: user.postCode
    }
  })

  return customerId
}

const createOrder = async (customerId, locationId, items, idempotencyKey) => {
  if (!config.flags.shop) {
    return null
  }

  const client = new Client({
    accessToken: config.square.accessToken,
    environment: config.square.environment
  })

  const orderRequestBody = {
    idempotencyKey,
    order: {
      locationId,
      customerId: customerId,
      lineItems: items.map(item => ({
        quantity: item.quantity,
        catalogObjectId: item.id
      }))
    }
  }

  const {
    result: {
      order
    }
  } = await client.ordersApi.createOrder(orderRequestBody)

  return {
    orderId: order.id,
    amount: order.totalMoney.amount
  }
}

const createPayment = async (locationId, orderId, paymentNonce, idempotencyKey) => {
  if (!config.flags.shop) {
    return null
  }

  const client = new Client({
    accessToken: config.square.accessToken,
    environment: config.square.environment
  })

  // get the latest order information in case the price is changed from a different session
  const [order] = await getOrders(locationId, [orderId])

  try {
    if (order.totalMoney.amount > 0) {
      // Payment can only be made when order amount is greater than 0
      await client.paymentsApi.createPayment({
        sourceId: paymentNonce, // Card nonce created by the payment form
        idempotencyKey,
        amountMoney: order.totalMoney, // Provides total amount of money and currency to charge for the order.
        orderId: order.id // Order that is associated with the payment
      })
    } else {
      // Settle an order with a total of 0.
      await client.ordersApi.payOrder(orderId, {
        idempotencyKey
      })
    }

    return []
  } catch (err) {
    console.error('err', err)

    if (err.errors && err.errors.length) {
      return err.errors
    }

    throw err
  }
}

module.exports = {
  getProducts,
  getOrders,
  createOrder,
  createPayment,
  getOrCreateCustomerId
}
