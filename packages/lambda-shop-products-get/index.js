const middy = require('middy')
const {
  cors
} = require('middy/middlewares')
const {
  errorHandler
} = require('./middleware')
const {
  getProducts
} = require('./stripe-client')

async function getProductsHandler () {
  return {
    statusCode: 200,
    body: await getProducts()
  }
}

module.exports = {
  handler: middy(getProductsHandler)
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
