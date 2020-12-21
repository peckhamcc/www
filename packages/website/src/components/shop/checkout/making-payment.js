import React, {
  Component
} from 'react'
import {
  Spinner
} from '../../panels'
import {
  connect
} from 'react-redux'
import {
  clearCart,
  expiredToken
} from '../../../store/actions'
import {
  config
} from '@peckhamcc/config'

class MakingPayment extends Component {
  async componentDidMount () {
    try {
      const response = await global.fetch(config.lambda.shopPaymentsCreate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.props.token
        },
        body: JSON.stringify({
          paymentNonce: this.props.paymentNonce,
          orderId: this.props.orderId,
          idempotencyKey: this.props.idempotencyKey
        })
      })

      if (response.status === 401) {
        this.props.expiredToken()
        return
      }

      if (response.status !== 200) {
        throw new Error(response.statusText)
      }

      const errors = await response.json()

      if (errors.length) {
        // something went wrong with card verification
        const err = new Error('Payment failed')
        err.errors = errors

        throw err
      } else {
        this.props.clearCart()
        this.props.onSuccess()
      }
    } catch (err) {
      this.props.onError(err)
    }
  }

  render () {
    return (
      <Spinner />
    )
  }
}

const mapStateToProps = ({ shop: { cart, categories }, session: { token }, user }) => ({
  cart,
  token,
  user,
  categories
})

const mapDispatchToProps = {
  clearCart,
  expiredToken
}

export default connect(mapStateToProps, mapDispatchToProps)(MakingPayment)
