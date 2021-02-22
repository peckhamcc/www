const test = require('ava')
const lambda = require('./')

test.cb('Should send headers', t => {
  lambda.handler({

  }, {}, (error, response) => {
    t.falsy(error)

    t.is(response.statusCode, 200)

    t.end()
  })
})
