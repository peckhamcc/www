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
  setPreferences
} = require('./db')

function nextDate (dayIndex) {
  var day = new Date()
  day.setDate(day.getDate() + (dayIndex - 1 - day.getDay() + 7) % 7 + 1)

  return `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
}

async function setPreferencesHandler (event) {
  // DynamoDB schema - pcc-ride-roulette-preferences

  // email: S
  // expires: N - epoch timestamp
  // preferences: {
  //  '2020-02-10': {
  //    'distance': 'short'
  //    'speed': 'social'
  //    'type': 'road',
  //    'route': 'no-route'
  //  }
  // }

  const ridingDays = [
    nextDate(6),
    nextDate(7)
  ]

  const prefs = event.body
    .filter(event => ridingDays.includes(event.date) && event.riding)
    .reduce((acc, event) => {
      acc[event.date] = {
        speed: event.speed,
        distance: event.distance,
        type: event.type,
        route: event.route
      }

      return acc
    }, {})

  await setPreferences(event.user.email, {
    name: event.user.name,
    preferences: prefs
  })

  return {
    statusCode: 204
  }
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: {
            type: 'string'
          },
          riding: {
            type: 'boolean'
          },
          type: {
            type: 'string',
            enum: [
              'road',
              'mud',
              'mtb'
            ]
          },
          speed: {
            type: 'string',
            enum: [
              'social',
              'social-plus',
              'antisocial',
              'pain-train'
            ]
          },
          distance: {
            type: 'string',
            enum: [
              'short',
              'medium',
              'long',
              'epic'
            ]
          },
          route: {
            type: 'string',
            enum: [
              'no-route',
              'has-route'
            ]
          }
        }
      }
    }
  }
}

module.exports = {
  handler: middy(setPreferencesHandler)
    .use(httpHeaderNormalizer())
    .use(tokenValidator())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
