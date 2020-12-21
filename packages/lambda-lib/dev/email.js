
async function sendEmail (to, from, subject, html, text) {
  console.info('---- send email ----')
  console.info(`
To: ${to}
From: ${from}
Subject: ${subject}

${text}
`)
  console.info('---------------')
}

module.exports = {
  sendEmail
}
