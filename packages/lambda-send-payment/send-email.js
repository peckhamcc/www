const {
  config
} = require('./config')
const AWS = require('aws-sdk')

module.exports = (emailAddress, firstName, lastName, address1, address2, address3, postCode, lineItems, amount) => {
  if (!config.flags.email || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    return Promise.resolve()
  }

  return new AWS.SES({
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
  </head>
  <body>
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
    <p>We aim to submit orders to the factory on the first of every month.</p>
    <p>
      It then typically takes a further six weeks to be made, after which your items will be held at
      <a href="https://ratracecycles.com">Rat Race Cycles</a> for you to pick up.
    </p>
    <p>Once we know the delivery date for your items we'll send you an email to let you know.</p>
    <p>Please get in touch if you'd like any updates in the interim.</p>
    <p>Thank you,</p>
    <p>Peckham Cycle Club</p>
    <p>
      <a href="mailto:peckhamcc@gmail.com">peckhamcc@gmail.com</a><br />
      <a href="https://peckham.cc">https://peckham.cc</a><br />
      <a href="https://facebook.com/PeckhamCC">https://facebook.com/PeckhamCC</a><br />
      <a href="https://twitter.com/PeckhamCC">https://twitter.com/PeckhamCC</a><br />
      <a href="https://instagram.com/PeckhamCC">https://instagram.com/PeckhamCC</a>
    </p>
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

We aim to submit orders to the factory on the first of every month.

It then typically takes about six weeks to be made, after which your items will be held at Rat Race Cycles for you to pick up.

Once we know the delivery date for your items we'll send you an email to let you know.

Please get in touch if you'd like any updates in the interim.

Thank you,

Peckham Cycle Club

peckhamcc@gmail.com
https://peckham.cc
https://facebook.com/PeckhamCC
https://twitter.com/PeckhamCC
https://instagram.com/PeckhamCC
`
