const AWS = require('aws-sdk')
const { config } = require('./config')

async function sendEmail (to, from, subject, html, text) {
  const ses = new AWS.SES({
    apiVersion: config.aws.ses.version,
    region: config.aws.ses.region
  })

  await ses
    .sendEmail({
      Destination: {
        CcAddresses: [],
        ToAddresses: [
          to
        ]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: html
          },
          Text: {
            Charset: 'UTF-8',
            Data: text
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        }
      },
      Source: from
    })
    .promise()
}

module.exports = {
  sendEmail
}
