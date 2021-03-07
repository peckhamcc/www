const jsonDb = require('./json-db')

const users = jsonDb('users.json')

async function getMembers () {
  return Object.keys(users.values)
    .map(id => ({
      id,
      ...users.values[id]
    }))
}

module.exports = {
  getMembers
}
