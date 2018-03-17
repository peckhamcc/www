const {
  config
} = require('./config')
const AWS = require('aws-sdk')

const respond = (statusCode, callback) => {
  callback(null, {
    statusCode: statusCode,
    headers: {},
    body: '',
    isBase64Encoded: false
  })
}

exports.handler = ({name, email, message}, context, callback) => {
  sendEmail(name, email, message, (error) => {
    if (error) {
      console.error(error)

      respond(500, callback)
    }

    respond(201, callback)
  })
}

const sendEmail = (name, email, message, callback) => {
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
    .then((data) => callback(null, data))
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
