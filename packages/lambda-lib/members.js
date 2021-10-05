const {
  getMany
} = require('./db')

async function getMembers () {
  const members = []

  for await (const member of getMany(process.env.AWS_USERS_DB_TABLE)) {
    members.push(member)
  }

  return members
}

module.exports = {
  getMembers
}
