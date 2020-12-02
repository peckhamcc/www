const {
  getNextRidingDays,
  generateRides
} = require('./lib')
const {
  getAllPreferences,
  setRides
} = require('./db')

async function generateRidesHandler () {
  const ridingDays = getNextRidingDays()
  const riderPrefs = await getAllPreferences()

  const rides = generateRides(ridingDays, riderPrefs)

  for (let i = 0; i < ridingDays.length; i++) {
    const date = ridingDays[i]

    if (rides[date]) {
      await setRides(date, rides[date])
    }
  }

  return rides
}

module.exports = {
  handler: generateRidesHandler
}
