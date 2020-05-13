const Wreck = require('wreck')
const config = require('../config.json')

async function * load () {
  const response = await Wreck.get('https://api.peckham.cc/strava/users', {
    headers: {
      authorization: config.token
    }
  })

  yield * JSON.parse(response.payload.toString('utf8'))
}

async function update(id, data) {
  await Wreck.patch(`https://api.peckham.cc/strava/users/${id}`, {
    headers: {
      authorization: config.token
    },
    payload: data
  })
}

module.exports = {
  load,
  update
}
