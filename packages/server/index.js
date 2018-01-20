const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const PORT = process.env.PORT || 9000

const app = express()
app.use('/', serveStatic(path.resolve(path.join(__dirname, 'node_modules', '@peckhamcc', 'website', 'dist'))))
app.use((request, response) => {
  response.sendfile(path.join(__dirname, 'node_modules', '@peckhamcc', 'website', 'dist', 'index.html'))
})
app.listen(PORT, () => {
  console.info(`App listening on ${PORT}`)
})
