export const ADD_TO_CART = 'CART/ADD'
export const REMOVE_FROM_CART = 'CART/REMOVE'
export const UPDATE_CART_ITEM = 'CART/UPDATE'
export const CLEAR_CART = 'CART/CLEAR'
export const SIGN_IN = 'USER/SIGN_IN'
export const SIGN_OUT = 'USER/SIGN_OUT'

const action = (type) => (payload) => ({
  type,
  payload
})

export const addToCart = action(ADD_TO_CART)
export const removeFromCart = action(REMOVE_FROM_CART)
export const updateCartItem = action(UPDATE_CART_ITEM)
export const clearCart = action(CLEAR_CART)
export const signIn = action(SIGN_IN)
export const signOut = action(SIGN_OUT)
