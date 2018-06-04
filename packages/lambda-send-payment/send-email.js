const {
  config
} = require('./config')
const AWS = require('aws-sdk')

module.exports = (emailAddress, firstName, lastName, lineItems, amount, transactionId, callback) => {
  if (!config.flags.email) {
    return callback()
  }

  new AWS.SES({
    apiVersion: config.aws.ses.version,
    region: config.aws.ses.region
  })
    .sendEmail({
      Destination: {
        BccAddresses: [
          config.email.to
        ],
        CcAddresses: [],
        ToAddresses: [
          emailAddress
        ]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlTemplate(firstName, lineItems, amount, transactionId)
          },
          Text: {
            Charset: 'UTF-8',
            Data: textTemplate(firstName, lineItems, amount, transactionId)
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Peckham Cycle Club order ${transactionId}`
        }
      },
      Source: config.email.from,
      ReplyToAddresses: [
        config.email.to
      ]
    })
    .promise()
    .then((data) => callback(null, data))
    .catch((error) => callback(error))
}

const displayItems = (lineItems, pound, delimiter) => {
  return lineItems.map(lineItem => {
    let output = `${lineItem.quantity}x ${lineItem.name} @ ${pound}${lineItem.unitAmount} = ${pound}${lineItem.totalAmount}`

    if (lineItem.description && lineItem.description.trim()) {
      output += `${delimiter}${lineItem.description.trim()}`
    }

    return output
  })
    .join(`${delimiter}${delimiter}`)
}

const htmlTemplate = (firstName, lineItems, amount, transactionId) => `
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
      <p>Hi ${firstName},</p>
      <p>Thanks for your order, it will be submitted to the factory once we have enough orders to hit the minimums.</p>
      <p>Your order ID is <strong>${transactionId}</strong>, please keep this safe and mention it in any correspondence with us about your order.</p>
      <p>The items you have ordered are:</p>
      <p>
        ${displayItems(lineItems, '&pound;', '<br />')}
      </p>
      <p>Total value: &pound;${amount}</p>
      <p>Once we know the delivery date for your items we will be in touch to let you know.</p>
      <p>Thank you,</p>
      <p>Peckham Cycle Club</p>
      <p>
        <a href="mailto:peckhamcc@gmail.com">peckhamcc@gmail.com</a><br />
        <a href="https://peckham.cc">https://peckham.cc</a><br />
        <a href="https://facebook.com/PeckhamCC">https://facebook.com/PeckhamCC</a><br />
        <a href="https://twitter.com/PeckhamCC">https://twitter.com/PeckhamCC</a><br />
        <a href="https://instagram.com/PeckhamCC">https://instagram.com/PeckhamCC</a>
      </p>
    </article>
  </body>
</html>
`

const textTemplate = (firstName, lineItems, amount, transactionId) => `
Hi ${firstName},

Thanks for your order, it will be submitted to the factory once we have enough orders to hit the minimums.

Your order ID is ${transactionId}, please keep this safe and mention it in any correspondence with us about your order.

Once we know the delivery date for your items we will be in touch to let you know.

The items you have ordered are:

${displayItems(lineItems, '£', '\r\n')}

Total value: £${amount}

Thank you,

Peckham Cycle Club

peckhamcc@gmail.com
https://peckham.cc
https://facebook.com/PeckhamCC
https://twitter.com/PeckhamCC
https://instagram.com/PeckhamCC
`
