const middy = require('middy')
const {
  cors
} = require('middy/middlewares')
const {
  errorHandler
} = require('./middleware')
const {
  // createOrder,
  getLastOrder
} = require('./kit')
const {
  getKitOrderItems
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

  console.info('Fetching items starting at timestamp', since)

  const {
    orders,
    items
  } = await getKitOrderItems(since)

  if (Object.keys(items).length) {
    console.info('Orders')
    console.info(JSON.stringify(orders, null, 2))
    console.info('Items')
    console.info(JSON.stringify(items, null, 2))

    const orderDate = new Date()
    const date = `${new Intl.DateTimeFormat('en', { month: 'long' }).format(orderDate)} ${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(orderDate)}`

    const supplierTitle = `Peckham Cycle Club kit order - ${date}`
    const clubTitle = `Peckham Cycle Club kit order - ${date}`

    console.info(supplierTitle)
    console.info('to', config.kit.email)
    console.info(htmlTemplateCreateOrder(config.kit.name, items))
    console.info(textTemplateCreateOrder(config.kit.name, items))

    console.info(clubTitle)
    console.info('to', config.kit.email)
    console.info(htmlTemplateClubNotification(date, orders))
    console.info(textTemplateClubNotification(date, orders))

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
    // await setOrderItemsStatus(since, 'production')
    // await createOrder(orderDate)
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
    }).join('</p><p>')}
    `}`
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
      ${order.items.join('<br/>')}</p>`
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
${order.items.join('\r\n')}`
  }).join('\r\n')
}

Peckham Cycle Club

peckhamcc@gmail.com
https://peckham.cc
https://facebook.com/PeckhamCC
https://twitter.com/PeckhamCC
https://instagram.com/PeckhamCC
`
