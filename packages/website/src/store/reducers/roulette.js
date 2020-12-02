import { STORE_ROULETTE_TOKEN, EXPIRED_ROULETTE_TOKEN, CLEAR_ROULETTE_TOKEN } from '../actions'

const initialState = {
  token: null,
  tokenExpired: false
}

const rouletteReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ROULETTE_TOKEN:
      return {
        ...state,
        token: action.payload,
        tokenExpired: false
      }
    case EXPIRED_ROULETTE_TOKEN:
      console.info('clear token')
      return {
        ...state,
        token: null,
        tokenExpired: true
      }
    case CLEAR_ROULETTE_TOKEN:
      console.info('clear token')
      return {
        ...state,
        token: null,
        tokenExpired: false
      }
    default:
      return state
  }
}

export default rouletteReducer
