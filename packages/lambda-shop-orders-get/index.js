const middy = require('middy')
const {
  cors
} = require('middy/middlewares')
const {
  errorHandler,
  tokenValidator
} = require('./middleware')

async function ordersGetHandler () {
  return {
    statusCode: 200,
    body: []
  }
}

module.exports = {
  handler: middy(ordersGetHandler)
    .use(errorHandler())
    .use(tokenValidator())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
