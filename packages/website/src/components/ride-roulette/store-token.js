import {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  connect
} from 'react-redux'
import {
  storeRouletteToken
} from '../../store/actions'

class StoreToken extends Component {
  render () {
    if (this.props.token) {
      return null
    }

    const token = new URLSearchParams(window.location.search).get('token')

    if (token) {
      this.props.storeRouletteToken(token)
      window.location = `${window.location}`.split('?')[0]
    }

    return null
  }
}

StoreToken.propTypes = {
  token: PropTypes.string
}

const mapStateToProps = ({ roulette: { token } }) => ({
  token
})

const mapDispatchToProps = {
  storeRouletteToken
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreToken)
