import {
  OPTIONS
} from '@peckhamcc/config'

export function getPrice (product, options) {
  const codes = OPTIONS.productPrices[product.slug]

  if (!codes) {
    throw new Error(`No product prices defined in config for ${product.slug}`)
  }

  let price = Object.values(product.prices)[0]

  if (product.variations) {
    const chosen = []

    // ensure the order is constant
    for (const key of product.variations.split('-')) {
      if (key === 'size') {
        // size does not affect price
        continue
      }

      chosen.push(options[key])
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