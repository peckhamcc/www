import {
  ADMIN_LOAD_RRC_ORDERS,
  ADMIN_SET_RRC_ORDERS,
  SIGN_OUT,
  SESSION_EXPIRED_TOKEN
} from '../actions'

const initialState = {
  orders: [],
  loadingOrders: true
}

const rrcReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOAD_RRC_ORDERS: {
      return {
        ...state,
        loadingOrders: true,
        orders: []
      }
    }
    case ADMIN_SET_RRC_ORDERS: {
      return {
        ...state,
        loadingOrders: false,
        orders: action.payload
      }
    }
    case SIGN_OUT:
    case SESSION_EXPIRED_TOKEN:
      return {
        ...state,
        loadingOrders: true,
        orders: []
      }
    default:
      return state
  }
}

export default rrcReducer
