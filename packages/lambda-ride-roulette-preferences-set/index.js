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
  setPreferences,
  getNextRidingDays
} = require('./roulette')

async function setPreferencesHandler ({ userId, body: preferences }) {
  const ridingDays = getNextRidingDays()

  Object.keys(preferences).forEach(timestamp => {
    if (!ridingDays.includes(timestamp)) {
      delete preferences[timestamp]
      return
    }

    preferences[timestamp] = {
      type: preferences[timestamp].type,
      speed: preferences[timestamp].speed,
      distance: preferences[timestamp].distance,
      route: preferences[timestamp].route
    }
  })

  await setPreferences(userId, preferences)

  return {
    statusCode: 204
  }
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      patternProperties: {
        '^\\d{4}-\\d{2}-\\d{2}$': {
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
