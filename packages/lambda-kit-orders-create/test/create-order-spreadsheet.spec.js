/**
 * Update the catalogue cache periodically, see `download-catalogue.js`
 * in this directory for more information.
 */

const test = require('ava')
const { OPTIONS } = require('../config')
const createOrderSpreadsheet = require('../create-order-spreadsheet')
const catalogue = require('./catalogue.json')

/*
const items = {
  "n70012-UF04": {
      "name": "ARM warmers ACTIVE 04 | ROUBAIX",
      "notes": "",
      "section": "accessories",
      "quantity": 1,
      "sizes": {
          "6/8": 1
      }
  },
  "n70011-UF04": {
      "name": "ARM warmers ACTIVE 04 | LYCRA",
      "notes": "",
      "section": "accessories",
      "quantity": 1,
      "sizes": {
          "2/3": 1
      }
  },
  "n50057-ML40": {
      "name": "Jersey L/S ELITE 40 | ANDORRA",
      "notes": "",
      "section": "jerseys",
      "quantity": 1,
      "sizes": {
          "2": 1
      }
  },
  "n51072-MS53": {
      "name": "Jersey S/S ELITE 53 | Stripes",
      "notes": "",
      "section": "jerseys",
      "quantity": 1,
      "sizes": {
          "3+": 1
      }
  },
  "n51072-LS54": {
      "name": "Jersey S/S ELITE 54 | Stripes",
      "notes": "small removable pocket",
      "section": "jerseys",
      "quantity": 1,
      "sizes": {
          "1": 1
      }
  },
  "n50055-JL06": {
      "name": "Jersey L/S ACTIVE 06 | FLANDERS",
      "notes": "",
      "section": "jerseys",
      "quantity": 1,
      "sizes": {
          "140": 1
      }
  },
  "n50219-ML09": {
      "name": "Jacket PRO 09 | W&W eVent ",
      "notes": "",
      "section": "outerwear",
      "quantity": 1,
      "sizes": {
          "6": 1
      }
  }
}
*/
test.skip('should create order with all products', t => {
  // create an order with one of every item in every size with every option
  const items = {}

  Object.keys(catalogue).forEach(section => {
    catalogue[section].items.forEach(item => {
      // only made to order items
      if (item.type !== 'made-to-order') {
        return
      }

      const codes = OPTIONS.productPrices[item.slug]

      if (typeof codes === 'string') {
        addItems(items, codes, item)
      } else {
        Object.entries(codes).forEach(([opts, code]) => {
          addItems(items, code, item, opts)
        })
      }
    })
  })

  const result = createOrderSpreadsheet(items)

  t.truthy(result.content)
})

function addItems (items, code, item, opts) {
  const details = OPTIONS.productCodes[code]
  let quantity = 1
  let sizes = {}

  if (item.options.size != null) {
    let itemSizes = item.options.size

    if (!Array.isArray(itemSizes)) {
      // gendered
      const gender = opts.substring(0, 1)
      itemSizes = itemSizes[gender]
    }

    quantity = itemSizes.length
    itemSizes.forEach(size => {
      sizes[size] = 1
    })
  } else {
    // one size fits all
    quantity = 1
    sizes = {}
  }

  // unisex item
  items[code] = {
    name: details.name ?? '',
    notes: details.notes ?? '',
    section: item.section,
    quantity,
    sizes
  }
}
