const middy = require('middy')
const {
  jsonBodyParser,
  validator,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const {
  errorHandler,
  tokenValidator
} = require('./middleware')
const {
  // getRides,
  getPreferences
} = require('./db')
const {
  getNextRidingDays
} = require('./lib')

async function getRidesHandler (event) {
  // const assigned = await getRides()
  const {
    preferences
  } = await getPreferences(event.user.email)

  const ridingDays = getNextRidingDays()

  const rides = ridingDays.map(date => {
    if (preferences[date]) {
      return {
        date,
        riding: true,
        ...preferences[date]
      }
    } else {
      return {
        date,
        riding: false
      }
    }
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rides)
  }
}

const inputSchema = {
  type: 'object',
  properties: {}
}

module.exports = {
  handler: middy(getRidesHandler)
    .use(httpHeaderNormalizer())
    .use(tokenValidator())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
