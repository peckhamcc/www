import React from 'react'
import {
  Provider
} from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import {
  About,
  Account,
  Basket,
  Checkout,
  Equipment,
  Home,
  Orders,
  Racing,
  Rides,
  Routes,
  Shop,
  Item,
  MailingList,
  Membership,
  Contact,
  Riding,
  Leading,
  Ethos,
  Calendar,
  Strava,
  StravaError,
  StravaSuccess
} from './pages'
import configureStore from './store/configure-store'
import '../assets/pcc-avatar.png'
import Navigation from './components/nav-bar'
import Footer from './components/footer'
import { config } from '@peckhamcc/config'
import styled from 'styled-components'
import {
  Break
} from './components/panels'
import { FlagsProvider, Flag } from './lib/flags'
import ScrollToTop from './components/scroll-to-top'

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
  ` : ''};
`

const AppWrapper = styled(FlexContainer)`
  min-height: 100vh;
`

export default () => {
  return (
    <FlagsProvider flags={config.flags}>
      <Provider store={configureStore()}>
        <Router>
          <ScrollToTop>
            <AppWrapper vertical>
              <FlexItem expand>
                <Navigation />
                <Route exact path='/' component={Home} />
                <Route path='/account' component={Account} />
                <Route path='/equipment' component={Equipment} />
                <Route path='/rides' component={Rides} />
                <Route path='/routes' component={Routes} />
                <Route path='/membership' component={Membership} />
                <Route path='/club' component={About} />
                <Route path='/contact' component={Contact} />
                <Route path='/mailing-list' component={MailingList} />
                <Route path='/racing' component={Racing} />
                <Route path='/riding' component={Riding} />
                <Route path='/leading' component={Leading} />
                <Route path='/ethos' component={Ethos} />
                <Route path='/calendar' component={Calendar} />
                <Route path='/strava' component={Strava} />
                <Route path='/strava/error' component={StravaError} />
                <Route path='/strava/success' component={StravaSuccess} />

                <Flag name={['store']}>
                  <>
                    <Route exact path='/shop' component={Shop} />
                    <Route path='/shop/:slug' component={Item} />
                    <Route path='/basket' component={Basket} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/orders' component={Orders} />
                  </>
                </Flag>

              </FlexItem>
              <Break />
              <Footer />
            </AppWrapper>
          </ScrollToTop>
        </Router>
      </Provider>
    </FlagsProvider>
  )
}
