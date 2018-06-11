const {
  config
} = require('./config')
const AWS = require('aws-sdk')

module.exports = (emailAddress, firstName, lastName, address1, address2, address3, postCode, lineItems, amount, callback) => {
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
            Data: htmlTemplate(firstName, lastName, address1, address2, address3, postCode, lineItems, amount)
          },
          Text: {
            Charset: 'UTF-8',
            Data: textTemplate(firstName, lastName, address1, address2, address3, postCode, lineItems, amount)
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Peckham Cycle Club order'
        }
      },
      Source: config.email.from,
      ReplyToAddresses: [
        config.email.to
      ]
    })
    .promise()
    .then(() => callback())
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

const htmlTemplate = (firstName, lastName, address1, address2, address3, postCode, lineItems, amount) => `
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
      <p>Thanks for your order, in order to complete it, please make a payment to the following account for the amount of &pound;${amount}</p>
      <p>Please use ${lastName.toUpperCase()}-KIT as the payment reference.</p>
      <p>
        Name: Peckham Cycle Club<br />
        Account: ${process.env.PCC_ACCOUNT_NUMBER}<br />
        Sort code: ${process.env.PCC_SORT_CODE}
      </p>
      <p>Your order is not complete until payment has been received.</p>
      <p>The items you have ordered are:</p>
      <p>
        ${displayItems(lineItems, '&pound;', '<br />')}
      </p>
      <p>Total value: &pound;${amount}</p>
      <p>The address you submitted was:</p>
      <p>${
        [(`${firstName} ${lastName}`).trim(), address1, address2, address3, postCode].filter(Boolean).join('<br />')
      }</p>
      <p>Your order will be submitted to the factory once we hit the minimums for production.</p>
      <p>Once we know the delivery date for your items we will be in touch to let you know.</p>
      <p>Please get in touch if you'd like any updates.</p>
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

const textTemplate = (firstName, lastName, address1, address2, address3, postCode, lineItems, amount) => `
Hi ${firstName},

Thanks for your order, in order to complete it, please make a payment to the following account for the amount of £${amount}

Please use ${lastName.toUpperCase()}-KIT as the payment reference.

Name: Peckham Cycle Club
Account: ${process.env.PCC_ACCOUNT_NUMBER}
Sort code: ${process.env.PCC_SORT_CODE}

Your order is not complete until payment has been received.

The items you have ordered are:

${displayItems(lineItems, '£', '\r\n')}

Total value: £${amount}

The address you submitted was:

${
  [(`${firstName} ${lastName}`).trim(), address1, address2, address3, postCode].filter(Boolean).join('\r\n')
}

Your order will be submitted to the factory once we hit the minimums for production.  Once we know the delivery date for your items we will be in touch to let you know.

Please get in touch if you'd like any updates.

Thank you,

Peckham Cycle Club

peckhamcc@gmail.com
https://peckham.cc
https://facebook.com/PeckhamCC
https://twitter.com/PeckhamCC
https://instagram.com/PeckhamCC
`
