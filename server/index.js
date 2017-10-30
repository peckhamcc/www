const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const debug = require('debug')('pcc-www:server')
const PORT = 9000

const app = express()
app.use('/', serveStatic(path.resolve(path.join(__dirname, '..', 'dist'))))
app.listen(PORT, () => {
  debug(`App listening on ${PORT}`)
})
