import { SIGN_IN, SIGN_OUT, SELECTED_GENDER, SELECTED_SIZE, ACCEPTED_TERMS } from '../actions'

const initialState = {
  user: null,
  size: null,
  gender: null,
  acceptedTerms: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.payload
      }
    case SIGN_OUT:
      return {
        ...state,
        user: null
      }
    case SELECTED_GENDER:
      return {
        ...state,
        gender: action.payload
      }
    case SELECTED_SIZE:
      return {
        ...state,
        size: action.payload
      }
    case ACCEPTED_TERMS:
      return {
        ...state,
        acceptedTerms: action.payload
      }
    default:
      return state
  }
}

export default userReducer
