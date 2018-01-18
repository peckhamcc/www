import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { grey, white } from 'material-ui/colors'
import { Home, About, Rides, Shop, Equipment, Routes } from './pages'
import configureStore from './store/configure-store'
import '../assets/pcc-avatar.png'

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
          </Theme>
        </Router>
      </Provider>
    </div>
  )
}
