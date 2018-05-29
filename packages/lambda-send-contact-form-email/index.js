const {
  config
} = require('./config')
const AWS = require('aws-sdk')

const middy = require('middy')
const { jsonBodyParser, validator, httpErrorHandler, httpHeaderNormalizer, cors } = require('middy/middlewares')

/*
const allowedOrigins = [
  'https://dev.peckham.cc',
  'https://www.peckham.cc',
  'https://peckham.cc'
]
*/
const respond = (error, event, statusCode, callback, body) => {
/*  let allowOrigin = 'null'

  if (event && event.headers && allowedOrigins.includes(event.headers.origin)) {
    allowOrigin = event.headers.origin
  }
*/
  if (error) {
    console.error(error)
  }

  callback(null, {
    statusCode: statusCode,
    /*
    headers: {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Credentials': true
    },
    */
    body: body ? JSON.stringify(body) : '',
    isBase64Encoded: false
  })
}
/*
const sendEmail = (event, context, callback) => {
  if (!event || !event.body) {
    return respond(400, event, callback)
  }

  try {
    var {name, email, message} = JSON.parse(event.body)
  } catch (error) {
    console.error(error)

    return respond(400, event, callback)
  }

  if (!name || !email || !message) {
    return respond(400, event, callback)
  }

  sendEmail(name, email, message, (error) => {
    if (error) {
      console.error(error)

      return respond(500, event, callback)
    }

    respond(201, event, callback)
  })
}
*/

const sendEmail = (event, context, callback) => {
  const {
    name, email, message
  } = event.body

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
    .then((data) => respond(null, event, 201, callback))
    .catch((error) => respond(error, event, 500, callback))
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
  .use(cors())
  .use(httpHeaderNormalizer())
  .use(jsonBodyParser())
  .use(validator({inputSchema}))
  .use(httpErrorHandler())

module.exports = { handler }
