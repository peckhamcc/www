import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  clearCart,
  expiredToken
} from '../../store/actions'
import {
  TransactionId
} from '../forms'
import {
  Spinner
} from '../panels'
import EnterDetails from './checkout/enter-details'
import ChoosePayment from './checkout/choose-payment'
import MakingPayment from './checkout/making-payment'
import {
  config
} from '@peckhamcc/config'

const STEPS = {
  LOADING: 'LOADING',
  ENTER_DETAILS: 'ENTER_DETAILS',
  CREATE_ORDER: 'CREATE_ORDER',
  CHOOSE_PAYMENT_METHOD: 'CHOOSE_PAYMENT_METHOD',
  SUBMITTING_PAYMENT: 'SUBMITTING_PAYMENT',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

class DisplayError extends Component {
  render () {
    const {
      error
    } = this.props

    console.error(error)

    let message = (
      <p>{error.message}</p>
    )

    if (error.errors) {
      // card payments can result in multiple errors
      message = error.errors.map(({ code, detail, category }) => (
        <p key={code}>{category}<br />{code}<br />{detail}</p>
      ))
    }

    return (
      <div>
        <p>Oops, something went wrong. Your card has not been charged, please try again later.</p>
        {message}
      </div>
    )
  }
}

class DisplaySuccess extends Component {
  render () {
    return (
      <div data-result='payment-success'>
        <h2>Payment complete</h2>
        <p>The transaction was processed successfully.  A confirmation email should soon arrive in your inbox.</p>
        <p>This is your order ID, please keep a note of it:</p>
        <TransactionId data-order-id>{this.props.orderId}</TransactionId>
        <h3>What's next?</h3>
        <p>Your order will be submitted to the factory in the next batch. We'll be in touch with the delivery date once we have it.</p>
      </div>
    )
  }
}

class Checkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      step: STEPS.LOADING,
      error: null
    }
  }

  componentDidMount () {
    const scriptId = 'sqPaymentScript'

    if (document.getElementById(scriptId)) {
      this.setState({
        step: STEPS.ENTER_DETAILS
      })
    } else {
      const sqPaymentScript = document.createElement('script')
      sqPaymentScript.id = scriptId
      sqPaymentScript.src = `https://js.squareup${config.square.environment === 'sandbox' ? 'sandbox' : ''}.com/v2/paymentform`
      sqPaymentScript.type = 'text/javascript'
      sqPaymentScript.async = false
      sqPaymentScript.onload = () => {
        this.setState({
          step: STEPS.ENTER_DETAILS
        })
      }
      document.getElementsByTagName('head')[0].appendChild(sqPaymentScript)
    }
  }

  handleOrderCreated = ({ orderId, idempotencyKey, amount }) => {
    this.setState({
      orderId,
      idempotencyKey,
      amount,
      step: STEPS.CHOOSE_PAYMENT_METHOD
    })
  }

  handlePaymentNonce = (paymentNonce) => {
    this.setState({
      paymentNonce,
      step: STEPS.SUBMITTING_PAYMENT
    })
  }

  handleOrderComplete = () => {
    this.setState({
      step: STEPS.SUCCESS
    })
  }

  handleError = (error) => {
    this.setState({
      error,
      step: STEPS.ERROR
    })
  }

  render () {
    const {
      step,
      error,
      paymentNonce,
      orderId,
      idempotencyKey,
      amount
    } = this.state

    const steps = {
      [STEPS.LOADING]: <Spinner />,
      [STEPS.ENTER_DETAILS]: (
        <EnterDetails
          onSuccess={this.handleOrderCreated}
          onError={this.handleError}
        />
      ),
      [STEPS.CHOOSE_PAYMENT_METHOD]: (
        <ChoosePayment
          amount={amount}
          onSuccess={this.handlePaymentNonce}
          onError={this.handleError}
        />
      ),
      [STEPS.SUBMITTING_PAYMENT]: (
        <MakingPayment
          paymentNonce={paymentNonce}
          orderId={orderId}
          idempotencyKey={idempotencyKey}
          onSuccess={this.handleOrderComplete}
          onError={this.handleError}
        />
      ),
      [STEPS.SUCCESS]: <DisplaySuccess orderId={orderId} />,
      [STEPS.ERROR]: <DisplayError error={error} />
    }

    if (steps[step]) {
      return steps[step]
    }

    return steps[STEPS.ERROR]
  }
}

const mapStateToProps = ({ shop: { cart }, session: { token }, user }) => ({
  cart,
  token,
  user
})

const mapDispatchToProps = {
  clearCart,
  expiredToken
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
