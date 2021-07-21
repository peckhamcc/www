/* eslint-disable */

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

const htmlTemplateShopOrder = (name, amount, lineItems, {
  hasMtoKit,
  hasDropShipKit,
  hasPremadeKit,
  hasSubscription
}) => `
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
    ${hasMtoKit ? `
    <h3>Made to order</h3>
    <p>Your order contains kit that is made to order</p>
    <p>We aim to submit orders to the factory once the previous order has arrived (roughly once every two months).</p>
    <p>
      It then typically takes a further six weeks to print, after which your items will be held at
      <a href="https://ratracecycles.com">Rat Race Cycles</a> for you to pick up.
    </p>
    ` : ''}
    ${hasDropShipKit ? `
    <h3>Made on demand</h3>
    <p>Your order contains items that are made on demand</p>
    <p>On-demand items are submitted to the factory as soon as payment has been received and is shipped directly to you, usually within 1-2 weeks.</p>
    ` : ''}
    ${hasPremadeKit ? `
    <h3>Pre-made</h3>
    <p>Your order contains items that are pre-made.</p>
    <p>Your order is available to be picked up immediately from <a href='https://ratracecycles.com/'>Rat Race Cycles</a> at 118 Evelina Road, SE15 3HL.</p>
    ` : ''}
    ${hasSubscription ? `
    <h3>Subscription</h3>
    <p>Your order contains a subscription.</p>
    <p>The FoPCC subscription will renew on a yearly basis - visit your <a href="https://peckham.cc/user/profile">profile page</a> to cancel at any time.</p>
    ` : ''}
    <p>You can check on the status of your order at <a href="https://peckham.cc/profile/orders">https://peckham.cc/profile/orders</a><p/>
    <p>Please <a href="https://peckham.cc/contact">get in touch</a> if you'd like any updates in the interim.</p>
    <p>Thank you,</p>
    ${htmlFooter}
  </body>
</html>
`

const textTemplateShopOrder = (name, amount, lineItems, {
  hasMtoKit,
  hasDropShipKit,
  hasPremadeKit,
  hasSubscription
}) => `
Hi ${name},

You order from the Peckham Cycle Club shop has been received.

The items you have ordered are:

${displayItems(lineItems, '£', '\r\n')}

Total value: £${toCurrencyString(amount)}

${hasMtoKit ? `
Made to order

Your order contains kit that is made to order

We aim to submit orders to the factory once the previous order has arrived (roughly once every two months).

It then typically takes a further six weeks to print, after which your items will be held at Rat Race Cycles for you to pick up.
` : ''}

${hasDropShipKit ? `
Made on demand

Your order contains items that are made on demand

On-demand items are submitted to the factory as soon as payment has been received and is shipped directly to you, usually within 1-2 weeks.
` : ''}

${hasPremadeKit ? `
Pre-made

Your order contains items that are pre-made.

Your order is available to be picked up immediately from Rat Race Cycles at 118 Evelina Road, SE15 3HL.
` : ''}

${hasSubscription ? `
Subscription

Your order contains a subscription.

The FoPCC subscription will renew on a yearly basis - visit https://peckham.cc/user/profile to cancel at any time.
` : ''}


You can check on the status of your order at https://peckham.cc/profile/orders

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
