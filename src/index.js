import '../assets/pcc-avatar.png'
import './index.css'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { grey, white } from 'material-ui/colors'
import { Home, About, Rides, Shop } from './pages'
import configureStore from './store/configure-store'

const theme = createMuiTheme({
  palette: {
    primary: white,
    secondary: grey
  }
})

// Apply some reset
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

ReactDOM.render(
  <div>
    <Provider store={configureStore()}>
      <Router>
        <Theme>
          <div>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/rides'>Rides</Link></li>
              <li><Link to='/shop'>Shop</Link></li>
            </ul>

            <hr />

            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/rides' component={Rides} />
            <Route path='/shop' component={Shop} />
          </div>
        </Theme>
      </Router>
    </Provider>
  </div>,
  document.getElementById('app')
)
