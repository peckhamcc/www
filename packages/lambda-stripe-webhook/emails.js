
const htmlFooter = `<p>Peckham Cycle Club</p>
    <p>
      <a href="mailto:peckhamcc@gmail.com">peckhamcc@gmail.com</a><br />
      <a href="https://peckham.cc">https://peckham.cc</a><br />
      <a href="https://facebook.com/PeckhamCC">https://facebook.com/PeckhamCC</a><br />
      <a href="https://twitter.com/PeckhamCC">https://twitter.com/PeckhamCC</a><br />
      <a href="https://instagram.com/PeckhamCC">https://instagram.com/PeckhamCC</a>
    </p>`

const textFooter = `Peckham Cycle Club

peckhamcc@gmail.com
https://peckham.cc
https://facebook.com/PeckhamCC
https://twitter.com/PeckhamCC
https://instagram.com/PeckhamCC`

const toCurrencyString = (amount) => {
  const asString = amount.toString()

  return `${asString.substring(0, asString.length - 2)}.${asString.substring(asString.length - 2)}`
}

const htmlTemplateNewFoPCC = (name) => `
<html>
  <head>
  </head>
  <body>
    <p>Hi ${name},</p>
    <p>Congratulations, you have successfully become a Friend of PCC!</p>
    <p>Check out the <a href="https://peckham.cc/membership">membership page</a> for a list of benefits.</p>
    ${htmlFooter}
  </body>
</html>
`

const textTemplateNewFoPCC = (name) => `
Hi ${name},

Congratulations, you have successfully become a Friend of PCC!

Check out the membership page for a list of benefits: https://peckham.cc/membership

${textFooter}
`

const htmlTemplateUpdateFoPCC = (name) => `
<html>
  <head>
  </head>
  <body>
    <p>Hi ${name},</p>
    <p>Your Friend of PCC payment details have been updated.</p>
    <p>If you did not initiate this action please <a href="https://peckham.cc/contact">contact us</a>.</p>
    ${htmlFooter}
  </body>
</html>
`

const textTemplateUpdateFoPCC = (name) => `
Hi ${name},

Your Friend of PCC payment details have been updated.

If you did not initiate this action, please contact us: https://peckham.cc/contact

${textFooter}
`

const displayItems = (lineItems, pound, delimiter) => {
  return lineItems.map(lineItem => {
    let output = `${lineItem.quantity}x ${lineItem.name} @ ${pound}${toCurrencyString(lineItem.price)} = ${pound}${toCurrencyString(lineItem.quantity * lineItem.price)}`

    if (lineItem.description && lineItem.description.trim()) {
      output += `${delimiter}${lineItem.description.trim()}`
    }

    return output
  })
    .join(`${delimiter}${delimiter}`)
}

const htmlTemplateShopOrder = (name, amount, lineItems) => `
<html>
  <head>
  </head>
  <body>
    <p>Hi ${name},</p>
    <p>You order from the Peckham Cycle Club shop has been received.</p>
    <p>The items you have ordered are:</p>
    <p>
      ${displayItems(lineItems, '&pound;', '<br />')}
    </p>
    <p>Total value: &pound;${toCurrencyString(amount)}</p>
    <p>We aim to submit orders to the factory once the previous order has arrived (roughly once every two months).</p>
    <p>
      It then typically takes a further six weeks to print, after which your items will be held at
      <a href="https://ratracecycles.com">Rat Race Cycles</a> for you to pick up.
    </p>
    <p>You can check on the status of your order at <a href="https://pekcham.cc/profile/orders">https://pekcham.cc/profile/orders</a><p/>
    <p>Please <a href="https://peckham.cc/contact">get in touch</a> if you'd like any updates in the interim.</p>
    <p>Thank you,</p>
    ${htmlFooter}
  </body>
</html>
`

const textTemplateShopOrder = (name, amount, lineItems) => `
Hi ${name},

You order from the Peckham Cycle Club shop has been received.

The items you have ordered are:

${displayItems(lineItems, '£', '\r\n')}

Total value: £${toCurrencyString(amount)}

We aim to submit orders to the factory once the previous order has arrived (roughly once every two months).

It then typically takes about six weeks to print, after which your items will be held at Rat Race Cycles for you to pick up.

You can check on the status of your order at https://pekcham.cc/profile/orders

Please get in touch if you'd like any updates in the interim: https://peckham.cc/contact

Thank you,

${textFooter}
`

const htmlTemplateFoPCCPaymentSuccess = (name, invoice) => `
<html>
  <head>
  </head>
  <body>
    <p>Hi ${name},</p>
    <p>A subscription payment for your Friend of PCC membership has been collected.</p>
    <p>Your receipt is available <a href="${invoice}">here</a>.</p>
    ${htmlFooter}
  </body>
</html>
`

const textTemplateFoPCCPaymentSuccess = (name, invoice) => `
Hi ${name},

A subscription payment for your Friend of PCC membership has been collected.

Your receipt is available here: ${invoice}

${textFooter}
`

const htmlTemplateFoPCCPaymentFailure = (name) => `
<html>
  <head>
  </head>
  <body>
    <p>Hi ${name},</p>
    <p>Uh-oh, the payment for your Friend of PCC membership failed.</p>
    <p>Please <a href="https://peckham.cc/profile/fopcc">update your payment details</a> to try again.</p>
    ${htmlFooter}
  </body>
</html>
`

const textTemplateFoPCCPaymentFailure = (name) => `
Hi ${name},

Uh-oh, the payment for your Friend of PCC membership failed.

Please update your payment details to try again: https://peckham.cc/profile/fopcc

${textFooter}
`

const htmlTemplateFoPCCCancellation = (name) => `
<html>
  <head>
  </head>
  <body>
    <p>Hi ${name},</p>
    <p>Your Friend of PCC membership has been cancelled, no further payments will be collected.</p>
    <p>We're sorry to see you go!</p>
    ${htmlFooter}
  </body>
</html>
`

const textTemplateFoPCCCancellation = (name) => `
Hi ${name},

Your Friend of PCC membership has been cancelled, no further payments will be collected.

We're sorry to see you go!

${textFooter}
`

module.exports = {
  fopccNewSubscriptionEmail: {
    html: htmlTemplateNewFoPCC,
    text: textTemplateNewFoPCC
  },
  fopccUpdatedSubscriptionEmail: {
    html: htmlTemplateUpdateFoPCC,
    text: textTemplateUpdateFoPCC
  },
  fopccPaymentSuccessEmail: {
    html: htmlTemplateFoPCCPaymentSuccess,
    text: textTemplateFoPCCPaymentSuccess
  },
  fopccPaymentFailureEmail: {
    html: htmlTemplateFoPCCPaymentFailure,
    text: textTemplateFoPCCPaymentFailure
  },
  fopccCancellationEmail: {
    html: htmlTemplateFoPCCCancellation,
    text: textTemplateFoPCCCancellation
  },
  shopOrderEmail: {
    html: htmlTemplateShopOrder,
    text: textTemplateShopOrder
  }
}
