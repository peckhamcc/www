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

function nextDate (dayIndex) {
  var day = new Date()
  day.setDate(day.getDate() + (dayIndex - 1 - day.getDay() + 7) % 7 + 1)

  return `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
}

async function getRidesHandler (event) {
  // const assigned = await getRides()
  const prefs = await getPreferences(event.user.email)

  const ridingDays = [
    nextDate(6),
    nextDate(7)
  ]

  const rides = ridingDays.map(date => {
    if (prefs[date]) {
      return {
        date,
        riding: true,
        ...prefs[date]
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
