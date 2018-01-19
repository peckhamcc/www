import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { grey, white } from 'material-ui/colors'
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
import Navigation from './navigation'

const theme = createMuiTheme({
  palette: {
    primary: white,
    secondary: grey
  }
})

const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      fontSize: 16
    },
    body: {
      margin: 0
    }
  }
})

const context = {
  theme
}

class ThemeWrapper extends Component {
  render () {
    return (
      <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
        <div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

const Theme = withStyles(styles)(ThemeWrapper)

export default () => {
  return (
    <div>
      <Provider store={configureStore()}>
        <Router>
          <Theme>
            <Navigation />
            <Route path='/account' component={Account} />
            <Route path='/shop/basket' component={Basket} />
            <Route path='/shop/checkout' component={Checkout} />
            <Route path='/equipment' component={Equipment} />
            <Route exact path='/' component={Home} />
            <Route path='/shop/orders' component={Orders} />
            <Route path='/rides' component={Rides} />
            <Route path='/routes' component={Routes} />
            <Route exact path='/shop' component={Shop} />
          </Theme>
        </Router>
      </Provider>
    </div>
  )
}
