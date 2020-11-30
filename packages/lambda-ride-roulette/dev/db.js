
const ridesDb = []
const preferencesDb = {}

const getRides = async () => {
  return ridesDb
}

const getPreferences = async (email) => {
  console.info('getting prefs', email, preferencesDb)
  return preferencesDb[email] || {}
}

const setPreferences = async (email, prefs) => {
  console.info('setting prefs', email, prefs)
  preferencesDb[email] = prefs
}

module.exports = {
  getRides,
  getPreferences,
  setPreferences
}
