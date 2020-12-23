const AWS = require('aws-sdk')

/*
const { config } = require('./config')

AWS.config.update({
  region: config.aws.dynamodb.region
})
*/

const ONE_DAY = ((60 * 60) * 24) * 1000
const ONE_MONTH = ONE_DAY * 30

function nextDate (now, dayIndex) {
  var day = new Date(now.getTime())
  day.setDate(day.getDate() + (dayIndex - 1 - day.getDay() + 7) % 7 + 1)

  return `${day.getFullYear()}-${(day.getMonth() + 1).toString().padStart(2, '0')}-${day.getDate().toString().padStart(2, '0')}`
}

function getNextRidingDays () {
  let now = new Date()

  if (now.getDay() === 0 || now.getDay() === 6) {
    // it's a weekend already, move the date back a little so to
    // always return this weekend
    now = new Date(now.getTime() - (3 * ONE_DAY))
  }

  const ridingDays = [
    nextDate(now, 6),
    nextDate(now, 7)
  ]

  return ridingDays
}

const typeLookup = [
  'road',
  'mud',
  'mtb'
]

const distanceLookup = [
  'short',
  'medium',
  'long',
  'epic'
]

const speedLookup = [
  'social',
  'social-plus',
  'antisocial',
  'pain-train'
]

const MAX_GROUP_SIZE = 6
const MIN_GROUP_SIZE = 3

function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

async function generateRides (ridingDays, riderPrefs, getUser) {
  console.info('passed riding days', JSON.stringify(ridingDays, null, 2))
  console.info('passed rider prefs', JSON.stringify(riderPrefs, null, 2))

  const preferences = {}

  for (const userId of Object.keys(riderPrefs)) {
    for (const date of Object.keys(riderPrefs[userId])) {
      if (!ridingDays.includes(date)) {
        continue
      }

      const prefs = riderPrefs[userId][date]

      preferences[date] = preferences[date] || {}
      preferences[date][prefs.type] = preferences[date][prefs.type] || {}
      preferences[date][prefs.type][prefs.distance] = preferences[date][prefs.type][prefs.distance] || {}
      preferences[date][prefs.type][prefs.distance][prefs.speed] = preferences[date][prefs.type][prefs.distance][prefs.speed] || []

      const user = await getUser(userId)

      preferences[date][prefs.type][prefs.distance][prefs.speed].push({
        id: userId,
        name: user.name,
        email: user.email,
        route: prefs.route
      })
    }
  }

  console.info('preferences', JSON.stringify(preferences, null, 2))

  const rides = {}

  ridingDays.forEach(date => {
    rides[date] = rides[date] || []

    if (!preferences[date]) {
      return
    }

    let groupName = 'Z'.charCodeAt(0)

    typeLookup.forEach(type => {
      if (!preferences[date][type]) {
        return
      }

      distanceLookup.forEach(distance => {
        if (!preferences[date][type][distance]) {
          return
        }

        speedLookup.slice().reverse().forEach(speed => {
          if (!preferences[date][type][distance][speed]) {
            return
          }

          const riders = preferences[date][type][distance][speed]

          if (riders.length < MIN_GROUP_SIZE) {
            // not enough rider at this speed, bump them down to the next slowest speed
            const speedIndex = speedLookup.indexOf(speed)

            if (speedIndex) {
              // find next slowest speed with riders
              for (let i = speedIndex - 1; i >= 0; i--) {
                const nextSlower = speedLookup[i]

                if (preferences[date][type][distance][nextSlower]) {
                  preferences[date][type][distance][nextSlower].push(...riders)

                  return
                }
              }
            }
          }

          // make even groups, with at least one person with a route in each group
          const numGroups = Math.ceil(riders.length / MAX_GROUP_SIZE)
          const ridersWithRoutes = shuffle(riders.filter(rider => rider.route === 'has-route'))
          const ridersWithoutRoutes = shuffle(riders.filter(rider => rider.route === 'no-route'))
          const groups = new Array(numGroups).fill(null).map(() => ([]))

          let index = 0

          while (ridersWithRoutes.length) {
            const rider = ridersWithRoutes.pop()

            if (index === groups.length) {
              index = 0
            }

            groups[index].push(rider)
            index++
          }

          while (ridersWithoutRoutes.length) {
            const rider = ridersWithoutRoutes.pop()

            if (index === groups.length) {
              index = 0
            }

            groups[index].push(rider)
            index++
          }

          groups.forEach(riders => {
            rides[date].push({
              name: groupName,
              type,
              distance,
              speed,
              riders: riders.map(rider => ({
                id: rider.id,
                name: rider.name,
                email: rider.email,
                hasRoute: rider.route === 'has-route'
              }))
            })

            groupName--
          })
        })
      })
    })
  })

  // assign letters so social rides start with 'A'
  Object.keys(rides).forEach(date => {
    Object.keys(rides[date]).forEach(type => {
      let index = 0

      rides[date].reverse().forEach((ride) => {
        ride.name = String.fromCharCode('A'.charCodeAt(0) + index)
        index++
      })
    })
  })

  console.info('rides', JSON.stringify(rides, null, 2))

  return rides
}

const getRides = async (date) => {
  const client = new AWS.DynamoDB.DocumentClient()

  const result = await client.get({
    TableName: process.env.AWS_RIDES_DB_TABLE,
    Key: {
      date
    }
  }).promise()

  return result.Item && result.Item.rides
}

const setRides = async (date, rides) => {
  const client = new AWS.DynamoDB.DocumentClient()

  await client.update({
    TableName: process.env.AWS_RIDES_DB_TABLE,
    Key: {
      date
    },
    UpdateExpression: 'set rides = :r, expiry = :e',
    ExpressionAttributeValues: {
      ':r': rides,
      ':e': Math.round(new Date(Date.now() + ONE_MONTH).getTime() / 1000)
    },
    ReturnValues: 'UPDATED_NEW'
  }).promise()
}

const getAllPreferences = async () => {
  const client = new AWS.DynamoDB.DocumentClient()

  const scanResults = {}
  const params = { TableName: process.env.AWS_PREFERENCES_DB_TABLE }
  let items = {
    LastEvaluatedKey: true
  }

  do {
    items = await client.scan(params).promise()
    items.Items.forEach((item) => {
      scanResults[item.email] = {
        rider: item.rider,
        preferences: item.preferences
      }
    })
    params.ExclusiveStartKey = items.LastEvaluatedKey
  } while (items.LastEvaluatedKey)

  return scanResults
}

const getPreferences = async (userId) => {
  const client = new AWS.DynamoDB.DocumentClient()

  const result = await client.get({
    TableName: process.env.AWS_PREFERENCES_DB_TABLE,
    Key: {
      id: userId
    }
  }).promise()

  return (result.Item && result.Item.preferences) || {}
}

const setPreferences = async (userId, { preferences }) => {
  const client = new AWS.DynamoDB.DocumentClient()

  await client.update({
    TableName: process.env.AWS_PREFERENCES_DB_TABLE,
    Key: {
      id: userId
    },
    UpdateExpression: 'set preferences = :p, expires = :e',
    ExpressionAttributeValues: {
      ':p': preferences,
      ':e': Math.round(new Date(Date.now() + ONE_MONTH).getTime() / 1000)
    },
    ReturnValues: 'UPDATED_NEW'
  }).promise()
}

module.exports = {
  getRides,
  setRides,
  getAllPreferences,
  getPreferences,
  setPreferences,
  getNextRidingDays,
  generateRides
}
