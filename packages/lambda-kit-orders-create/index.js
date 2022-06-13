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
  getNewOrders,
  getPayment
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
  const orders = []

  for (const order of await getNewOrders(since)) {
    console.info('loaded order')
    console.info(JSON.stringify(order, null, 2))

    const payment = await getPayment(order.payment)
    console.info('loaded payment metadata')
    console.info(JSON.stringify({
      id: order.payment,
      metadata: payment.metadata
    }, null, 2))

    // process order items for sending to supplier
    order.items.forEach((item, index) => {
      if (item.productMetadata.type !== 'made-to-order') {
        // ignore any non made-to-order items
        return
      }

      const codes = OPTIONS.productPrices[item.slug]

      if (!codes) {
        if (!item.slug.includes('2022')) {
          console.error('Old kit in order')
          return
        }

        throw new Error(`Could not load product codes for product with slug ${item.slug}`)
      }

      /** @type {string} */
      let sku

      if (typeof codes === 'string') {
        sku = codes
      }

      let metadata = item.metadata
      let description = item.description

      // if metadata has been set on the payment, use that to derive the SKU,
      // otherwise use the immutable metadata from the checkout
      if (payment.metadata[`item-${index}-metadata`] != null) {
        console.info('Payment', order.payment, 'has overridden metadata')
        metadata = JSON.parse(payment.metadata[`item-${index}-metadata`])
      }

      if (sku == null && Boolean(Object.keys(item.metadata).length)) {
        const choices = []

        // ensure the order is constant
        for (const key of item.productMetadata.options.split('-')) {
          if (key === 'size') {
            // size does not affect sku
            continue
          }

          choices.push(metadata[key])
        }

        const matrix = choices.join('-')

        sku = codes[matrix]

        if (sku == null) {
          throw new Error(`Could not load sku for product with slug ${item.slug} and matrix ${matrix}`)
        }

        // if this product has options, update description based on (possibly) updated metadata
        description = item.productMetadata.options.split('-').map(option => {
          const optionDetails = OPTIONS[option]
          const value = metadata[option]

          if (option === 'size') {
            const chart = OPTIONS[option][item.productMetadata['size-chart']]

            return `${chart.name}: ${chart.options[value].name}`
          } else {
            return `${optionDetails.name}: ${optionDetails.options[value]}`
          }
        }).join(', ')
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

      if (items[sku].sizes[metadata.size] == null) {
        items[sku].sizes[metadata.size] = 0
      }

      items[sku].quantity += +item.quantity
      items[sku].sizes[metadata.size] += +item.quantity

      item.supplierName = details.name
      item.supplierNotes = details.notes
      item.supplierSku = sku
      item.description = description
    })

    // filter out any non made-to-order items
    order.items = order.items.filter(item => item.productMetadata.type === 'made-to-order')

    // ignore any orders with no made-to-order items
    if (order.items.length) {
      orders.push(order)
    }
  }

  console.info('Orders')
  console.info(JSON.stringify(orders, null, 2))

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
          item += `<br/>Notes: ${items[sku].notes}`
        }

        if (items[sku].sizes) {
          item += '<br/>Sizes:'
          Object.keys(items[sku].sizes).forEach(key => {
            item += `<br/>${key}: ${items[sku].sizes[key]}x`
          })
        }

        return item
      }).join('<br/><br/>')
    }</p>
    <p>${
      Object.keys(items).reduce((acc, sku) => acc + items[sku].quantity, 0)
    } items total.</p>
    <p>Please see the attached spreadsheet and let me know if anything doesn't make sense.</p>
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
      item += `\r\nNotes: ${items[sku].notes}`
    }

    if (items[sku].sizes) {
      item += '\r\nSizes:'
      Object.keys(items[sku].sizes).forEach(key => {
        item += `\r\n${key}: ${items[sku].sizes[key]}x`
      })
    }

    return item
  })
    .join('\r\n\r\n')
}

${
  Object.keys(items).reduce((acc, sku) => acc + items[sku].quantity, 0)
} items total.

Please see the attached spreadsheet and let me know if anything doesn't make sense.

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
    <p><b>${order.name}</b><br/>
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
            line += `<br/>Notes: ${item.supplierNotes}`
          }

          if (Object.keys(item.metadata).length) {
            line += `<br/>${item.description}`
          }

          return line
        }).join('<br/><br/>')}</p>`
      }).join('')
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
    line += `\r\nNotes: ${item.supplierNotes}`
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
