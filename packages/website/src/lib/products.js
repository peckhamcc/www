import {
  OPTIONS
} from '@peckhamcc/config'

export function getPrice (product, options) {
  console.info('product', product, 'options', options)

  const codes = OPTIONS.productPrices[product.slug]

  if (!codes) {
    throw new Error(`No product prices defined in config for ${product.slug}`)
  }

  let price = Object.values(product.prices)[0]

  if (Object.keys(product.options).length) {
    const chosen = []

    for (const [key, value] of Object.entries(options)) {
      if (key === 'size') {
        // size does not affect price
        continue
      }

      chosen.push(value)
    }

    const matrix = chosen.join('-')

    let code

    if (matrix === '') {
      if (typeof codes != 'string') {
        throw new Error(`Product ${product.slug} only had size option but multiple configured prices`)
      }

      code = codes
    } else {
      code = codes[matrix]
    }

    if (!code) {
      throw new Error(`No product price defined in config for ${product.slug} and selection ${matrix}`)
    }

    price = product.prices[code]

    if (!price) {
      throw new Error(`No product price defined for code ${code} for product ${product.slug}`)
    }
  }

  if (!price) {
    throw new Error(`Could not find price for product ${product.slug}`)
  }

  return price
}