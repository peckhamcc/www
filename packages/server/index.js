const express = require('express')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const path = require('path')
const createClientTokenLambda = require('@peckhamcc/lambda-create-client-token')
const sendPaymentLambda = require('@peckhamcc/lambda-send-payment')
const sendContactFormEmail = require('@peckhamcc/lambda-send-contact-form-email')
const sendCorsHeaders = require('@peckhamcc/lambda-send-cors-headers')

// simulate a lambda
const serveLambda = (lambda) => {
  return (request, response) => lambda.handler(request.body, {}, (error, result) => {
    if (error) {
      console.error(error)

      return response.status(500).send(error)
    }

    response
      .status(result.statusCode)
      .set(result.headers)
      .send(result.body)
  })
}

module.exports = (port) => {
  return new Promise((resolve, reject) => {
    const app = express()
    app.use(bodyParser.json())

    // main site
    app.use('/', serveStatic(path.resolve(path.join(__dirname, 'node_modules', '@peckhamcc', 'website', 'dist'))))

    // "lambdas"
    app.options('/lambda/create-client-token', serveLambda(sendCorsHeaders))
    app.post('/lambda/create-client-token', serveLambda(createClientTokenLambda))

    app.options('/lambda/send-payment', serveLambda(sendCorsHeaders))
    app.post('/lambda/send-payment', serveLambda(sendPaymentLambda))

    app.options('/lambda/send-contact-form-email', serveLambda(sendCorsHeaders))
    app.post('/lambda/send-contact-form-email', serveLambda(sendContactFormEmail))

    app.use((request, response) => {
      response.sendFile(path.join(__dirname, 'node_modules', '@peckhamcc', 'website', 'dist', 'index.html'))
    })

    const listener = app.listen(port, () => {
      resolve({
        url: `http://localhost:${listener.address().port}`,
        stop: () => {
          return new Promise((resolve, reject) => {
            listener.close(() => resolve())
          })
        }
      })
    })
  })
}
