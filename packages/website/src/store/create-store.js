import { createStore, compose } from 'redux'
import persistState from 'redux-localstorage'

const storeConfig = {
  deserialize: (serializedData) => {
    let data

    try {
      data = JSON.parse(serializedData)
    } catch (error) {
      console.error(error)
    }

    if (!data) {
      return
    }

    if (data.shop) {
      data.shop.sections = {}
      data.shop.orders = []
    }

    return data
  }
}

const makeStore = (rootReducer, initialState, enhancers = []) => {
  const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const store = createStore(rootReducer, initialState, composeEnhancers(...[persistState(null, storeConfig), ...enhancers]))

  return store
}

export default makeStore
