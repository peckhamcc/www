const express = require('express')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const path = require('path')
const sendPaymentLambda = require('@peckhamcc/lambda-send-payment')
const sendContactFormEmail = require('@peckhamcc/lambda-send-contact-form-email')
const sendCorsHeaders = require('@peckhamcc/lambda-send-cors-headers')
const rideRoulettePreferencesGet = require('@peckhamcc/lambda-ride-roulette-preferences-get')
const rideRoulettePreferencesSet = require('@peckhamcc/lambda-ride-roulette-preferences-set')
const rideRouletteRidesGenerate = require('@peckhamcc/lambda-ride-roulette-rides-generate')
const rideRouletteRidesGet = require('@peckhamcc/lambda-ride-roulette-rides-get')
const rideRouletteTokenGenerate = require('@peckhamcc/lambda-ride-roulette-token-generate')

// simulate a lambda
const serveLambda = (lambda) => {
  return async (request, response) => {
    console.info('request', request)

    let body = ''

    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') {
      for await (const buf of request.body) {
        body += buf.toString('utf8')
      }
    }

    const event = {
      headers: request.headers,
      body
    }

    console.info('event', event)

    lambda.handler(event, {}, (error, result) => {
      if (error) {
        console.error(error)

        return response.status(500).send(error)
      }

      if (!result) {
        return response.status(204).send()
      }

      response
        .status(result.statusCode)
        .set(result.headers)
        .send(result.body)
    })
  }
}

module.exports = (port) => {
  return new Promise((resolve) => {
    const app = express()

    // main site
    app.use('/', serveStatic(path.resolve(path.join(__dirname, 'node_modules', '@peckhamcc', 'website', 'dist'))))

    // "lambdas"
    app.use(bodyParser.text({ type: '*/*' }))

    app.options('/lambda/send-payment', serveLambda(sendCorsHeaders))
    app.post('/lambda/send-payment', serveLambda(sendPaymentLambda))

    app.options('/lambda/send-contact-form-email', serveLambda(sendCorsHeaders))
    app.post('/lambda/send-contact-form-email', serveLambda(sendContactFormEmail))

    app.options('/lambda/ride-roulette-preferences-get', serveLambda(sendCorsHeaders))
    app.get('/lambda/ride-roulette-preferences-get', serveLambda(rideRoulettePreferencesGet))

    app.options('/lambda/ride-roulette-preferences-set', serveLambda(sendCorsHeaders))
    app.put('/lambda/ride-roulette-preferences-set', serveLambda(rideRoulettePreferencesSet))

    app.options('/lambda/ride-roulette-rides-generate', serveLambda(sendCorsHeaders))
    app.post('/lambda/ride-roulette-rides-generate', serveLambda(rideRouletteRidesGenerate))

    app.options('/lambda/ride-roulette-rides-get', serveLambda(sendCorsHeaders))
    app.get('/lambda/ride-roulette-rides-get', serveLambda(rideRouletteRidesGet))

    app.options('/lambda/ride-roulette-token-generate', serveLambda(sendCorsHeaders))
    app.post('/lambda/ride-roulette-token-generate', serveLambda(rideRouletteTokenGenerate))

    app.use((_, response) => {
      response.sendFile(path.join(__dirname, 'node_modules', '@peckhamcc', 'website', 'dist', 'index.html'))
    })

    const listener = app.listen(port, () => {
      resolve({
        url: `http://localhost:${listener.address().port}`,
        stop: () => {
          return new Promise((resolve) => {
            listener.close(() => resolve())
          })
        }
      })
    })
  })
}
