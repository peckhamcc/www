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

  Object.keys(event.body.preferences).forEach(timestamp => {
    if (!ridingDays.includes(timestamp)) {
      delete event.body.preferences[timestamp]
    }

    event.body.preferences[timestamp] = {
      type: event.body.preferences[timestamp].type,
      speed: event.body.preferences[timestamp].speed,
      distance: event.body.preferences[timestamp].distance,
      route: event.body.preferences[timestamp].route
    }
  })

  await setPreferences(event.user.email, event.body)

  return {
    statusCode: 204
  }
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        rider: {
          type: 'string'
        },
        preferences: {
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
