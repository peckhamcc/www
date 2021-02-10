import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import styled from 'styled-components'
import {
  Spinner,
  Info,
  Button,
  Note
} from '../panels'
import {
  GreenButton,
  RedButton
} from '../forms'
import {
  expiredToken,
  signIn
} from '../../store/actions'
import {
  config
} from '@peckhamcc/config'
import {
  FaCheck,
  FaTimes
} from 'react-icons/fa'
import {
  spacing
} from '../../units'
import Modal from '../modal'

const ButtonWrapper = styled.div`
  margin-top: ${spacing(2)};

  button {
    padding: 10px ${spacing(1)};
    margin-bottom: ${spacing(0.5)};
  }
`

class Fopcc extends Component {
  state = {
    loading: false,
    confirmationModalOpen: false
  }

  async componentDidMount () {
    try {
      this.setState({
        loading: true
      })

      const response = await global.fetch(config.lambda.accountUserGet, {
        method: 'GET',
        headers: {
          Authorization: this.props.token
        }
      })

      if (response.status === 200) {
        this.props.signIn(await response.json())

        return
      }

      if (response.status === 401) {
        this.props.expiredToken()

        return
      }

      console.info(response)
      throw new Error('Could not get user status')
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  handleJoinFoPCC = async (event) => {
    event.preventDefault()

    const scriptId = 'stripe.js'

    if (!document.getElementById(scriptId)) {
      await new Promise(resolve => {
        const script = document.createElement('script')
        script.id = scriptId
        script.src = 'https://js.stripe.com/v3/'
        script.type = 'text/javascript'
        script.async = false
        script.onload = () => {
          resolve()
        }
        document.getElementsByTagName('head')[0].appendChild(script)
      })
    }

    try {
      this.setState({
        loading: true
      })

      const response = await global.fetch(config.lambda.fopccJoin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.props.token
        },
        body: JSON.stringify({})
      })

      if (response.status === 200) {
        const stripe = new window.Stripe(config.stripe.publishableKey)
        await stripe.redirectToCheckout(await response.json())

        return
      }

      if (response.status === 401) {
        this.props.expiredToken()

        return
      }

      throw new Error(response.statusText)
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  handleCancelFoPCC = async (event) => {
    event.preventDefault()

    try {
      this.setState({
        loading: true,
        confirmationModalOpen: false
      })

      const response = await global.fetch(config.lambda.fopccLeave, {
        method: 'DELETE',
        headers: {
          Authorization: this.props.token
        }
      })

      if (response.status === 200) {
        this.props.signIn(await response.json())

        return
      }

      if (response.status === 401) {
        this.props.expiredToken()

        return
      }

      console.info(response)
      throw new Error('Could not get user status')
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  handleShowModal = () => {
    this.setState({
      confirmationModalOpen: true
    })
  }

  handleDismissModal = () => {
    this.setState({
      confirmationModalOpen: false
    })
  }

  render () {
    const {
      fopcc
    } = this.props
    const {
      loading,
      confirmationModalOpen
    } = this.state

    if (loading) {
      return (
        <>
          <Info>Loading</Info>
          <Spinner />
        </>
      )
    }

    if (!fopcc) {
      return (
        <>
          <p>You are not yet a Friend of PCC.</p>
          <GreenButton onClick={this.handleJoinFoPCC}>Become a Friend of PCC</GreenButton>
          <Note>If you have recently become a Friend you may need to reload this page to see the status change.</Note>
        </>
      )
    }

    if (fopcc.bc) {
      if (fopcc.expires < Date.now()) {
        return (
          <>
            <p>Your British Cycling-managed Friends of PCC membership has expired.</p>
            <GreenButton onClick={this.handleJoinFoPCC}>Become a Friend of PCC</GreenButton>
          </>
        )
      } else {
        return (
          <>
            <p>You have a valid Friends of PCC membership managed by British Cycling.</p>
            <p>It expires on {formatDate(fopcc.expires)} but will not renew automatically, please check back here on that date.</p>
          </>
        )
      }
    }

    const STATUSES = {
      pending: (
        <>
          <p>Your Friend of PCC subscription has been initiated and we are awaiting a response from the payment provider.</p>
        </>
      ),
      'pending-payment': (
        <>
          <p>Your Friend of PCC subscription has been set up and the first payment is pending.</p>
          <p>Please reload this page to see if the status has changed.</p>
        </>
      ),
      active: (
        <>
          <p>You are a Friend of PCC, your membership will renew on {formatDate(fopcc.renews)} using the card ending in {fopcc.last4}.</p>
          <RedButton onClick={this.handleShowModal}>Cancel your membership</RedButton>
        </>
      ),
      'payment-failed': (
        <>
          <p>Your Friend of PCC membership failed to renew on {formatDate(fopcc.renews)} as there was a problem collecting payment from the card ending in {fopcc.last4}.</p>
          <GreenButton onClick={this.handleJoinFoPCC}>Update payment details</GreenButton>
          <RedButton onClick={this.handleShowModal}>Cancel your membership</RedButton>
        </>
      ),
      cancelling: (
        <>
          <p>Your Friend of PCC subscription is being cancelled.</p>
          <p>Please reload this page to see if the status has changed.</p>
        </>
      ),
      cancelled: (
        <>
          <p>Your Friends of PCC membership has been cancelled and no further subscription payments will be collected.</p>
          <p>We're sorry to see you go, please know you can rejoin at any time!</p>
          <GreenButton onClick={this.handleJoinFoPCC}>Become a Friend of PCC</GreenButton>
        </>
      )
    }

    if (!STATUSES[fopcc.status]) {
      console.info('wat', fopcc)
    }

    return (
      <>
        {confirmationModalOpen && (
          <Modal
            title='Please confirm'
            width={500}
            height={180}
            onClose={this.handleDismissModal}
          >
            <p>Really cancel your Friends of PCC membership?</p>
            <ButtonWrapper>
              <Button
                data-button='dismiss'
                onClick={this.handleDismissModal}
              ><FaTimes /> Back
              </Button>
              <Button
                data-button='continue-shopping'
                onClick={this.handleCancelFoPCC}
              ><FaCheck /> Please cancel my membership
              </Button>
            </ButtonWrapper>
          </Modal>
        )}
        {STATUSES[fopcc.status]}
      </>
    )
  }
}

function formatDate (date) {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
}

const mapStateToProps = ({ session: { token }, user: { fopcc } }) => ({
  fopcc,
  token
})

const mapDispatchToProps = {
  expiredToken,
  signIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Fopcc)
