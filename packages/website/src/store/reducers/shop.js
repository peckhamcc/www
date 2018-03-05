import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, CLEAR_CART } from '../actions'
import shortid from 'shortid'

const initialState = {
  cart: []
}

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cart.find(item => item.sku === action.payload.sku && item.gender === action.payload.gender && item.size === action.payload.size && item.variant === action.payload.variant)

      if (existingItem) {
        existingItem.quantity += action.payload.quantity

        return {
          ...state
        }
      }

      action.payload.id = shortid.generate()

      return {
        ...state,
        cart: state.cart.concat(action.payload)
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
