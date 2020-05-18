const Wreck = require('wreck')
const config = require('../config.json')
const querystring = require('querystring')
const users = require('./users')
const fs = require('fs-extra')
const path = require('path')

const cacheDir = './.cache'

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir)
}

function strava ({ athleteId, accessToken, refreshToken }) {
  const request = async (resource, options = {}) => {
    let uri = `https://www.strava.com/api/v3${resource}`

    if (options.query) {
      uri += `?${querystring.stringify(options.query)}`
    }

    const cacheKey = `${athleteId}-${Buffer.from(`${resource}${JSON.stringify(options)}`).toString('base64')}`
    const cachePath = path.join(cacheDir, cacheKey)

    if (fs.existsSync(cachePath)) {
      return fs.readJSON(cachePath)
    }

    try {
      const response = await Wreck[options.method](uri, {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      })

      let output

      if (response.res.headers['content-type'].includes('application/json')) {
        output = JSON.parse(response.payload.toString('utf8'))

        await fs.writeJSON(cachePath, output, {
          spaces: 2
        })
      }

      return output
    } catch (err) {
      if (err.isBoom && err.output.statusCode === 401) {
        const body = JSON.parse(err.data.payload.toString('utf8'))

        if (
          body.errors.find(e => e.field === 'access_token' && e.code === 'invalid') ||
          body.errors.find(e => e.field === '' && e.code === 'invalid')
        ) {
          // access token has expired
          const response = await Wreck.post(`https://www.strava.com/api/v3/oauth/token?${querystring.stringify({
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: 'refresh_token',
            refresh_token: refreshToken
          })}`)

          const output = JSON.parse(response.payload.toString('utf8'))

          await users.update(athleteId, {
            access_token: output.access_token,
            expires_at: output.expires_at,
            expires_in: output.expires_in,
            refresh_token: output.refresh_token
          })

          accessToken = output.access_token
          refreshToken = output.refresh_token

          return request(resource, options)
        }

        console.error(athleteId, body)
      }

      throw err
    }
  }

  return {
    get: (resource, options) => request(resource, {
      ...options,
      method: 'get'
    }),
    post: (resource, options) => request(resource, {
      ...options,
      method: 'post'
    })
  }
}

module.exports = strava
