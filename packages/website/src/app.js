import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Home, About, Rides, Shop, Equipment, Routes } from './pages'
import configureStore from './store/configure-store'

export default () => {
  return (
    <div>
      <Provider store={configureStore()}>
        <Router>
          <div>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/rides'>Rides</Link></li>
              <li><Link to='/equipment'>Equipment</Link></li>
              <li><Link to='/routes'>Routes</Link></li>
              <li><Link to='/shop'>Shop</Link></li>
            </ul>

            <hr />

            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/rides' component={Rides} />
            <Route path='/shop' component={Shop} />
            <Route path='/equipment' component={Equipment} />
            <Route path='/routes' component={Routes} />
          </div>
        </Router>
      </Provider>
    </div>
  )
}
