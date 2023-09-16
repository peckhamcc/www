'use strict'

const https = require('https')
const crypto = require('crypto')
const qs = require('querystring')
const {
  config
} = require('./config')

// print 'light' variants on 'dark' colours and vice versa
const COLOUR_MODIFIER = {
  WHI: 'dark',
  BLK: 'light',
  'BK/WH': 'dark'
}

const PCC_ASSETS = 'http://cc.peckham.assets.s3-website.eu-west-2.amazonaws.com'

const SHIPPING_LIMITS = [{
  max: 700,
  method: 'tracked'
}, {
  max: Infinity,
  method: 'amazon'
}]

const findShippingMethod = (shippingWeight) => {
  return SHIPPING_LIMITS
    .filter(method => shippingWeight < method.max)
    .map(method => method.method)
    .shift()
}

function createSignature (body, secretKey) {
  const shasum = crypto.createHash('sha1')
  shasum.update(body + secretKey)

  return shasum.digest('hex')
}

function createClient (appId, secretKey) {
  function apiUrl (resource, body, args = {}) {
    const url = new URL('https://www.inkthreadable.co.uk')
    url.pathname = `/api/${resource}.php`
    url.search = qs.stringify({
      ...args,
      AppId: appId,
      Signature: createSignature(body, secretKey)
    })

    return url
  }

  return {
    createOrder: async (user, checkoutSession, lineItems) => {
      const {
        payment_intent: paymentIntentId,
        shipping
      } = checkoutSession

      if (!shipping.address || shipping.address.country !== 'GB') {
        throw new Error('Invalid country provided, expected \'GB\'')
      }

      const order = {
        external_id: paymentIntentId,
        brandName: 'Peckham Cycle Club',
        shipping_address: {
          firstName: shipping.name.split(' ')[0],
          lastName: shipping.name.split(' ').slice(1).join(' '),
          company: '',
          address1: shipping.address.line1,
          address2: shipping.address.line2,
          city: shipping.address.city,
          county: shipping.address.state,
          postcode: shipping.address.postal_code,
          country: 'United Kingdom',
          phone1: user.phone
        },
        shipping: {
          shippingMethod: findShippingMethod(
            lineItems.reduce((acc, curr) => {
              return acc + parseInt(curr.productMetadata['shipping-weight'] || '0', 10)
            }, 0)
          )
        },
        items: lineItems.map(item => {
          const pnParts = [item.productMetadata.code, item.metadata.colour]

          if (item.metadata.colour) {
            pnParts.push(item.metadata.colour)
          }

          if (item.metadata.size) {
            pnParts.push(item.metadata.size)
          }

          const orderItem = {
            pn: pnParts.join('-'),
            quantity: item.quantity,
            retailPrice: (item.price / 100).toFixed(2)
          }

          if (item.productMetadata.label) {
            orderItem.label = {
              type: 'printed',
              name: `pcc-label-${COLOUR_MODIFIER[item.metadata.colour]}`
            }
          }

          if (item.productMetadata.designs) {
            orderItem.designs = {}

            Object.keys(item.productMetadata.designs).forEach(key => {
              let design = item.productMetadata.designs[key]

              if (item.metadata.colour) {
                design = `${design}-${COLOUR_MODIFIER[item.metadata.colour]}`
              }

              orderItem.designs[key] = `${PCC_ASSETS}/${design}.png`
            })
          }

          if (item.productMetadata.mockups) {
            orderItem.mockups = {}

            item.productMetadata.mockups.forEach(key => {
              orderItem.mockups[key] = `${PCC_ASSETS}/${item.slug}-${item.metadata.colour.toLowerCase().replaceAll('/', '-')}-${key}.png`
            })
          }

          return orderItem
        })
      }

      const body = JSON.stringify(order)

      const url = apiUrl('orders', body)

      console.info(url.toString())
      console.info(JSON.stringify(order, null, 2))

      return new Promise((resolve, reject) => {
        const request = https.request(url, {
          method: 'POST'
        }, response => {
          if (response.statusCode !== 200) {
            return reject(new Error(`Received status code ${response.statusCode}`))
          }

          let data = ''

          response.on('data', (buf) => {
            data += buf.toString('utf8')
          })

          response.on('error', (err) => {
            reject(err)
          })
          response.on('end', () => {
            console.info('response', data)
            try {
              const result = JSON.parse(data)

              if (result.error) {
                reject(new Error(`InkThreadable error: ${result.error}`))
                return
              }

              console.info('ok!')
              resolve()
            } catch (err) {
              reject(new Error('Could not parse InkThreadable response'))
            }
          })
        })
        request.on('error', (err) => {
          reject(err)
        })
        request.write(body)
        request.end()
      })
    }
  }
}

module.exports = createClient(config.inkthreadable.appId, config.inkthreadable.secretKey)
