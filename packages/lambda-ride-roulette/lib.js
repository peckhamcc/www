
const ONE_DAY = ((60 * 60) * 24) * 1000

function nextDate (now, dayIndex) {
  var day = new Date(now.getTime())
  day.setDate(day.getDate() + (dayIndex - 1 - day.getDay() + 7) % 7 + 1)

  return `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
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

function generateRides (ridingDays, riderPrefs) {
  const preferences = {}

  Object.keys(riderPrefs).forEach(email => {
    const result = riderPrefs[email]

    Object.keys(result.preferences)
      .filter(date => ridingDays.includes(date))
      .forEach(date => {
        const prefs = result.preferences[date]

        preferences[date] = preferences[date] || {}
        preferences[date][prefs.type] = preferences[date][prefs.type] || {}
        preferences[date][prefs.type][prefs.distance] = preferences[date][prefs.type][prefs.distance] || {}
        preferences[date][prefs.type][prefs.distance][prefs.speed] = preferences[date][prefs.type][prefs.distance][prefs.speed] || []

        preferences[date][prefs.type][prefs.distance][prefs.speed].push({
          name: result.rider,
          email,
          route: prefs.route
        })
      })
  })

  const rides = {}

  ridingDays.forEach(date => {
    if (!preferences[date]) {
      return
    }

    let groupName = 'Z'.charCodeAt(0)
    rides[date] = rides[date] || []

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

          // fewer than MAX_GROUP_SIZE riders for the distance, just make one group
          if (riders.length < MAX_GROUP_SIZE) {
            rides[date].push({
              name: groupName,
              type,
              distance,
              speed,
              riders: riders.map(rider => ({
                name: rider.name,
                email: rider.email,
                hasRoute: rider.route === 'has-route'
              }))
            })

            groupName--

            return
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

  // console.info('rides', JSON.stringify(rides, null, 2))

  Object.keys(rides).forEach(date => {
    Object.keys(rides[date]).forEach(type => {
      let index = 0

      rides[date].reverse().forEach((ride) => {
        ride.name = String.fromCharCode('A'.charCodeAt(0) + index)
        index++
      })
    })
  })

  // rides = { road: { social: [{ name: 'dave', speed: 'social'}]}}

  console.info('rides', JSON.stringify(rides, null, 2))
}

const sat = '2020-01-01'
const sun = '2020-01-02'

const prefs = {
  'rider-1@gmail.com': {
    rider: 'rider-1',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'has-route'
      }
    }
  },
  'rider-2@gmail.com': {
    rider: 'rider-2',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'has-route'
      }
    }
  },
  'rider-3@gmail.com': {
    rider: 'rider-3',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'no-route'
      }
    }
  },
  'rider-4@gmail.com': {
    rider: 'rider-4',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'no-route'
      }
    }
  },
  'rider-5@gmail.com': {
    rider: 'rider-5',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'no-route'
      }
    }
  },
  'rider-6@gmail.com': {
    rider: 'rider-6',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'no-route'
      }
    }
  },
  'rider-7@gmail.com': {
    rider: 'rider-7',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social',
        distance: 'short',
        route: 'has-route'
      }
    }
  },
  'rider-8@gmail.com': {
    rider: 'rider-8',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'social-plus',
        distance: 'short',
        route: 'no-route'
      }
    }
  },
  'rider-9@gmail.com': {
    rider: 'rider-9',
    preferences: {
      [sat]: {
        type: 'road',
        speed: 'pain-train',
        distance: 'short',
        route: 'no-route'
      },
      [sun]: {
        type: 'road',
        speed: 'antisocial',
        distance: 'short',
        route: 'no-route'
      }
    }
  }
}

generateRides([sat, sun], prefs)

module.exports = {
  getNextRidingDays,
  generateRides
}
