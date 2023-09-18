'use strict'

const {
  sendEmail
} = require('./email')
const {
  config
} = require('./config')
const {
  vistaPrintOrderEmail
} = require('./emails')

function createClient () {
  return {
    createOrder: async (user, checkoutSession, lineItems) => {
      const {
        payment_intent: paymentIntentId,
        shipping
      } = checkoutSession

      const order = {
        external_id: paymentIntentId,
        brandName: 'Peckham Cycle Club',
        shipping_address: {
          firstName: shipping?.name?.split(' ')[0],
          lastName: shipping?.name?.split(' ').slice(1).join(' '),
          address1: shipping?.address?.line1,
          address2: shipping?.address?.line2,
          city: shipping?.address?.city,
          county: shipping?.address?.state,
          postcode: shipping?.address?.postal_code,
          country: 'United Kingdom',
          phone1: user.phone
        },
        items: lineItems.map(item => {
          return {
            code: item.productMetadata.code,
            size: item.metadata.size,
            quantity: item.quantity
          }
        })
      }

      console.info(JSON.stringify(order, null, 2))

      // TODO: for now, just email the club details
      await sendEmail(config.email.to, user.email, 'VistaPrint order created', vistaPrintOrderEmail.html(JSON.stringify(order, null, 2)), vistaPrintOrderEmail.text(JSON.stringify(order, null, 2)))
    }
  }
}

module.exports = createClient()
