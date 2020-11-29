const middy = require('middy')
const { HttpError } = require('http-errors')
const {
  jsonBodyParser,
  validator,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const AWS = require('aws-sdk')
const { config } = require('./config')
const {
  generateToken
} = require('./token')

async function generateTokenAndSendEmail (event) {
  const {
    email
  } = event
  const token = await generateToken(email)
  const url = `https://peckham.cc/ride-roulette?token=${token}`

  const ses = new AWS.SES({
    apiVersion: config.aws.ses.version,
    region: config.aws.ses.region
  })

  await ses
    .sendEmail({
      Destination: {
        CcAddresses: [],
        ToAddresses: [
          email
        ]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlTemplate(url)
          },
          Text: {
            Charset: 'UTF-8',
            Data: textTemplate(url)
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'PCC Ride Roulette Log In'
        }
      },
      Source: config.email.from,
      ReplyToAddresses: [
        email
      ]
    })
    .promise()
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
        email: { type: 'string', pattern: '.+' }
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
