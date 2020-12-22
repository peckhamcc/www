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
} = require('./account')
const {
  sendEmail
} = require('./email')

async function generateTokenAndSendEmail ({ body: { email, redirect } }) {
  const url = await generateLogInLink(email, redirect)

  await sendEmail(email, config.email.from, 'PCC Log In', htmlTemplate(url), textTemplate(url))

  return {
    statusCode: 204
  }
}

const htmlTemplate = (url) => `
<html>
  <head>
  </head>
  <body>
    <p>Please use the following link to access your PCC account:</p>
    <p><a href="${url}">${url}</a></p>
  </body>
</html>
`

const textTemplate = (url) => `
Please use the following link to access your PCC account:

${url}
`

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          transform: ['trim', 'toLowerCase']
        }
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
