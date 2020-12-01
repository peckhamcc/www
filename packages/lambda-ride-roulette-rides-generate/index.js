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
  getNextRidingDays
} = require('./lib')
const {
  getAllPreferences
} = require('./db')

async function generateRides (event) {
  // DynamoDB schema

  // id: S
  // expires: N - epoch timestamp
  // ??

  const ridingDays = getNextRidingDays()

  // { 'foo@bar.com': { rider: 'Dave', preferences: { 'yyyy-mm-dd': { speed: 'social', type: 'road' ... }}}}
  const riderPrefs = getAllPreferences()

  console.info('ridingDays', ridingDays)
  console.info('riderPrefs', riderPrefs)

  const rides = {}

  Object.keys(riderPrefs).forEach(email => {
    const result = riderPrefs[email]

    Object.keys(result.preferences)
      .filter(date => ridingDays.includes(date))
      .forEach(date => {
        const prefs = result.preferences[date]

        if (!rides[date]) {
          rides[date] = {}
        }

        if (!rides[date][prefs.type]) {
          rides[date][prefs.type] = []
        }

        rides[date][prefs.type].push({
          name: result.rider,
          speed: prefs.speed,
          distance: prefs.distance,
          route: prefs.route
        })
      })
  })

  // rides = { road: [{ name: 'dave', speed: 'social': distance: 'social'}]}

  console.info(rides)
}

const inputSchema = {
  type: 'object',
  properties: {}
}

module.exports = {
  handler: middy(generateRides)
    .use(httpHeaderNormalizer())
    .use(tokenValidator())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
