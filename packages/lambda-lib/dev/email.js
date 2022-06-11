
/**
 * @param {string} to
 * @param {string} from
 * @param {string} subject
 * @param {string} html
 * @param {string} text
 * @param {Array<{ filename: string, content: Uint8Array }>} attachments
 */
async function sendEmail (to, from, subject, html, text, attachments = []) {
  console.info('---- send email ----')
  console.info(`
To: ${to}
From: ${from}
Subject: ${subject}

${text}
`)

  attachments.forEach(attachment => {
    console.info(`Attachment: ${attachment.filename} ${attachment.content.byteLength} bytes`)
  })

  console.info('---------------')
}

module.exports = {
  sendEmail
}
