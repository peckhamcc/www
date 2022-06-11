const AWS = require('aws-sdk')
const { config } = require('./config')
const nodemailer = require('nodemailer')

/**
 * @param {string} to
 * @param {string} from
 * @param {string} subject
 * @param {string} html
 * @param {string} text
 * @param {Array<{ filename: string, content: Uint8Array }>} attachments
 */
async function sendEmail (to, from, subject, html, text, attachments = []) {
  const ses = new AWS.SES({
    apiVersion: config.aws.ses.version,
    region: config.aws.ses.region
  })

  const transporter = nodemailer.createTransport({
    SES: ses
  })

  await new Promise((resolve, reject) => {
    transporter.sendMail({
      from,
      subject,
      html,
      text,
      to,
      attachments
    }, (err) => {
      if (err) {
        return reject(err)
      }

      resolve()
    })
  })
}

module.exports = {
  sendEmail
}
