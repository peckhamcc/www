import {
  SIGN_IN,
  SIGN_OUT,
  SELECTED_GENDER,
  SELECTED_SIZE,
  ACCEPTED_TERMS,
  UPDATE_USER
} from '../actions'

const initialState = {
  firstName: null,
  lastName: null,
  email: null,
  telephone: null,
  address1: null,
  address2: null,
  address3: null,
  postCode: null,
  size: null,
  gender: null,
  acceptedTerms: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        telephone: action.payload.telephone,
        address1: action.payload.address1,
        address2: action.payload.address2,
        address3: action.payload.address3,
        postCode: action.payload.postCode,
        size: action.payload.size,
        gender: action.payload.gender
      }
    case SIGN_OUT:
      return {
        ...state,
        name: null,
        email: null
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
    case UPDATE_USER:
      return {
        ...state,
        ...(Object.keys(action.payload).reduce((state, key) => {
          state[key] = action.payload[key]
          return state
        }, {}))
      }
    default:
      return state
  }
}

export default userReducer
