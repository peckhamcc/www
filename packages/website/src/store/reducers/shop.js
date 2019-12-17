import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, CLEAR_CART } from '../actions'
import shortid from 'shortid'

const initialState = {
  cart: []
}

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.cart.find(
        item => {
          let result = item.sku === action.payload.sku

          if (item.gender && item.gender.code && action.payload.gender && action.payload.gender.code) {
            result = result && item.gender.code === action.payload.gender.code
          }

          if (item.size && item.size.code && action.payload.size && action.payload.size.code) {
            result = result && item.size.code === action.payload.size.code
          }

          Object.keys(item.variants || []).forEach(name => {
            if (item.variants[name] && item.variants[name].code && action.payload.variants && action.payload.variants[name] && action.payload.variants[name].code) {
              result = result && item.variants[name].code === action.payload.variants[name].code
            }
          })

          return result
        }
      )

      if (existingItem) {
        existingItem.quantity += action.payload.quantity

        return {
          ...state,
          // otherwise redux doesn't notice the state change as a deep comparison would be necessary
          cart: state.cart.slice(0)
        }
      }

      action.payload.id = shortid.generate()

      return {
        ...state,
        cart: state.cart.concat(action.payload)
      }
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      }
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.id === action.payload.id) {
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
