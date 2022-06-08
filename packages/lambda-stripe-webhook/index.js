const middy = require('middy')
const httpErrors = require('http-errors')
const {
  cors
} = require('middy/middlewares')
const {
  errorHandler
} = require('./middleware')
const {
  getUserIdForCustomerId,
  updateUser,
  getUser
} = require('./account')
const {
  getPaymentDigits,
  updateFopccPaymentMethod,
  verifyWebhookEvent,
  getOrder,
  setPaymentMetadata
} = require('./stripe-client')
const {
  sendEmail
} = require('./email')
const {
  fopccNewSubscriptionEmail,
  fopccUpdatedSubscriptionEmail,
  fopccPaymentSuccessEmail,
  fopccPaymentFailureEmail,
  fopccCancellationEmail,
  shopOrderEmail
} = require('./emails')
const {
  config
} = require('./config')
const {
  createOrder: createInkThreadableOrder
} = require('./inkthreadable-client')

async function handleCheckoutComplete (context, event) {
  const { data: { object: { mode } } } = event
  console.info('Handling checkout mode', mode)

  if (mode === 'subscription') {
    // we are setting up a FoPCC Subscription
    await handleNewFoPCCSubscription(context, event)
  } else if (mode === 'setup') {
    // updating a FoPCC subscription
    await updateFoPCCSubscription(context, event)
  } else if (mode === 'payment') {
    // a regular shop transaction
    await handleShopOrder(context, event)
  }
}

async function handleNewFoPCCSubscription ({ userId, user }, { data: { object } }) {
  console.info('Handling new FoPCC subscription', object.subscription)

  const subscriptionId = object.subscription

  if (!subscriptionId) {
    throw new httpErrors.BadRequest('No subscription id found in webhook event')
  }

  if (user.fopcc && user.fopcc.subscriptionId) {
    throw new httpErrors.BadRequest('User already has a subscription')
  }

  console.info('Marking subscription', subscriptionId, 'for user', userId, 'pending-payment')

  // we are awaiting first payment
  await updateUser(userId, {
    fopcc: {
      subscriptionId,
      status: 'pending-payment'
    }
  })

  await sendEmail(user.email, config.email.from, 'You are now a Friend of PCC', fopccNewSubscriptionEmail.html(user.name), fopccNewSubscriptionEmail.text(user.name))
}

async function updateFoPCCSubscription ({ userId, user }, { data: { object } }) {
  console.info('Handling updated FoPCC subscription with setup intent', object.setup_intent)

  if (!user.fopcc || !user.fopcc.subscriptionId) {
    throw new httpErrors.BadRequest('User had no existing subscription')
  }

  // already had a membership, update the payment method
  const setupIntent = object.setup_intent

  if (!setupIntent) {
    throw new httpErrors.BadRequest('No setup intent found')
  }

  console.info('Updating payment information for subscription', user.fopcc.subscriptionId, 'for user', userId)

  await updateFopccPaymentMethod(
    user.stripeCustomerId,
    user.fopcc.subscriptionId,
    setupIntent
  )

  await sendEmail(user.email, config.email.from, 'Friend of PCC payment details updated', fopccUpdatedSubscriptionEmail.html(user.name), fopccUpdatedSubscriptionEmail.text(user.name))
}

async function handleShopOrder ({ userId, user }, { data: { object } }) {
  const paymentIntent = object.payment_intent

  if (!paymentIntent) {
    throw new httpErrors.BadRequest('No payment intent found')
  }

  const amount = object.amount_total

  if (!amount) {
    throw new httpErrors.BadRequest('No payment amount found')
  }

  const order = await getOrder(paymentIntent)

  if (!order) {
    throw new Error('No order found for payment intent id ' + paymentIntent)
  }

  const metadata = {}

  // see if we need to take any further action
  const lineItemTypes = {
    hasMtoKit: false,
    hasDropShipKit: false,
    hasPremadeKit: false,
    hasSubscription: false
  }

  order.items.forEach((item, index) => {
    if (item.productMetadata.type === 'premade') {
      metadata[`item-${index}`] = 'ready'
      lineItemTypes.hasPremadeKit = lineItemTypes.hasPremadeKit || true
    } else if (item.productMetadata.type === 'made-to-order') {
      metadata[`item-${index}`] = 'pending'
      lineItemTypes.hasMtoKit = lineItemTypes.hasMtoKit || true
    } else if (item.productMetadata.type === 'dropship') {
      metadata[`item-${index}`] = 'production'
      lineItemTypes.hasDropShipKit = lineItemTypes.hasDropShipKit || true
    } else if (item.productMetadata.type === 'subscription') {
      metadata[`item-${index}`] = 'n/a'
      lineItemTypes.hasSubscription = lineItemTypes.hasSubscription || true
    }
  })

  if (lineItemTypes.hasDropShipKit) {
    await createInkThreadableOrder(user, object, order.items.filter(item => item.productMetadata.type === 'dropship'))
  }

  await setPaymentMetadata(paymentIntent, metadata)

  await sendEmail(user.email, config.email.from, 'Peckham Cycle Club order', shopOrderEmail.html(user.name, amount, order.items, lineItemTypes), shopOrderEmail.text(user.name, amount, order.items, lineItemTypes))
}

async function handleInvoicePaid (context, event) {
  const { data: { object } } = event

  if (object.subscription) {
    await handleFoPCCPayment(context, event)
  }
}

async function handleFoPCCPayment ({ userId, user }, { data: { object } }) {
  if (user.fopcc && object.subscription !== user.fopcc.subscriptionId) {
    console.info('Subscription ID was incorrect - new subscription', object.subscription, 'did not match existing subscription', user.fopcc.subscriptionId)
    throw new httpErrors.BadRequest('Subscription ID was incorrect')
  }

  const lineItems = object.lines && object.lines.data

  if (!Array.isArray(lineItems)) {
    throw new httpErrors.BadRequest('Line items were not an array')
  }

  if (lineItems.length !== 1) {
    throw new httpErrors.BadRequest('Too many line items found')
  }

  const subscription = lineItems[0]
  const renews = subscription.period && subscription.period.end

  if (!renews) {
    throw new httpErrors.BadRequest('No subscription renewal date found')
  }

  const charge = object.charge

  if (!charge) {
    throw new httpErrors.BadRequest('No charge found')
  }

  const last4 = await getPaymentDigits(charge)

  if (!last4) {
    throw new httpErrors.BadRequest('No last4 found')
  }

  const invoice = object.hosted_invoice_url

  if (!invoice) {
    throw new httpErrors.BadRequest('No invoice found')
  }

  const amount = object.amount_paid

  if (!amount) {
    throw new httpErrors.BadRequest('No amount found')
  }

  const invoices = (user.fopcc && user.fopcc.invoices) || []

  invoices.push({
    date: Date.now(),
    amount,
    invoice
  })

  console.info('Marking subscription', object.subscription, 'for user', userId, 'active')

  await updateUser(userId, {
    fopcc: {
      ...user.fopcc,
      status: 'active',
      renews: renews * 1000,
      last4,
      invoices
    }
  })

  await sendEmail(user.email, config.email.from, 'Friend of PCC payment collected', fopccPaymentSuccessEmail.html(user.name, invoice), fopccPaymentSuccessEmail.text(user.name, invoice))
}

async function handleInvoicePaymentFailure (context, event) {
  const { data: { object } } = event

  if (object.subscription) {
    await handleFoPCCPaymentFailure(context, event)
  }
}

async function handleFoPCCPaymentFailure ({ userId, user }, { data: { object } }) {
  if (user.fopcc && object.subscription !== user.fopcc.subscriptionId) {
    console.info('Subscription ID was incorrect - new subscription', object.subscription, 'did not match existing subscription', user.fopcc.subscriptionId)
    throw new httpErrors.BadRequest('Subscription ID was incorrect')
  }

  console.info('Marking subscription', object.subscription, 'for user', userId, 'payment-failed')

  await updateUser(userId, {
    fopcc: {
      ...user.fopcc,
      status: 'payment-failed'
    }
  })

  await sendEmail(user.email, config.email.from, 'Friend of PCC payment failed', fopccPaymentFailureEmail.html(user.name), fopccPaymentFailureEmail.text(user.name))
}

async function handleFoPCCCancellation ({ userId, user }, { data: { object } }) {
  if (user.fopcc && object.id !== user.fopcc.subscriptionId) {
    console.info('Subscription ID was incorrect - new subscription', object.id, 'did not match existing subscription', user.fopcc.subscriptionId)
    throw new httpErrors.BadRequest('Subscription ID was incorrect')
  }

  console.info('Marking subscription', object.id, 'for user', userId, 'cancelled')

  await updateUser(userId, {
    fopcc: {
      ...user.fopcc,
      status: 'cancelled',
      subscriptionId: undefined
    }
  })
  await sendEmail(user.email, config.email.from, 'Friend of PCC membership cancelled', fopccCancellationEmail.html(user.name), fopccCancellationEmail.text(user.name))
}

async function stripeWebhook ({ body, headers }) {
  const event = verifyWebhookEvent(body, headers['Stripe-Signature'])

  console.info('event', JSON.stringify(event, null, 2))

  const type = event.type

  if (!type) {
    throw new httpErrors.BadRequest('No type found in webhook event')
  }

  const object = event.data && event.data.object

  if (!object) {
    throw new httpErrors.BadRequest('No object found in webhook event')
  }

  const customerId = object.customer

  if (!customerId) {
    throw new httpErrors.BadRequest('No customer id found in webhook event')
  }

  const userId = await getUserIdForCustomerId(customerId)

  if (!userId) {
    throw new httpErrors.BadRequest('No user id found for customer id')
  }

  const user = await getUser(userId)

  if (!user) {
    throw new httpErrors.BadRequest('No user found for user id')
  }

  const context = {
    userId,
    user,
    customerId
  }

  if (type === 'checkout.session.completed') {
    await handleCheckoutComplete(context, event)
  } else if (type === 'invoice.paid') {
    await handleInvoicePaid(context, event)
  } else if (type === 'invoice.payment_failed') {
    await handleInvoicePaymentFailure(context, event)
  } else if (type === 'customer.subscription.deleted') {
    await handleFoPCCCancellation(context, event)
  } else {
    throw new httpErrors.BadRequest('Unexpected type found in webhook event')
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
}

module.exports = {
  handler: middy(stripeWebhook)
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
