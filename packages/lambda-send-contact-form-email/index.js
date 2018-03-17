const {
  config
} = require('./config')
const AWS = require('aws-sdk')

exports.handler = ({name, email, message}, context, callback) => {
  sendEmail(name, email, message, (error) => {
    let statusCode = 200
    let responseBody = {}

    if (error) {
      console.error(error)
      statusCode = 500
    }

    const response = {
      statusCode: statusCode,
      headers: {},
      body: JSON.stringify(responseBody),
      isBase64Encoded: false
    }

    callback(null, response)
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
