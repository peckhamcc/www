const middy = require('middy')
const {
  jsonBodyParser,
  validator,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const {
  errorHandler
} = require('./middleware')
const { config } = require('./config')
const {
  generateToken
} = require('./token')
const {
  sendEmail
} = require('./email')

async function generateTokenAndSendEmail ({ body: { email } }) {
  email = email.toLowerCase()

  const token = await generateToken(email)
  const url = `${process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : 'https://peckham.cc'}/ride-roulette?token=${token}`

  await sendEmail(email, config.email.from, 'PCC Ride Roulette Log In', htmlTemplate(url), textTemplate(url))

  return {
    statusCode: 204
  }
}

const htmlTemplate = (url) => `
<html>
  <head>
    <style type="text/css">

div {
  max-width: 800px;
  padding: 20px;
}

    </style>
  </head>
  <body>
    <p>Use the following link to log in to PCC Ride Roulette:</p>
    <p><a href="${url}">${url}</a></p>
  </body>
</html>
`

const textTemplate = (url) => `
Use the following link to log in to PCC Ride Roulette:

${url}
`

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' }
      },
      required: ['email']
    }
  }
}

module.exports = {
  handler: middy(generateTokenAndSendEmail)
    .use(httpHeaderNormalizer())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(errorHandler())
    .use(cors({
      origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
    }))
}
