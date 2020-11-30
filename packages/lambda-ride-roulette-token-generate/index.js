const middy = require('middy')
const { HttpError } = require('http-errors')
const {
  jsonBodyParser,
  validator,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const { config } = require('./config')
const {
  generateToken
} = require(process.env.NODE_ENV === 'development' ? './test/token' : './token')
const {
  sendEmail
} = require(process.env.NODE_ENV === 'development' ? './test/email' : './email')

async function generateTokenAndSendEmail (event, context) {
  console.info('event', JSON.stringify(event, null, 2))
  console.info('context', JSON.stringify(context, null, 2))

  const {
    email
  } = event.body ? event.body : event

  const token = await generateToken(email)
  const url = `${process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : 'https://peckham.cc'}/ride-roulette?token=${token}`

  await sendEmail(email, config.email.from, 'PCC Ride Roulette Log In', htmlTemplate(url), textTemplate(url))
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
    <div>
      <p>Use the following link to log in to PCC Ride Roulette:</p>
      <p><a href="${url}">${url}</a></p>
    </article>
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

const errorHandler = () => ({
  onError: (handler, next) => {
    if (handler.error instanceof HttpError) {
      if (handler.error.message.includes('failed validation')) {
        const details = handler.error.details[0]

        handler.response = {
          statusCode: 422,
          body: JSON.stringify({
            field: details.dataPath.replace('.body.', '')
          })
        }

        next()
      } else {
        next(handler.error)
      }
    } else {
      next(handler.error)
    }
  }
})

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
