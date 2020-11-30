import { STORE_ROULETTE_TOKEN, CLEAR_ROULETTE_TOKEN } from '../actions'

const initialState = {
  token: null
}

const rouletteReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ROULETTE_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case CLEAR_ROULETTE_TOKEN:
      console.info('clear token')
      return {
        ...state,
        token: null
      }
    default:
      return state
  }
}

export default rouletteReducer
