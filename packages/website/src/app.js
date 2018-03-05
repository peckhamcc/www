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
  Shop,
  Item,
  Membership,
  About
} from './pages'
import configureStore from './store/configure-store'
import '../assets/pcc-avatar.png'
import Navigation from './components/nav-bar'
import Footer from './components/footer'
import config from './config'
import styled from 'styled-components'
import {
  Break
} from './components/panels'
import stripesImage from '../assets/stripes.png'
import { spacing } from './units'

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

const TopBreak = Break.extend`
  margin-top: 0;
`

export default () => {
  return (
    <Provider store={configureStore()}>
      <Router>
        <AppWrapper vertical>
          <TopBreak />
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
            <Route path='/membership' component={Membership} />
            <Route path='/about' component={About} />
          </FlexItem>
          <Break />
          <Footer />
        </AppWrapper>
      </Router>
    </Provider>
  )
}
