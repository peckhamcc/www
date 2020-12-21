export const ADD_TO_CART = 'CART/ADD'
export const REMOVE_FROM_CART = 'CART/REMOVE'
export const UPDATE_CART_ITEM = 'CART/UPDATE'
export const CLEAR_CART = 'CART/CLEAR'
export const SIGN_IN = 'USER/SIGN_IN'
export const SIGN_OUT = 'USER/SIGN_OUT'
export const UPDATE_USER = 'USER/UPDATE'
export const ACCEPTED_TERMS = 'USER/ACCEPTED_TERMS'
export const SELECTED_SIZE = 'USER/SELECTED_SIZE'
export const SELECTED_GENDER = 'USER/SELECTED_GENDER'
export const SESSION_STORE_TOKEN = 'SESSION/STORE_TOKEN'
export const SESSION_EXPIRED_TOKEN = 'SESSION/EXPIRED_TOKEN'
export const SESSION_CLEAR_TOKEN = 'SESSION/CLEAR_TOKEN'
export const SHOP_LOAD_PRODUCTS = 'SHOP/LOAD_PRODUCTS'
export const SHOP_SET_PRODUCTS = 'SHOP/SET_PRODUCTS'

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
export const updateUser = action(UPDATE_USER)
export const acceptedTerms = action(ACCEPTED_TERMS)
export const selectedSize = action(SELECTED_SIZE)
export const selectedGender = action(SELECTED_GENDER)
export const setToken = action(SESSION_STORE_TOKEN)
export const expiredToken = action(SESSION_EXPIRED_TOKEN)
export const clearToken = action(SESSION_CLEAR_TOKEN)
export const loadProducts = action(SHOP_LOAD_PRODUCTS)
export const setProducts = action(SHOP_SET_PRODUCTS)
