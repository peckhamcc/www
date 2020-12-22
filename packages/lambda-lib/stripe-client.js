'use strict'

const stripe = require('stripe')
const {
  config,
  OPTIONS
} = require('./config')

const STRIPE_OPTS = {
  maxNetworkRetries: 5
}

const getProducts = async () => {
  if (!config.flags.shop) {
    return []
  }

  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  const prices = {}

  for await (const price of client.prices.list()) {
    prices[price.product] = price
  }

  const sections = {}

  for await (const product of client.products.list({
    active: true
  })) {
    const section = product.metadata.section

    if (!section) {
      console.error('Product', product.name, 'has no section defined')
      continue
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
      }
    })
  }

  return Object.keys(sections).reduce((acc, section) => {
    acc.push(sections[section])

    return acc
  }, [])
}

const createCheckoutSession = async (user, items) => {
  const client = stripe(config.stripe.secretKey, STRIPE_OPTS)

  const products = await getProducts()
  const slugToProduct = products.reduce((lookup, section) => {
    section.items.forEach(item => {
      lookup[item.slug] = item
    })

    return lookup
  }, {})

  const metadata = {}

  const session = await client.checkout.sessions.create({
    payment_method_types: [
      'card'
    ],
    customer: user.stripeCustomerId,
    line_items: items.map((item, index) => {
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

      console.info(product)

      console.info({
        price: product.price.id,
        quantity: item.quantity,
        description: description || product.description
      })

      return {
        price: product.price.id,
        quantity: item.quantity,
        description
      }
    }),
    mode: 'payment',
    metadata,
    success_url: config.stripe.checkoutSuccess,
    cancel_url: config.stripe.checkoutCancel
  })

  return session.id
}

const getOrders = async (user) => {
  if (!user.stripeCustomerId) {
    return []
  }

  const client = stripe(config.stripe, STRIPE_OPTS)
  const orders = []

  for await (const paymentIntent of client.paymentIntents.list({
    customer: user.stripeCustomerId
  })) {
    if (!paymentIntent.charges.total_count) {
      // no charges on this payment intent, nothing to see here
      continue
    }

    const order = {
      id: paymentIntent.id,
      date: paymentIntent.created * 1000,
      amount: paymentIntent.amount,
      status: ((paymentIntent.metadata && paymentIntent.metadata.status) || 'pending'),
      items: []
    }

    const sessions = await client.checkout.sessions.list({
      payment_intent: paymentIntent.id,
      limit: 100
    })

    for (const session of sessions.data) {
      for await (const lineItem of client.checkout.sessions.listLineItems(session.id, {
        limit: 100,
        expand: ['data.price.product']
      })) {
        const item = {
          slug: lineItem.price.product.metadata.slug,
          name: lineItem.price.product.name,
          description: lineItem.description,
          quantity: lineItem.quantity,
          price: lineItem.amount_total
        }

        order.items.push(item)
      }
    }

    orders.push(order)
  }

  return orders
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
    return customers[0].id
  }

  // create a new customer
  const customer = await client.customers.create({
    email: user.email,
    name: user.name,
    phone: user.phone
  })

  return customer.id
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

module.exports = {
  getProducts,
  getOrders,
  getOrCreateCustomerId,
  createCheckoutSession,
  updateCustomer
}
