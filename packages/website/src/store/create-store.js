import { createStore, compose } from 'redux'
import persistState from 'redux-localstorage'

const makeStore = (rootReducer, initialState, enhancers = []) => {
  const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const store = createStore(rootReducer, initialState, composeEnhancers(...[ persistState(), ...enhancers ]))

  return store
}

export default makeStore
