
async function sendEmail (to, from, subject, html, text) {
  console.info(`
To: ${to}
From: ${from}
Subject: ${subject}

${text}
`)
}

module.exports = {
  sendEmail
}
