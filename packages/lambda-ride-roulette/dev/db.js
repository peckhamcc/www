
const ridesDb = []
const preferencesDb = {}

const getRides = async () => {
  return ridesDb
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
  getPreferences,
  setPreferences
}
