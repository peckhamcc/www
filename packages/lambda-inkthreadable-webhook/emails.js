
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

const htmlTemplateOrderShipped = (name) => `
<html>
  <head>
  </head>
  <body>
    <p>Hi ${name},</p>
    <p>The Made on Demand parts of your order have shipped, you should receive them in 2-5 days.</p>
    <p>Please visit the PCC website for tracking information.</p>
    ${htmlFooter}
  </body>
</html>
`

const textTemplateOrderShipped = (name) => `
Hi ${name},

The Made on Demand parts of your order have shipped, you should receive them in 2-5 days.

Please visit the PCC website for tracking information.

${textFooter}
`

module.exports = {
  orderShippedEmail: {
    html: htmlTemplateOrderShipped,
    text: textTemplateOrderShipped
  }
}
