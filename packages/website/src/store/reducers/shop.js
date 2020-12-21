import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, CLEAR_CART, SHOP_LOAD_PRODUCTS, SHOP_SET_PRODUCTS } from '../actions'

const VARIANTS = [
  'size',
  'gender',
  'pockets',
  'sleeves'
]

function processItem (item, category) {
  const options = {}

  // skus are ${product_code}:${size}-${gender}-${pockets}-${sleeves}
  // size is ${type}${value}
  //  type is the sizing chart
  //    J - jerseys
  //    A - arm warmers
  //    T - tshirts
  //    G - gloves
  //    S - socks
  //   value depends on the sizing chart
  // gender is U: unisex, M: male or F: female
  // sleeves is S or L
  // pockets is Y or N

  const firstSku = item.variations[0].sku
  item.slug = firstSku.split(':')[0].toLowerCase()

  item.variations.forEach(variation => {
    if (!variation.sku.includes(':')) {
      // no variations for this item
      return
    }

    variation.sku.split(':')[1]
      .split('-')
      .filter(Boolean)
      .forEach((value, index) => {
        const variant = VARIANTS[index]

        if (!variant) {
          return
        }

        if (!options[variant]) {
          options[variant] = new Set()
        }

        options[variant].add(value)
      })
  })

  item.slug = item.slug.toLowerCase()
  item.category = category.id
  item.options = Object.keys(options).reduce((opts, key) => {
    opts[key] = Array.from(options[key])

    return opts
  }, {})
}

const initialState = {
  cart: [],
  loading: true,
  categories: {},
  products: {}
}

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOP_LOAD_PRODUCTS: {
      return {
        ...state,
        loading: true,
        categories: {}
      }
    }
    case SHOP_SET_PRODUCTS: {
      const categories = action.payload

      // add slugs to loaded products
      Object.keys(categories).forEach(categoryId => {
        const category = categories[categoryId]
        category.slug = category.name.replace(/[^a-z0-9]/gmi, '-').replace(/-+/g, '-').toLowerCase()
        category.items.forEach(item => processItem(item, category))
      })

      const items = Object
        .keys(categories)
        .reduce((products, id) => {
          return products.concat(categories[id].items)
        }, [])

      // create sku => details lookup
      const products = {}

      Object.keys(categories)
        .reduce((products, key) => {
          return products.concat(categories[key].items)
        }, [])
        .forEach(product => {
          product.variations.forEach(variant => {
            products[variant.sku] = {
              id: variant.id,
              name: product.name,
              slug: product.slug,
              price: variant.price
            }
          })
        })

      return {
        ...state,
        loading: false,
        categories,
        products,

        // remove any products from cart that now do not have an SKU
        cart: (state.cart || []).filter(item => items.find(i => i.variations.find(variation => variation.sku === item.sku)))
      }
    }
    case ADD_TO_CART: {
      let cart = state.cart
      const existingItem = cart.find(item => item.sku === action.payload.sku)

      if (existingItem) {
        existingItem.quantity += action.payload.quantity

        // otherwise redux doesn't notice the state change as a deep comparison would be necessary
        state.cart.slice(0)
      } else {
        cart = cart.concat(action.payload)
      }

      return {
        ...state,
        cart
      }
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.sku !== action.payload.sku)
      }
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.sku === action.payload.sku) {
            return action.payload
          }

          return item
        })
      }
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      }
    default:
      return state
  }
}

export default shopReducer
