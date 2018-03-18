const allowedOrigins = [
  'https://dev.peckham.cc',
  'https://www.peckham.cc',
  'https://peckham.cc'
]

exports.handler = (event, context, callback) => {
  let allowOrigin = 'null'

  if (event && event.headers && allowedOrigins.includes(event.headers.origin)) {
    allowOrigin = event.headers.origin
  }

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      'message': 'OPTIONS'
    })
  }

  callback(null, response)
}
