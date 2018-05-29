const AWS = require('aws-sdk')
const middy = require('middy')
const {
  jsonBodyParser,
  validator,
  httpErrorHandler,
  httpHeaderNormalizer,
  cors
} = require('middy/middlewares')
const {
  config
} = require('./config')

const sendEmail = function (body, context, callback) {
  const {
    name, email, message
  } = body

  new AWS.SES({
    apiVersion: config.aws.ses.version,
    region: config.aws.ses.region
  })
    .sendEmail({
      Destination: {
        CcAddresses: [],
        ToAddresses: [
          config.email.to
        ]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlTemplate(name, email, message)
          },
          Text: {
            Charset: 'UTF-8',
            Data: textTemplate(name, email, message)
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Peckham Cycle Club contact form message`
        }
      },
      Source: config.email.from,
      ReplyToAddresses: [
        email
      ]
    })
    .promise()
    .then(() => callback())
    .catch((error) => callback(error))
}

const htmlTemplate = (name, email, message) => `
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
      <p>${name} (${email}) submitted this message via the peckham.cc contact form:</p>
      <p>${message.trim().replace(/\n/g, '<br />')}</p>
    </article>
  </body>
</html>
`

const textTemplate = (name, email, message) => `
${name} (${email}) submitted this message via the peckham.cc contact form:

${message.trim()}
`

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string', pattern: '.+' },
        email: { type: 'string', pattern: '.+' },
        message: { type: 'string', pattern: '.+' }
      },
      required: ['name', 'email', 'message']
    }
  }
}

const handler = middy(sendEmail)
  .use(cors({
    origin: process.env.NODE_ENV !== 'development' ? 'https://peckham.cc' : '*'
  }))
  .use(httpHeaderNormalizer())
  .use(jsonBodyParser())
  .use(validator({inputSchema}))
  .use(httpErrorHandler())

module.exports = {
  handler
}
