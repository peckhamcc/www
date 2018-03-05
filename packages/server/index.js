require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const path = require('path')
const createClientTokenLambda = require('@peckhamcc/lambda-create-client-token')
const sendPaymentLambda = require('@peckhamcc/lambda-send-payment')

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

const PORT = process.env.PORT || 9000

const app = express()
app.use(bodyParser.json())

// main site
app.use('/', serveStatic(path.resolve(path.join(__dirname, 'node_modules', '@peckhamcc', 'website', 'dist'))))

// "lambdas"
app.post('/lambda/create-client-token', serveLambda(createClientTokenLambda))
app.post('/lambda/send-payment', serveLambda(sendPaymentLambda))

app.use((request, response) => {
  response.sendFile(path.join(__dirname, 'node_modules', '@peckhamcc', 'website', 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.info(`App listening on ${PORT}`)
})
