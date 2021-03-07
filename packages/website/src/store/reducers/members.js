import {
  ADMIN_LOAD_MEMBERS,
  ADMIN_SET_MEMBERS,
  SIGN_OUT,
  SESSION_EXPIRED_TOKEN
} from '../actions'

const initialState = {
  members: [],
  loadingMembers: true
}

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOAD_MEMBERS: {
      return {
        ...state,
        loadingMembers: true,
        members: []
      }
    }
    case ADMIN_SET_MEMBERS: {
      return {
        ...state,
        loadingMembers: false,
        members: action.payload
      }
    }
    case SIGN_OUT:
    case SESSION_EXPIRED_TOKEN:
      return {
        ...state,
        loadingMembers: true,
        members: []
      }
    default:
      return state
  }
}

export default membersReducer
