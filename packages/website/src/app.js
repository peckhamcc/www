import React, {
  Fragment
} from 'react'
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
  Rides,
  Routes,
  Shop,
  Kit,
  Item,
  MailingList,
  Membership,
  Contact,
  Riding,
  Leading
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
import { FlagsProvider, Flag } from 'flag'
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

const TopBreak = styled(Break)`
  margin-top: 0;
`

export default () => {
  return (
    <FlagsProvider flags={config.flags}>
      <Provider store={configureStore()}>
        <Router>
          <ScrollToTop>
            <AppWrapper vertical>
              <TopBreak />
              <FlexItem expand>
                <Navigation />
                <Route path='/account' component={Account} />
                <Route path='/equipment' component={Equipment} />
                <Route exact path='/' component={Home} />
                <Route path='/rides' component={Rides} />
                <Route path='/routes' component={Routes} />
                <Route path='/membership' component={Membership} />
                <Route path='/club' component={About} />
                <Route path='/contact' component={Contact} />
                <Route path='/mailing-list' component={MailingList} />
                <Route path='/riding' component={Riding} />
                <Route path='/leading' component={Leading} />
                <Route path='/kit' component={Kit} />

                <Flag name='store'>
                  <Fragment>
                    <Route exact path='/shop' component={Shop} />
                    <Route path='/shop/:slug' component={Item} />
                    <Route path='/basket' component={Basket} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/orders' component={Orders} />
                  </Fragment>
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
