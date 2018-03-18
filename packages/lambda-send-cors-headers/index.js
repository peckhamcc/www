
exports.handler = (event, context, callback) => {
  console.info(event)

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      'message': 'OPTIONS'
    })
  }

  callback(null, response)
}
