const jsonDb = require('./json-db')

const cache = jsonDb('cache.json')

async function get (key) {
  if (cache.values[key] && cache.values[key].expires && cache.values[key].expires < Date.now()) {
    delete cache.values[key]
    cache.save()
  }

  return cache.values[key] && cache.values[key].value
}

async function set (key, value, ttl) {
  cache.values[key] = {
    value,
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
