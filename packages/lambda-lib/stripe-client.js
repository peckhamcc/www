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
  max: 700,
  price: config.stripe.shipping[0]
}, {
  max: Infinity,
  price: config.stripe.shipping[1]
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
  const sections = {}

  for await (const product of client.products.list({
    active: true
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
        if (product.metadata[option]) {
          options[option] = product.metadata[option].split('-')
          return
        }

        if (product.metadata.gender) {
          // some options are split by gender
          const genderOptions = {}

          product.metadata.gender.split('-').forEach(gender => {
            const genderKey = `${option}-${gender}`

            if (product.metadata[genderKey] == null) {
              console.error('Product', product.name, 'has option', option, 'which may be gendered, but it is not defined in the product metadata under', genderKey)
              return
            }

            if (product.metadata[genderKey]) {
              genderOptions[gender] = product.metadata[genderKey].split('-')
            }
          })

          options[option] = genderOptions

          return
        }

        if (options[option] == null) {
          console.error('Product', product.name, 'has option', option, 'but it is not defined in the product metadata')
        }
      })
    }

    const prices = {}

    for await (const price of client.prices.list({
      limit: 100,
      active: true,
      product: product.id
    })) {
      if (!price.active) {
        continue
      }

      if (!price.nickname) {
        console.error('Price', price.id, 'for product', product.name, 'has no nickname configured - set it to the supplier product code')
      }

      prices[price.nickname] = {
        id: price.id,
        type: price.type,
        amount: price.unit_amount
      }
    }

    if (!Object.keys(prices).length) {
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
      prices,
      type: product.metadata.type,
      shippingWeight: parseInt(product.metadata['shipping-weight'] || '0', 10),
      variations: product.metadata.options
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

    const chosen = []

    if (product.variations) {
      metadata[`item-${index}`] = JSON.stringify(item.options)

      // ensure the order is constant
      description = product.variations.split('-').map(option => {
        const optionDetails = OPTIONS[option]
        const value = item.options[option]

        if (option === 'size') {
          const chart = OPTIONS[option][product.sizeChart]

          return `${chart.name}: ${chart.options[value].name}`
        } else {
          chosen.push(value)

          return `${optionDetails.name}: ${optionDetails.options[value]}`
        }
      }).join(', ')
    }

    shippingWeight += (product.shippingWeight || 0) * item.quantity

    const codes = OPTIONS.productPrices[product.slug]

    if (!codes) {
      throw new Error(`No product prices defined in config for ${product.slug}`)
    }

    const matrix = chosen.join('-')
    let code

    if (matrix === '') {
      if (typeof codes !== 'string') {
        throw new Error(`Product ${product.slug} only had size option but multiple configured prices`)
      }

      code = codes
    } else {
      code = codes[matrix]
    }

    if (!code) {
      throw new Error(`No product price defined in config for ${product.slug} and selection ${matrix}`)
    }

    const price = product.prices[code]

    return {
      price: price.id,
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

const getOrder = async (paymentIntentId) => {
  const order = await getCachedOrder(paymentIntentId)

  if (!order) {
    return
  }

  // order items are cached, payment metadata is not as it is
  // updated as the order progresses
  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)
  const paymentIntent = await client.paymentIntents.retrieve(paymentIntentId)

  order.items.forEach((item, index) => {
    item.status = paymentIntent.metadata[`item-${index}`]
  })

  await cache.set(`order-${paymentIntentId}`, order)

  return order
}

const getCachedOrder = async (paymentIntentId) => {
  const cacheKey = `order-${paymentIntentId}`
  const cached = await cache.get(cacheKey)

  if (cached) {
    return cached
  }

  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)
  const session = await getCheckoutSession(paymentIntentId)

  if (!session) {
    // if there's no checkout session, the payment may be from a different
    // integration, e.g. ti.to ticket sales etc
    return
  }

  const paymentIntent = await getPayment(paymentIntentId)
  const customer = await client.customers.retrieve(session.customer)

  const order = {
    name: customer.name,
    deleted: Boolean(customer.deleted),
    amount: paymentIntent.amount,
    date: paymentIntent.created * 1000,
    payment: paymentIntentId,
    items: []
  }

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
      metadata: JSON.parse(session.metadata[`item-${order.items.length}`] || '{}')
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

    order.items.push(item)
  }

  await cache.set(cacheKey, order)

  return order
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

async function updateFopccPaymentMethod (customerId, existingSubscriptionId, setupIntent) {
  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  const intent = await client.setupIntents.retrieve(setupIntent)

  if (!intent) {
    throw new httpErrors.BadGateway('No intent found for passed id')
  }

  const paymentMethod = intent && intent.payment_method

  if (!paymentMethod) {
    throw new httpErrors.BadGateway('No payment method found for passed id')
  }

  const subscriptionId = intent && intent.metadata && intent.metadata.subscription_id

  if (!subscriptionId) {
    throw new httpErrors.BadGateway('No subscription id found in payment intent metadata')
  }

  if (subscriptionId !== existingSubscriptionId) {
    console.info('Subscription ID was incorrect - new subscription', subscriptionId, 'did not match existing subscription', existingSubscriptionId)
    throw new httpErrors.BadRequest('Subscription ID was incorrect')
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

async function getPayment (paymentIntentId) {
  const cacheKey = `payment-${paymentIntentId}`
  const cached = await cache.get(cacheKey)

  if (cached) {
    return cached
  }

  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  const payment = await client.paymentIntents.retrieve(paymentIntentId)

  await cache.set(cacheKey, payment)

  return payment
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

  console.error('No session found for payment intent id', paymentIntentId, 'in', JSON.stringify(sessions, null, 2))
}

async function getRRCOrders () {

}

async function getNewOrders (fromDate) {
  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)
  const orders = []

  // pagination
  let startingAfter
  let page = 1
  let payments = {
    has_more: true
  }

  while (payments.has_more) {
    console.info('stripe-client[getNewOrders]', 'Fetching page', page)
    payments = await client.paymentIntents.list({
      limit: 100,
      starting_after: startingAfter,
      created: {
        gt: fromDate
      }
    })

    for (const paymentIntent of payments.data) {
      startingAfter = paymentIntent.id

      if (!paymentIntent.charges.total_count) {
        // no charges on this payment intent, nothing to see here
        console.info('stripe-client[getNewOrders]', paymentIntent.id, 'had no charges')
        continue
      }

      const order = await getCachedOrder(paymentIntent.id)

      // some payments are not linked to an order
      if (order) {
        // ignore deleted customers
        if (!order.deleted) {
          console.info('stripe-client[getNewOrders]', paymentIntent.id, 'had order')
          orders.push(order)
        } else {
          console.info('stripe-client[getNewOrders]', paymentIntent.id, 'had deleted order')
        }
      } else {
        console.info('stripe-client[getNewOrders]', paymentIntent.id, 'had no order')
      }
    }

    page++
  }

  console.info('stripe-client[getNewOrders]', 'Returning', orders.length, 'orders')

  return orders
}

async function setOrderItemsStatus (since, status) {
  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  // pagination
  let endingBefore

  for await (const paymentIntent of client.paymentIntents.list({
    limit: 100,
    ending_before: endingBefore,
    created: {
      gt: since
    }
  })) {
    endingBefore = paymentIntent.id

    if (!paymentIntent.charges.total_count) {
      // no charges on this payment intent, nothing to see here
      continue
    }

    const metadata = paymentIntent.metadata
    const order = await getOrder(paymentIntent.id)

    if (!order) {
      // no order associated with this payment id (may be for something like ti.to ticket sales etc)
      continue
    }

    const { items: orderItems } = order

    orderItems.forEach((item, index) => {
      // only made to order items
      if (item.productMetadata.type !== 'made-to-order') {
        return
      }

      metadata[`item-${index}`] = status
    })

    await setPaymentMetadata(paymentIntent.id, metadata)
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
  getOrder,
  setPaymentMetadata,
  getPayment,
  getCheckoutSession,

  getRRCOrders,
  getNewOrders,
  setOrderItemsStatus
}
