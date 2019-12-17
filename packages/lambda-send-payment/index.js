const middy = require('middy')
const { HttpError } = require('http-errors')
const {
  jsonBodyParser,
  validator,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const {
  config
} = require('./config')
const {
  capitalise
} = require('./utils')
const sendEmail = require('./send-email')

const toCurrencyString = (amount) => {
  const asString = amount.toString()

  return `${asString.substring(0, asString.length - 2)}.${asString.substring(asString.length - 2)}`
}

const sendPayment = function (event) {
  const {
    items,
    firstName,
    lastName,
    email,
    address1,
    address2,
    address3,
    postCode
  } = event

  let amount = 0

  // What did they order
  const lineItems = items.map(item => {
    const lineItem = config.store.products.find(lineItem => lineItem.sku === item.sku)

    // Work out total cost of items
    amount += (lineItem.price * item.quantity)

    return {
      kind: 'debit',
      name: item.sku,
      quantity: item.quantity,
      totalAmount: toCurrencyString(lineItem.price * item.quantity),
      unitAmount: toCurrencyString(lineItem.price),
      // 127 char limit
      description: [item.gender && `Gender: ${item.gender.name}`, item.size && `Size: ${item.size.name}`]
        .concat(item.variants
          ? Object.keys(item.variants)
            .map(variant =>
              `${capitalise(variant)}: ${item.variants[variant].name}`) : [])
        .filter(Boolean)
        .join(', ')
        .trim()
    }
  })

  return sendEmail(email, firstName, lastName, address1, address2, address3, postCode, lineItems, toCurrencyString(amount))
    .then(() => {
      return {
        isBase64Encoded: false,
        statusCode: 204,
        headers: {},
        body: ''
      }
    })
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              sku: { type: 'string', pattern: '.+' },
              title: { type: 'string', pattern: '.+' },
              quantity: { type: 'number', exclusiveMinimum: 0 },
              size: {
                type: 'object',
                properties: {
                  code: { type: 'string', pattern: '.+' },
                  name: { type: 'string', pattern: '.+' }
                }
              },
              gender: {
                type: 'object',
                properties: {
                  code: { type: 'string', pattern: '.+' },
                  name: { type: 'string', pattern: '.+' }
                }
              },
              variants: {
                type: 'object'
              },
              id: { type: 'string', pattern: '.+' }
            },
            required: ['sku', 'title', 'quantity']
          }
        },
        firstName: { type: 'string', pattern: '.+' },
        lastName: { type: 'string', pattern: '.+' },
        email: { type: 'string', pattern: '.+' },
        address1: { type: 'string', pattern: '.+' },
        address2: { type: 'string', pattern: '.*' },
        address3: { type: 'string', pattern: '.*' },
        postCode: { type: 'string', pattern: '.+' },
        shopCode: { type: 'string', const: process.env.PCC_SHOP_CODE }
      },
      required: ['items', 'firstName', 'lastName', 'email', 'address1', 'postCode', 'shopCode']
    }
  }
}

const errorHandler = () => ({
  onError: (handler, next) => {
    if (handler.error instanceof HttpError) {
      if (handler.error.message.includes('failed validation')) {
        const details = handler.error.details[0]

        handler.response = {
          statusCode: 422,
          body: JSON.stringify({
            field: details.dataPath.replace('.body.', '')
          })
        }

        next()
      } else {
        next(handler.error)
      }
    } else {
      next(handler.error)
    }
  }
})

module.exports = {
  handler: middy(sendPayment)
    .use(httpHeaderNormalizer())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
