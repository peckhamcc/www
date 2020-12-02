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
  generateLogInLink
} = require('./token')
const {
  sendEmail
} = require('./email')

async function generateTokenAndSendEmail ({ body: { email } }) {
  email = email.toLowerCase()

  const url = await generateLogInLink(email)

  await sendEmail(email, config.email.from, 'PCC Ride Roulette Log In', htmlTemplate(url), textTemplate(url))

  return {
    statusCode: 204
  }
}

const htmlTemplate = (url) => `
<html>
  <head>
  </head>
  <body>
    <p>You are one step away from PCC Ride Roulette.</p>
    <p>Use the following link to log in:</p>
    <p><a href="${url}">${url}</a></p>
  </body>
</html>
`

const textTemplate = (url) => `
You are one step away from PCC Ride Roulette.

Use the following link to log in:

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
