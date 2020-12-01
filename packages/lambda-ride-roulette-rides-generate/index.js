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
  getNextRidingDays,
  generateRides
} = require('./lib')
const {
  getAllPreferences,
  setRides
} = require('./db')

async function generateRidesHandler (event) {
  const ridingDays = getNextRidingDays()
  const riderPrefs = getAllPreferences()

  const rides = generateRides(ridingDays, riderPrefs)

  for (let i = 0; i < ridingDays.length; i++) {
    const date = ridingDays[i]

    if (rides[date]) {
      await setRides(date, rides[date])
    }
  }

  return {
    statusCode: 204
  }
}

const inputSchema = {
  type: 'object',
  properties: {}
}

module.exports = {
  handler: middy(generateRidesHandler)
    .use(httpHeaderNormalizer())
    .use(tokenValidator())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
