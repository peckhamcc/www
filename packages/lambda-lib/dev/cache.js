const jsonDb = require('./json-db')

const cache = jsonDb('cache.json')

async function get (key) {
  if (cache.values[key] && cache.values[key].expires && cache.values[key].expires < Date.now()) {
    delete cache.values[key]
    cache.save()
  }

  const val = cache.values[key] && cache.values[key].value

  if (val) {
    return JSON.parse(JSON.stringify(val))
  }
}

async function set (key, value, ttl) {
  cache.values[key] = {
    value: JSON.parse(JSON.stringify(value)),
    expires: ttl
  }
  cache.save()
}

async function remove (key) {
  delete cache.values[key]
  cache.save()
}

module.exports = {
  get,
  set,
  remove
}
