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
  getNewOrders
  // setOrderItemsStatus
} = require('./stripe-client')
const {
  sendEmail
} = require('./email')
const {
  config,
  OPTIONS
} = require('./config')
const createOrderSpreadsheet = require('./create-order-spreadsheet')

const ORDER_ITEMS_MINIMUM = 5

async function kitOrdersCreateHandler () {
  const lastOrder = await getLastOrder()
  const since = lastOrder ? lastOrder.date : 0

  console.info('Fetching made-to-order items starting at timestamp', since)

  const items = {}
  let orders = await getNewOrders(since)

  console.info('Orders')
  console.info(JSON.stringify(orders, null, 2))

  orders = orders.filter(order => {
    console.info(JSON.stringify(order, null, 2))

    // ignore any non made-to-order items
    order.items = order.items.filter(item => item.productMetadata.type === 'made-to-order')

    // process order items for sending to supplier
    order.items.forEach(item => {
      const codes = OPTIONS.productPrices[item.slug]

      if (!codes) {
        if (!item.slug.includes('2022')) {
          console.error('Old kit in order')
          return
        }

        throw new Error(`Could not load product codes for product with slug ${item.slug}`)
      }

      let sku

      if (typeof codes === 'string') {
        sku = codes
      }

      if (sku == null && Boolean(Object.keys(item.metadata).length)) {
        const choices = []

        for (const [key, value] of Object.entries(item.metadata)) {
          if (key === 'size') {
            continue
          }

          choices.push(value)
        }

        const matrix = choices.join('-')

        sku = codes[matrix]

        if (sku == null) {
          throw new Error(`Could not load sku for product with slug ${item.slug} and matrix ${matrix}`)
        }
      }

      const details = OPTIONS.productCodes[sku]

      if (details == null) {
        throw new Error(`Could not load line details for product with slug ${item.slug} and SKU ${sku}`)
      }

      if (items[sku] == null) {
        items[sku] = {
          name: details.name,
          notes: details.notes || '',
          section: item.productMetadata.section,
          quantity: 0,
          sizes: {}
        }
      }

      if (items[sku].sizes[item.metadata.size] == null) {
        items[sku].sizes[item.metadata.size] = 0
      }

      items[sku].quantity += +item.quantity
      items[sku].sizes[item.metadata.size] += +item.quantity

      item.supplierName = details.name
      item.supplierNotes = details.notes
      item.supplierSku = sku
    })

    // ignore any orders with no made-to-order items
    return Boolean(order.items.length)
  })

  console.info('Items')
  console.info(JSON.stringify(items, null, 2))

  // make sure we have more than 5x items (not including accessories)
  let itemCount = 0

  Object.values(items).forEach(item => {
    if (item.section !== 'accessories') {
      itemCount++
    }
  })

  if (itemCount >= ORDER_ITEMS_MINIMUM) {
    const orderDate = new Date()
    const date = `${new Intl.DateTimeFormat('en', { month: 'long' }).format(orderDate)} ${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(orderDate)}`

    const supplierTitle = `Peckham Cycle Club kit order - ${date}`
    const clubTitle = `Kit orders - ${date}`

    const spreadsheet = createOrderSpreadsheet(items)

    await sendEmail(
      config.email.from,
      config.email.from,
      clubTitle,
      htmlTemplateClubNotification(date, orders),
      textTemplateClubNotification(date, orders), [
        spreadsheet
      ]
    )
    await sendEmail(
      // uncomment when sending emails direct to suppliers..
      // config.kit.email,
      config.email.from,
      config.email.from,
      supplierTitle,
      htmlTemplateSupplierNotification(config.kit.name, items),
      textTemplateSupplierNotification(config.kit.name, items), [
        spreadsheet
      ]
    )
    // await createOrder(orderDate, orders.map(order => order.payment))

    // uncomment when sending emails direct to suppliers..
    // await setOrderItemsStatus(orders.map(order => order.payment), 'production')
  } else {
    console.info(`Only ${itemCount} items ordered this month, ${Object.keys(items).length} including accessories`)
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

const htmlTemplateSupplierNotification = (name, items) => `
<html>
  <head>
  </head>
  <body>
    <p>Hi ${name},</p>
    <p>Please may we place an order for the following items:</p>
    <p>${
      Object.keys(items).map(sku => {
        let item = `${items[sku].quantity}x ${sku} "${items[sku].name}"`

        if (items[sku].notes) {
          item += `<br/>${items[sku].notes}`
        }

        return item
      }).join('<br/><br/>')
    }</p>
    <p>${
      Object.keys(items).reduce((acc, sku) => acc + items[sku].quantity, 0)
    } items total.</p>
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

const textTemplateSupplierNotification = (name, items) => `
Hi ${name},

Please may we place an order for the following items:

${
  Object.keys(items).map(sku => {
    let item = `${items[sku].quantity}x ${sku} "${items[sku].name}"`

    if (items[sku].notes) {
      item += `\r\n${items[sku].notes}`
    }

    return item
  })
    .join('\r\n\r\n')
}

${
  Object.keys(items).reduce((acc, sku) => acc + items[sku].quantity, 0)
} items total.

Thanks,

Alex

--

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
      ${order.items.map(item => {
        let line = `${item.quantity}x ${item.name}`

        if (item.supplierSku) {
          line += ` - ${item.supplierSku}`
        }

        if (item.supplierName) {
          line += ` "${item.supplierName}"`
        }

        if (item.supplierNotes) {
          line += `<br/>"${item.supplierNotes}"`
        }

        if (Object.keys(item.metadata).length) {
          line += `<br/>${item.description}`
        }

        return line
      }).join('<br/><br/>')}</p>`
    })
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
${order.items.map(item => {
  let line = `${item.quantity}x ${item.name}`

  if (item.supplierSku) {
    line += ` - ${item.supplierSku}`
  }

  if (item.supplierName) {
    line += ` "${item.supplierName}"`
  }

  if (item.supplierNotes) {
    line += `\r\n"${item.supplierNotes}"`
  }

  if (Object.keys(item.metadata).length) {
    line += `\r\n${item.description}`
  }

  return line
}).join('\r\n')}`
  }).join('\r\n')
}

--

Peckham Cycle Club

peckhamcc@gmail.com
https://peckham.cc
https://facebook.com/PeckhamCC
https://twitter.com/PeckhamCC
https://instagram.com/PeckhamCC
`
