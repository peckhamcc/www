require('dotenv').config()

const start = require('./')
const PORT = process.env.PORT || 9000

start(PORT)
  .then(() => {
    console.info(`App listening on ${PORT}`)
  })
