import { combineReducers } from 'redux'
import createStore from './create-store'
import reducers from './reducers'

const configureStore = () => {
  return createStore(combineReducers(reducers))
}

export default configureStore
