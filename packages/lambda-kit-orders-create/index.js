const middy = require('middy')
const {
  cors
} = require('middy/middlewares')
const {
  errorHandler
} = require('./middleware')
const {
  createOrder,
  getLastOrder
} = require('./kit')
const {
  getNewOrders
  // setOrderItemsStatus
} = require('./stripe-client')
const {
  sendEmail
} = require('./email')
const {
  config
} = require('./config')

async function kitOrdersCreateHandler () {
  const lastOrder = await getLastOrder()
  const since = lastOrder ? lastOrder.date : 0

  console.info('Fetching made-to-order items starting at timestamp', since)

  const items = []
  let orders = await getNewOrders(since)

  orders = orders.filter(order => {
    // ignore deleted customers
    if (order.deleted) {
      return false
    }

    console.info(JSON.stringify(order, null, 2))

    // ignore any non made-to-order items
    order.items = order.items.filter(item => item.productMetadata.type === 'made-to-order')

    // process order items for sending to supplier
    order.items.forEach(item => {
      const hasVariations = Boolean(Object.keys(item.metadata).length)

      if (hasVariations) {
        if (!items[item.name]) {
          items[item.name] = {}
        }

        if (!items[item.name][item.description]) {
          items[item.name][item.description] = 0
        }

        items[item.name][item.description] += +item.quantity
      } else {
        items[item.name] = (items[item.name] || 0) + item.quantity
      }
    })

    // ignore any orders with no made-to-order items
    return Boolean(order.items.length)
  })

  console.info('Orders')
  console.info(JSON.stringify(orders, null, 2))

  if (Object.keys(items).length) {
    const orderDate = new Date()
    const date = `${new Intl.DateTimeFormat('en', { month: 'long' }).format(orderDate)} ${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(orderDate)}`

    const supplierTitle = `Peckham Cycle Club kit order - ${date}`
    const clubTitle = `Kit orders - ${date}`

    await sendEmail(
      config.email.from,
      config.email.from,
      clubTitle,
      htmlTemplateClubNotification(date, orders),
      textTemplateClubNotification(date, orders)
    )
    await sendEmail(
      // config.kit.email,
      config.email.from,
      config.email.from,
      supplierTitle,
      htmlTemplateCreateOrder(config.kit.name, items),
      textTemplateCreateOrder(config.kit.name, items)
    )
    await createOrder(orderDate, orders.map(order => order.payment))
    // await setOrderItemsStatus(orders.map(order => order.payment), 'production')
  } else {
    console.info('Nothing ordered this month')
  }

  return {
    statusCode: 204,
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

module.exports = {
  handler: middy(kitOrdersCreateHandler)
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}

const htmlTemplateCreateOrder = (name, items) => `
<html>
  <head>
  </head>
  <body>
    <p>Hi ${name},</p>
    <p>Please may we place an order for the following items:</p>
    <p>${
      Object.keys(items).map(name => {
        return `${typeof items[name] === 'number'
      ? `${items[name]}x ${name}
    `
      : `${name}<br/>
    ${Object.keys(items[name]).map(variant => {
      return `${items[name][variant]}x ${variant}`
    }).join('<br/>')}
    <br/>${Object.keys(items[name]).reduce((acc, curr) => acc + items[name][curr], 0)} total`}`
}).join('</p><p>')
    }</p>
    <p>Thanks,</p>
    <p>Alex</p>
    <p>Peckham Cycle Club</p>
    <p>
      <a href="mailto:peckhamcc@gmail.com">peckhamcc@gmail.com</a><br />
      <a href="https://peckham.cc">https://peckham.cc</a><br />
      <a href="https://facebook.com/PeckhamCC">https://facebook.com/PeckhamCC</a><br />
      <a href="https://twitter.com/PeckhamCC">https://twitter.com/PeckhamCC</a><br />
      <a href="https://instagram.com/PeckhamCC">https://instagram.com/PeckhamCC</a>
    </p>
  </body>
</html>
`

const textTemplateCreateOrder = (name, items) => `
Hi ${name},

Please may we place an order for the following items:

${
  Object.keys(items).map(name => {
    return `${typeof items[name] === 'number'
  ? `${items[name]}x ${name}
`
  : `${name}
${Object.keys(items[name]).map(variant => {
  return `${items[name][variant]}x ${variant}`
}).join('\r\n')}
${Object.keys(items[name]).reduce((acc, curr) => acc + items[name][curr], 0)} total
`}`
}).join('\r\n')
}

Thanks,

Alex

Peckham Cycle Club

peckhamcc@gmail.com
https://peckham.cc
https://facebook.com/PeckhamCC
https://twitter.com/PeckhamCC
https://instagram.com/PeckhamCC
`

const htmlTemplateClubNotification = (date, orders) => `
<html>
  <head>
  </head>
  <body>
    <p>Orders for ${date}</p>
    ${
      orders.map(order => {
        return `
    <p>${order.name}<br/>
      ${new Intl.DateTimeFormat('en', { minute: 'numeric', hour: 'numeric', day: 'numeric', month: 'short', year: 'numeric' }).format(order.date)}<br/>
      ${order.items.map(item => `${item.quantity}x ${item.name}${Object.keys(item.metadata).length ? ` ${item.description}` : ''}`).join('<br/>')}</p>`
      }).join('\r\n')
    }
    <p>Peckham Cycle Club</p>
    <p>
      <a href="mailto:peckhamcc@gmail.com">peckhamcc@gmail.com</a><br />
      <a href="https://peckham.cc">https://peckham.cc</a><br />
      <a href="https://facebook.com/PeckhamCC">https://facebook.com/PeckhamCC</a><br />
      <a href="https://twitter.com/PeckhamCC">https://twitter.com/PeckhamCC</a><br />
      <a href="https://instagram.com/PeckhamCC">https://instagram.com/PeckhamCC</a>
    </p>
  </body>
</html>
`

const textTemplateClubNotification = (date, orders) => `
Orders for ${date}
${
  orders.map(order => {
  return `
${order.name}
${new Intl.DateTimeFormat('en', { minute: 'numeric', hour: 'numeric', day: 'numeric', month: 'short', year: 'numeric' }).format(order.date)}
${order.items.map(item => `${item.quantity}x ${item.name}${Object.keys(item.metadata).length ? ` ${item.description}` : ''}`).join('\r\n')}`
  }).join('\r\n')
}

Peckham Cycle Club

peckhamcc@gmail.com
https://peckham.cc
https://facebook.com/PeckhamCC
https://twitter.com/PeckhamCC
https://instagram.com/PeckhamCC
`
