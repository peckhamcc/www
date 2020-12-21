const path = require('path')
const fs = require('fs')

module.exports = (name) => {
  let db = {}
  const dbPath = path.join(__dirname, name)

  try {
    db = require(dbPath)
  } catch (err) {
    console.info('Could not load json db', dbPath, err.message)
  }

  return {
    save: () => {
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
    },
    get values () {
      return db
    }
  }
}
