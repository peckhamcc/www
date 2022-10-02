/**
 * The product catalogue is used to test order spreadsheet generation.
 * We keep a cache of it in order to run the test in CI where we can't
 * call out to external systems.
 *
 * Run this file to update the cache.
 */

const https = require('https')
const fs = require('fs/promises')
const path = require('path')

async function fetchProducts () {
  let output = ''

  return new Promise((resolve, reject) => {
    const req = https.get('https://api.peckham.cc/shop/products', (res) => {
      res.on('error', (err) => {
        reject(err)
      })
      res.on('data', (buf) => {
        output += buf.toString('utf8')
      })
      res.on('end', () => {
        resolve(output)
      })
    })
    req.on('error', (err) => {
      reject(err)
    })
  })
}

async function main () {
  const text = await fetchProducts()
  const products = JSON.parse(text)

  await fs.writeFile(path.join(__dirname, 'catalogue.json'), JSON.stringify(products, null, 2))
}

main()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
