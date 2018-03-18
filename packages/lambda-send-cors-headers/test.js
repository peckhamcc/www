import test from 'ava'
import lambda from './'

test.cb('Should send headers', t => {
  lambda.handler({

  }, {}, (error, response) => {
    t.falsy(error)

    t.is(response.statusCode, 200)

    t.end()
  })
})
