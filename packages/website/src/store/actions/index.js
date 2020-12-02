export const ADD_TO_CART = 'CART/ADD'
export const REMOVE_FROM_CART = 'CART/REMOVE'
export const UPDATE_CART_ITEM = 'CART/UPDATE'
export const CLEAR_CART = 'CART/CLEAR'
export const SIGN_IN = 'USER/SIGN_IN'
export const SIGN_OUT = 'USER/SIGN_OUT'
export const ACCEPTED_TERMS = 'USER/ACCEPTED_TERMS'
export const SELECTED_SIZE = 'USER/SELECTED_SIZE'
export const SELECTED_GENDER = 'USER/SELECTED_GENDER'
export const SET_USER_NAME = 'USER/SET_NAME'
export const SET_USER_EMAIL = 'USER/SET_EMAIL'
export const STORE_ROULETTE_TOKEN = 'ROULETTE/STORE_TOKEN'
export const EXPIRED_ROULETTE_TOKEN = 'ROULETTE/EXPIRED_TOKEN'
export const CLEAR_ROULETTE_TOKEN = 'ROULETTE/CLEAR_TOKEN'

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
export const acceptedTerms = action(ACCEPTED_TERMS)
export const selectedSize = action(SELECTED_SIZE)
export const selectedGender = action(SELECTED_GENDER)
export const setUserName = action(SET_USER_NAME)
export const setUserEmail = action(SET_USER_EMAIL)
export const storeRouletteToken = action(STORE_ROULETTE_TOKEN)
export const expiredRouletteToken = action(EXPIRED_ROULETTE_TOKEN)
export const clearRouletteToken = action(CLEAR_ROULETTE_TOKEN)
