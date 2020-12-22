import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  CLEAR_CART,
  SHOP_LOAD_PRODUCTS,
  SHOP_SET_PRODUCTS,
  SHOP_LOAD_ORDERS,
  SHOP_SET_ORDERS,
  SIGN_OUT,
  SESSION_EXPIRED_TOKEN
} from '../actions'

const initialState = {
  cart: [],
  loadingProducts: true,
  sections: {},
  products: {},
  slugLookup: {},
  orders: [],
  loadingOrders: true
}

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOP_LOAD_PRODUCTS: {
      return {
        ...state,
        loadingProducts: true,
        sections: {},
        slugLookup: {}
      }
    }
    case SHOP_SET_PRODUCTS: {
      const sections = action.payload
      const slugLookup = sections.reduce((lookup, section) => {
        lookup[section.slug] = section

        section.items.forEach(item => {
          lookup[item.slug] = item
        })

        return lookup
      }, {})

      return {
        ...state,
        loadingProducts: false,
        sections,
        slugLookup,

        // remove any products from cart that now do not have a slug
        cart: (state.cart || []).filter(item => Boolean(slugLookup[item.slug]))
      }
    }
    case ADD_TO_CART: {
      let cart = state.cart
      const existingItem = cart.find(item => item.slug === action.payload.slug && JSON.stringify(item.options) === JSON.stringify(action.payload.options))

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
        cart: state.cart
          .filter(item => !(item.slug === action.payload.slug && JSON.stringify(item.options) === JSON.stringify(action.payload.options)))
      }
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.slug === action.payload.slug && JSON.stringify(item.options) === JSON.stringify(action.payload.options)) {
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
    case SHOP_LOAD_ORDERS:
      return {
        ...state,
        loadingOrders: true
      }
    case SHOP_SET_ORDERS:
      return {
        ...state,
        loadingOrders: false,
        orders: action.payload
      }
    case SIGN_OUT:
    case SESSION_EXPIRED_TOKEN:
      return {
        ...state,
        loadingOrders: true,
        orders: [],
        cart: []
      }
    default:
      return state
  }
}

export default shopReducer
