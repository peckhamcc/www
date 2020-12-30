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
  ProfileDetails,
  ProfileOrders,
  ProfileFoPCC,
  Basket,
  Checkout,
  CheckoutSuccess,
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
  Diversity,
  Calendar,
  Strava,
  StravaError,
  StravaSuccess,
  Results,
  ResultsLockdownCrits,
  ResultsRainbowRace,
  RideRoulette
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
                <Route exact path='/profile' component={ProfileDetails} />
                <Route exact path='/profile/details' component={ProfileDetails} />
                <Route exact path='/profile/fopcc' component={ProfileFoPCC} />
                <Route exact path='/profile/orders' component={ProfileOrders} />
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
                <Route path='/diversity' component={Diversity} />
                <Route path='/calendar' component={Calendar} />
                <Route exact path='/strava/error' component={StravaError} />
                <Route exact path='/strava/success' component={StravaSuccess} />
                <Route exact path='/strava' component={Strava} />
                <Route exact path='/results' component={Results} />
                <Route exact path='/results/lockdown-crits-2020' component={ResultsLockdownCrits} />
                <Route exact path='/results/rainbow-race-early-may-2020' component={ResultsRainbowRace} />
                <Route path='/ride-roulette' component={RideRoulette} />

                <Flag name={['shop']}>
                  <>
                    <Route exact path='/shop' component={Shop} />
                    <Route path='/shop/:slug' component={Item} />
                    <Route path='/basket' component={Basket} />
                    <Route exact path='/checkout' component={Checkout} />
                    <Route exact path='/checkout/success' component={CheckoutSuccess} />
                    <Route path='/orders' component={Orders} />
                  </>
                </Flag>

                <Route path='/track-trace' component={() => window.location.replace('https://docs.google.com/forms/d/e/1FAIpQLSc9AFF9oQI2bDKWf9heplIi3hPQE6Ok2v-zGObByD9T0EjlbQ/viewform')} />

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
