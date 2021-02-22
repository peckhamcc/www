const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const faker = require('faker')

let aws
let lambda

test.beforeEach(() => {
  aws = {
    SES: sinon.stub()
  }

  lambda = proxyquire('./', {
    'aws-sdk': aws
  })
})

test.cb('Should send email', t => {
  aws.SES.prototype.sendEmail = sinon.stub().returns({
    promise: sinon.stub().returns(Promise.resolve({}))
  })

  lambda.handler({
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: faker.name.findName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph()
    })
  }, {}, (error, response) => {
    t.falsy(error)

    t.is(response.statusCode, 201)

    t.end()
  })
})

test.cb('Should require email', t => {
  aws.SES.prototype.sendEmail = sinon.stub().returns({
    promise: sinon.stub().returns(Promise.resolve({}))
  })

  lambda.handler({
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: faker.name.findName(),
      message: faker.lorem.paragraph()
    })
  }, {}, (error, response) => {
    t.falsy(error)

    t.is(response.statusCode, 400)

    t.end()
  })
})

test.cb('Should require name', t => {
  aws.SES.prototype.sendEmail = sinon.stub().returns({
    promise: sinon.stub().returns(Promise.resolve({}))
  })

  lambda.handler({
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: faker.internet.email(),
      message: faker.lorem.paragraph()
    })
  }, {}, (error, response) => {
    t.falsy(error)

    t.is(response.statusCode, 400)

    t.end()
  })
})

test.cb('Should require message', t => {
  aws.SES.prototype.sendEmail = sinon.stub().returns({
    promise: sinon.stub().returns(Promise.resolve({}))
  })

  lambda.handler({
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: faker.name.findName(),
      email: faker.internet.email()
    })
  }, {}, (error, response) => {
    t.falsy(error)

    t.is(response.statusCode, 400)

    t.end()
  })
})

test.cb('Should survive malformed body', t => {
  aws.SES.prototype.sendEmail = sinon.stub().returns({
    promise: sinon.stub().returns(Promise.resolve({}))
  })

  lambda.handler({
    headers: {
      'Content-Type': 'application/json'
    },
    body: 'nope!'
  }, {}, (error, response) => {
    t.falsy(error)

    t.is(response.statusCode, 422)

    t.end()
  })
})

test.cb('Should survive missing body', t => {
  aws.SES.prototype.sendEmail = sinon.stub().returns({
    promise: sinon.stub().returns(Promise.resolve({}))
  })

  lambda.handler({
    headers: {
      'Content-Type': 'application/json'
    }
  }, {}, (error, response) => {
    t.falsy(error)

    t.is(response.statusCode, 422)

    t.end()
  })
})

test.cb('Should fail to send email', t => {
  aws.SES.prototype.sendEmail = sinon.stub().returns({
    promise: sinon.stub().returns(Promise.reject(new Error('nope!')))
  })

  lambda.handler({
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: faker.name.findName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph()
    })
  }, {}, (error, response) => {
    t.falsy(error)

    t.is(response.statusCode, 500)

    t.end()
  })
})
