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
const {
  getNextRidingDays
} = require('./lib')

async function setPreferencesHandler (event) {
  const ridingDays = getNextRidingDays()

  const prefs = event.body
    .filter(event => ridingDays.includes(event.date))
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
    rider: event.user.name,
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
