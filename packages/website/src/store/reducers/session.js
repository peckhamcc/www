import { SESSION_STORE_TOKEN, SESSION_EXPIRED_TOKEN, SIGN_OUT } from '../actions'

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
      return {
        ...state,
        token: null,
        tokenExpired: true
      }
    case SIGN_OUT:
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
