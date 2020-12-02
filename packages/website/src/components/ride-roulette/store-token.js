import {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  connect
} from 'react-redux'
import {
  storeRouletteToken,
  setUserEmail
} from '../../store/actions'

class StoreToken extends Component {
  render () {
    if (this.props.token) {
      return null
    }

    const encoded = new URLSearchParams(window.location.search).get('token')

    if (encoded) {
      const {
        email, token
      } = JSON.parse(global.atob(encoded))

      if (email !== this.props.user.email) {
        this.props.setUserEmail(email)
      }

      this.props.storeRouletteToken(token)
      window.location = `${window.location}`.split('?')[0]
    }

    return null
  }
}

StoreToken.propTypes = {
  token: PropTypes.string
}

const mapStateToProps = ({ roulette: { token }, user }) => ({
  token,
  user
})

const mapDispatchToProps = {
  storeRouletteToken,
  setUserEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreToken)
