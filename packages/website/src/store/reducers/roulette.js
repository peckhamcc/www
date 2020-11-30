import { VERIFIED_ROULETTE_TOKEN, CLEAR_ROULETTE_TOKEN } from '../actions'

const initialState = {
  token: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFIED_ROULETTE_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case CLEAR_ROULETTE_TOKEN:
      return {
        ...state,
        token: null
      }
    default:
      return state
  }
}

export default userReducer
