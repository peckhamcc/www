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
/*
const {
  // sendEmail
} = require('./email')
*/
const {
  config
} = require('./config')

async function kitOrdersCreateHandler () {
  const lastOrder = await getLastOrder()
  const since = lastOrder ? lastOrder.date : 0

  console.info('Fetching items starting at timestamp', since)

  const items = await getKitOrderItems(since)

  if (Object.keys(items).length) {
    console.info('Sending order for')
    console.info(JSON.stringify(items, null, 2))

    const orderDate = new Date()
    const orderTitle = `Peckham Cycle Club kit order - ${new Intl.DateTimeFormat('en', { month: 'long' }).format(orderDate)} ${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(orderDate)}`

    console.info(orderTitle)
    console.info('to', config.kit.email)
    console.info(htmlTemplateCreateOrder(config.kit.name, items))
    console.info(textTemplateCreateOrder(config.kit.name, items))

    /*
    await sendEmail(
      config.kit.email,
      config.email.from,
      orderTitle,
      htmlTemplateCreateOrder(config.kit.name, items),
      textTemplateCreateOrder(config.kit.name, items)
    )
    await setOrderItemsStatus(since, 'production')
    await createOrder(orderDate)
     */
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
    <p>I hope you're doing well.</p>
    <p>Please may we place an order for the following items:</p>
    ${
      Object.keys(items).map(name => {
        return `
    <h3>${name}<h3>${
        Object.keys(items[name]).map(variant => {
          return `
    <p>${variant} x${items[name][variant]}</p>`
        })
      }`
      })
    }
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

I hope you're doing well.

Please may we place an order for the following items:
${
  Object.keys(items).map(name => {
    return `

${name}
${Object.keys(items[name]).map(variant => {
    return `
${items[name][variant]}x ${variant}`
})}`
}).join(`
`)
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
