import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, CLEAR_CART } from '../actions'

const initialState = {
  cart: []
}

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: state.cart.concat(action.payload)
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id === action.payload.id)
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
