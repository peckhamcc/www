
const ridesDb = {}
const preferencesDb = {}

const getRides = async (date) => {
  return ridesDb[date]
}

const setRides = async (date, rides) => {
  ridesDb[date] = rides
}

const getAllPreferences = async () => {
  return preferencesDb
}

const getPreferences = async (email) => {
  return preferencesDb[email] || {
    preferences: {}
  }
}

const setPreferences = async (email, prefs) => {
  preferencesDb[email] = prefs

  console.info('PreferencesDB')
  console.info(JSON.stringify(preferencesDb, null, 2))
}

module.exports = {
  getRides,
  setRides,
  getAllPreferences,
  getPreferences,
  setPreferences
}
