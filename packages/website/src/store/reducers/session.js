import { SESSION_STORE_TOKEN, SESSION_EXPIRED_TOKEN, SESSION_CLEAR_TOKEN } from '../actions'

const initialState = {
  token: null,
  tokenExpired: false
}

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_STORE_TOKEN:
      return {
        ...state,
        token: action.payload,
        tokenExpired: false
      }
    case SESSION_EXPIRED_TOKEN:
      console.info('token expired')
      return {
        ...state,
        token: null,
        tokenExpired: true
      }
    case SESSION_CLEAR_TOKEN:
      return {
        ...state,
        token: null,
        tokenExpired: false
      }
    default:
      return state
  }
}

export default accountReducer
