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
  getRides,
  getPreferences
} = require('./db')
const {
  getNextRidingDays
} = require('./lib')

async function getRidesHandler (event) {
  const {
    preferences
  } = await getPreferences(event.user.email)

  const ridingDays = getNextRidingDays()
  const rides = {}

  for (let i = 0; i < ridingDays.length; i++) {
    const date = ridingDays[i]

    rides[date] = await getRides(date)
  }

  const output = ridingDays.map(date => {
    if (rides[date]) {
      const ride = rides[date].find(ride => {
        return ride.riders.find(rider => rider.email === event.user.email)
      })

      if (ride) {
        return {
          date,
          ride: true,
          ...ride,
          riders: ride.riders
            .filter(rider => rider.email !== event.user.email)
            .map(rider => ({
              name: rider.name,
              hasRoute: rider.hasRoute
            }))
        }
      }

      return {
        date,
        ride: true,
        riding: false
      }
    }

    if (preferences[date]) {
      return {
        date,
        riding: true,
        ...preferences[date]
      }
    }

    return {
      date,
      riding: false
    }
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(output)
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
