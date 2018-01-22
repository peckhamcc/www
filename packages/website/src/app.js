import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements'
import {
  Account,
  Basket,
  Checkout,
  Equipment,
  Home,
  Orders,
  Rides,
  Routes,
  Shop,
  Item
} from './pages'
import configureStore from './store/configure-store'
import '../assets/pcc-avatar.png'
import Navigation from './components/nav-bar'
import Footer from './components/footer'
import config from './config'
import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};

  ${props => props.centered ? `
  align-items: center;
  justify-content: center;
  ` : ''};
`

const FlexItem = styled.div`
  ${props => props.expand ? `
  flex-grow: 1;
  `: ''};
`

const AppWrapper = FlexContainer.extend`
  min-height: 100vh;
`

export default () => {
  return (
    <Provider store={configureStore()}>
      <StripeProvider apiKey={config.stripe.key}>
        <Router>
          <AppWrapper vertical>
            <FlexItem expand>
              <Navigation />
              <Route path='/account' component={Account} />
              <Route path='/equipment' component={Equipment} />
              <Route exact path='/' component={Home} />
              <Route path='/orders' component={Orders} />
              <Route path='/rides' component={Rides} />
              <Route path='/routes' component={Routes} />
              <Route exact path='/shop' component={Shop} />
              <Route path='/shop/:slug' component={Item} />
              <Route path='/basket' component={Basket} />
              <Route path='/checkout' component={Checkout} />
            </FlexItem>
            <Footer />
          </AppWrapper>
        </Router>
      </StripeProvider>
    </Provider>
  )
}
