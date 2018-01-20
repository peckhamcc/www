import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {
  Account,
  Basket,
  Checkout,
  Equipment,
  Home,
  Orders,
  Rides,
  Routes,
  Shop
} from './pages'
import configureStore from './store/configure-store'
import '../assets/pcc-avatar.png'
import Navigation from './components/nav-bar'
import Footer from './components/footer'

export default () => {
  return (
    <div>
      <Provider store={configureStore()}>
        <Router>
          <Fragment>
            <Navigation />
            <Route path='/account' component={Account} />
            <Route path='/shop/basket' component={Basket} />
            <Route path='/shop/checkout' component={Checkout} />
            <Route path='/equipment' component={Equipment} />
            <Route exact path='/' component={Home} />
            <Route path='/orders' component={Orders} />
            <Route path='/rides' component={Rides} />
            <Route path='/routes' component={Routes} />
            <Route exact path='/shop' component={Shop} />
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    </div>
  )
}
