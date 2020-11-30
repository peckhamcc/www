import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  PageWrapper,
  Panel
} from '../panels'
import styled from 'styled-components'
import {
  connect
} from 'react-redux'
import config from '../../config'
import {
  Input,
  FormInputWrapper
} from '../forms'
import {
  clearRouletteToken
} from '../../store/actions'
import pccLogo from '../../../assets/pcc-logo-round.png'

const CenteredPanel = styled(Panel)`
  max-width: 376px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  padding-top: 20px;

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`

const Form = styled.form`
  margin-top: 20px;
`

class Rides extends Component {
  state = {
    loading: false,
    rides: null,
    error: null
  }

  componentDidMount () {
    this._loadRides()
      .catch(() => {})
  }

  async _loadRides () {
    if (!this.props.token || !this.props.email) {
      return
    }

    this.setState({
      loading: true
    })

    try {
      const response = await global.fetch(config.lambda.rideRouletteRidesGet, {
        method: 'GET',
        headers: {
          'Auth': btoa(JSON.stringify({'token': this.props.token, 'email': this.props.email}))
        }
      })

      if (response.status === 200) {
        this.setState({
          loading: false,
          rides: await response.json(),
          error: null
        })

        return
      }

      if (response.status === 401) {
        this.setState({
          loading: false
        })
        this.props.clearRouletteToken()

        return
      }
    } catch (error) {
      this.setState({
        loading: false,
        error
      })

      console.error('load preferences error')
      console.error(error)
    }
  }

  render () {
    if (!this.props.token) {
      return null
    }

    const {
      loading,
      rides
    } = this.state

    if (loading) {
      return (
        <p>Loading</p>
      )
    }

    let content = (
      <>
        <p>Choose and perish</p>
      </>
    )

    return (
      <PageWrapper>
        <CenteredPanel>
          <img src={pccLogo.src} width='300' height='300' />
          <h2>Ride Roulette</h2>
          {content}
        </CenteredPanel>
      </PageWrapper>
    )
  }
}

Rides.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object
}

const mapStateToProps = ({ roulette: { token }, user: { email } }) => ({
  token,
  email
})

const mapDispatchToProps = {
  clearRouletteToken
}

export default connect(mapStateToProps, mapDispatchToProps)(Rides)
