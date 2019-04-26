import { createStore, compose } from 'redux'
import persistState from 'redux-localstorage'
import config from '../config'

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

    if (data.shop && data.shop.cart) {
      // remove any items that have changed
      data.shop.cart = data.shop.cart.filter(item => {
        return config.store.products.find(product => product.sku === item.sku)
      })
    }

    return data
  }
}

const makeStore = (rootReducer, initialState, enhancers = []) => {
  const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const store = createStore(rootReducer, initialState, composeEnhancers(...[ persistState(null, storeConfig), ...enhancers ]))

  return store
}

export default makeStore
