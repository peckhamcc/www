import test from 'ava'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import faker from 'faker'

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
    name: faker.name.findName(),
    email: faker.internet.email(),
    message: faker.lorem.paragraph()
  }, {}, (error, response) => {
    t.falsy(error)

    t.is(response.statusCode, 201)

    t.end()
  })
})

test.cb('Should fail to send email', t => {
  aws.SES.prototype.sendEmail = sinon.stub().returns({
    promise: sinon.stub().returns(Promise.reject(new Error('nope!')))
  })

  lambda.handler({
    name: faker.name.findName(),
    email: faker.internet.email(),
    message: faker.lorem.paragraph()
  }, {}, (error, response) => {
    t.falsy(error)

    t.is(response.statusCode, 500)

    t.end()
  })
})
