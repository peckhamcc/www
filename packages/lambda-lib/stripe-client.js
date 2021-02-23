'use strict'

const stripe = require('stripe')
const {
  config,
  OPTIONS
} = require('./config')
const cache = require('./cache')
const httpErrors = require('http-errors')

const STRIPE_OPTS = {
  maxNetworkRetries: 5
}

const CACHE_KEYS = {
  products: 'shop-products'
}

const ONE_HOUR = (60 * 60) * 1000

const SHIPPING_LIMITS = [{
  max: 99,
  price: config.stripe.shipping[0]
}, {
  max: 100,
  price: config.stripe.shipping[1]
}, {
  max: 699,
  price: config.stripe.shipping[2]
}, {
  max: Infinity,
  price: config.stripe.shipping[3]
}]

const getProducts = async () => {
  if (!config.flags.shop) {
    return []
  }

  const cached = await cache.get(CACHE_KEYS.products)

  if (cached) {
    return cached
  }

  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  const prices = {}

  for await (const price of client.prices.list({
    limit: 100,
    active: true
  })) {
    prices[price.product] = price
  }

  const sections = {}

  for await (const product of client.products.list({
    active: true,
    shippable: true
  })) {
    let section = product.metadata.section

    if (!section) {
      console.error('Product', product.name, 'has no section defined')
      section = 'unknown'
    }

    if (!sections[section]) {
      sections[section] = {
        slug: section,
        name: section.split('-').map((str, index) => {
          if (index === 0) {
            return str.substring(0, 1).toUpperCase() + str.substring(1)
          }

          if (str === 'and') {
            return '&'
          }

          return str
        }).join(' '),
        items: []
      }
    }

    const slug = product.metadata.slug

    if (!slug) {
      console.error('Product', product.name, 'has no slug')
      continue
    }

    const options = {}

    if (product.metadata.options) {
      product.metadata.options.split('-').forEach(option => {
        if (!product.metadata[option]) {
          console.error('Product', product.name, 'has option', option, 'but it is not defined in the product metadata')
        }

        options[option] = product.metadata[option].split('-')
      })
    }

    const price = prices[product.id]

    if (!price) {
      console.error('Product', product.name, 'has no configured price')
    }

    if (product.metadata.size && !product.metadata['size-chart']) {
      console.error('Product', product.name, 'has a size option configured but no size-chart')
    }

    sections[section].items.push({
      id: product.id,
      slug,
      name: product.name,
      images: product.images,
      description: product.description,
      section: section,
      sizeChart: product.metadata['size-chart'],
      options,
      price: {
        id: price.id,
        type: price.type,
        amount: price.unit_amount
      },
      type: product.metadata.type,
      shippingWeight: parseInt(product.metadata['shipping-weight'] || '0', 10)
    })
  }

  const result = Object.keys(sections).reduce((acc, section) => {
    acc.push(sections[section])

    return acc
  }, [])

  await cache.set(CACHE_KEYS.products, result, Date.now() + ONE_HOUR)

  return result
}

const createCheckoutSession = async (userId, stripeCustomerId, items) => {
  await cache.remove(`orders-${userId}`)

  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  const products = await getProducts()
  const slugToProduct = products.reduce((lookup, section) => {
    section.items.forEach(item => {
      lookup[item.slug] = item
    })

    return lookup
  }, {})

  const metadata = {}

  let shippingWeight = 0

  const lineItems = items.map((item, index) => {
    const product = slugToProduct[item.slug]
    let description = product.description

    if (!product) {
      throw new Error('Could not find product for slug ' + item.slug)
    }

    if (Object.keys(item.options || {}).length) {
      metadata[`item-${index}`] = JSON.stringify(item.options)

      description = Object.keys(item.options).map(option => {
        const value = item.options[option]

        if (option === 'size') {
          return OPTIONS[option][product.sizeChart][value].name
        }

        return OPTIONS[option][value]
      }).join(', ')
    }

    shippingWeight += (product.shippingWeight || 0) * item.quantity

    return {
      price: product.price.id,
      quantity: item.quantity,
      description
    }
  })

  let shippingAddressCollection

  if (shippingWeight) {
    // tell stripe to collect shipping information
    shippingAddressCollection = {
      allowed_countries: ['GB']
    }

    const { price } = SHIPPING_LIMITS
      .filter(method => shippingWeight < method.max)
      .shift()

    // add shipping method
    lineItems.push({
      price,
      quantity: 1
    })
  }

  const session = await client.checkout.sessions.create({
    payment_method_types: [
      'card'
    ],
    customer: stripeCustomerId,
    line_items: lineItems,
    mode: 'payment',
    metadata,
    success_url: config.stripe.checkoutSuccess,
    cancel_url: config.stripe.checkoutCancel,
    shipping_address_collection: shippingAddressCollection
  })

  return session.id
}

const createFopccCheckoutSession = async (userId, stripeCustomerId) => {
  await cache.remove(`orders-${userId}`)

  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  const session = await client.checkout.sessions.create({
    payment_method_types: [
      'card'
    ],
    customer: stripeCustomerId,
    line_items: [{
      price: config.stripe.fopccId,
      quantity: 1,
      description: 'Friends of PCC'
    }],
    mode: 'subscription',
    success_url: config.stripe.fopccSuccess,
    cancel_url: config.stripe.fopccCancel
  })

  return session.id
}

const updateFopccCheckoutSession = async (userId, stripeCustomerId, subscriptionId) => {
  await cache.remove(`orders-${userId}`)

  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  const session = await client.checkout.sessions.create({
    payment_method_types: [
      'card'
    ],
    mode: 'setup',
    customer: stripeCustomerId,
    setup_intent_data: {
      metadata: {
        customer_id: stripeCustomerId,
        subscription_id: subscriptionId
      }
    },
    success_url: config.stripe.fopccSuccess,
    cancel_url: config.stripe.fopccCancel
  })

  return session.id
}

const getOrders = async (userId, stripeCustomerId) => {
  if (!stripeCustomerId) {
    return []
  }

  const cached = await cache.get(`orders-${userId}`)

  if (cached) {
    return cached
  }

  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)
  const orders = []

  for await (const paymentIntent of client.paymentIntents.list({
    customer: stripeCustomerId,
    limit: 100
  })) {
    if (!paymentIntent.charges.total_count) {
      // no charges on this payment intent, nothing to see here
      continue
    }

    const order = {
      id: paymentIntent.id,
      date: paymentIntent.created * 1000,
      amount: paymentIntent.amount
    }

    orders.push(order)
  }

  await cache.set(`orders-${userId}`, orders)

  return orders
}

const getOrderItems = async (paymentIntent) => {
  const cached = await cache.get(`order-items-${paymentIntent}`)

  if (cached) {
    return cached
  }

  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)
  const items = []
  const session = await getCheckoutSession(paymentIntent)

  for await (const lineItem of client.checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ['data.price.product']
  })) {
    const item = {
      slug: lineItem.price.product.metadata.slug,
      name: lineItem.price.product.name,
      description: lineItem.description,
      quantity: lineItem.quantity,
      price: lineItem.amount_total,
      productMetadata: lineItem.price.product.metadata,
      metadata: JSON.parse(session.metadata[`item-${items.length}`] || '{}')
    }

    if (item.productMetadata['shipping-weight']) {
      item.productMetadata.shippingWeight = parseInt(item.productMetadata['shipping-weight'], 10)
      delete item.productMetadata['shipping-weight']
    } else {
      item.productMetadata.shippingWeight = 0
    }

    if (item.productMetadata.designs) {
      item.productMetadata.designs = JSON.parse(item.productMetadata.designs)
    }

    if (item.productMetadata.mockups) {
      item.productMetadata.mockups = JSON.parse(item.productMetadata.mockups)
    }

    items.push(item)
  }

  await cache.set(`order-items-${paymentIntent}`, items)

  return items
}

const getOrCreateCustomerId = async (user) => {
  if (user.stripeCustomerId) {
    return user.stripeCustomerId
  }

  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  // search existing customers by email
  const {
    data: customers
  } = await client.customers.list({
    email: user.email,
    limit: 1
  })

  if (customers.length) {
    console.info(`Retrieved existing customer id ${customers[0].id} for ${user.email}`)

    return customers[0].id
  }

  // create a new customer
  const customer = await client.customers.create({
    email: user.email,
    name: user.name,
    phone: user.phone
  })

  console.info(`Created customer id ${customer.id} for ${user.email}`)

  return customer.id
}

async function updateFopccPaymentMethod (customerId, subscriptionId, setupIntent) {
  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  const intent = await client.setupIntents.retrieve(setupIntent)

  if (!intent) {
    throw new httpErrors.BadGateway('No intent found for passed id')
  }

  const paymentMethod = intent && intent.payment_method

  if (!paymentMethod) {
    throw new httpErrors.BadGateway('No payment method found for passed id')
  }

  // update payment method for customer
  await client.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethod
    }
  })

  // update payment method for subscription
  await client.subscriptions.update(subscriptionId, {
    default_payment_method: paymentMethod
  })
}

async function updateCustomer (user, details) {
  if (!user.stripeCustomerId) {
    return
  }

  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  const update = {
    name: details.name,
    phone: details.phone,
    email: details.email
  }

  await client.customers.update(
    user.stripeCustomerId,

    // strip undefined fields
    JSON.parse(JSON.stringify(update))
  )
}

async function cancelFopccMembership (customerId, subscriptionId) {
  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  await client.subscriptions.del(subscriptionId)
}

async function getPaymentDigits (charge) {
  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  const chargeDetails = await client.charges.retrieve(charge)

  return chargeDetails && chargeDetails.payment_method_details && chargeDetails.payment_method_details.card && chargeDetails.payment_method_details.card.last4
}

function verifyWebhookEvent (body, signature) {
  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  try {
    return client.webhooks.constructEvent(body, signature, config.stripe.webhookSecret)
  } catch (err) {
    throw new httpErrors.BadRequest(`Could not verify webhook signature: ${err.message}`)
  }
}

async function setPaymentMetadata (paymentIntentId, metadata) {
  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  await client.paymentIntents.update(paymentIntentId, {
    metadata
  })
}

async function getPaymentMetadata (paymentIntentId) {
  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  const {
    metadata
  } = await client.paymentIntents.retrieve(paymentIntentId)

  return metadata
}

async function getCheckoutSession (paymentIntentId) {
  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  const sessions = await client.checkout.sessions.list({
    payment_intent: paymentIntentId,
    limit: 100
  })

  for (const session of sessions.data) { // eslint-disable-line no-unreachable-loop
    return session
  }
}

module.exports = {
  getProducts,
  getOrders,
  getOrCreateCustomerId,
  createCheckoutSession,
  createFopccCheckoutSession,
  updateFopccCheckoutSession,
  updateFopccPaymentMethod,
  cancelFopccMembership,
  getPaymentDigits,
  updateCustomer,
  verifyWebhookEvent,
  getOrderItems,
  setPaymentMetadata,
  getPaymentMetadata,
  getCheckoutSession
}
