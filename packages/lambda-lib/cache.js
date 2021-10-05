const {
  getOne,
  updateOne,
  removeOne
} = require('./db')

async function get (key) {
  const item = await getOne(process.env.AWS_CACHE_DB_TABLE, {
    key
  })

  if (item && item.value) {
    return item.value
  }
}

async function set (key, value, ttl) {
  await updateOne(process.env.AWS_CACHE_DB_TABLE, {
    key
  }, {
    UpdateExpression: 'set #v = :v' + (ttl ? ', #e = :e' : ''),
    ExpressionAttributeNames: {
      '#v': 'value',
      ...(ttl ? { '#e': 'expires' } : {})
    },
    ExpressionAttributeValues: {
      ':v': value,
      ...(ttl ? { ':e': Math.round(ttl / 1000) } : {})
    },
    ReturnValues: 'UPDATED_NEW'
  })
}

async function remove (key) {
  await removeOne(process.env.AWS_CACHE_DB_TABLE, {
    key
  })
}

module.exports = {
  get,
  set,
  remove
}
