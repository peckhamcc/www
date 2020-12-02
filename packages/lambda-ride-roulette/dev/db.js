
// const ridesDb = {}
const preferencesDb = {}

const ridesDb = {
  '2020-12-5': [
    {
      name: 'A',
      type: 'road',
      distance: 'long',
      speed: 'social-plus',
      riders: [
        {
          name: 'Alex',
          email: 'alex@achingbrain.net',
          hasRoute: false
        }
      ]
    }
  ]
}

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
