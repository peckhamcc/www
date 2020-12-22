import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  expiredToken
} from '../../store/actions'
import {
  Spinner
} from '../panels'
import {
  config
} from '@peckhamcc/config'

class Checkout extends Component {
  async componentDidMount () {
    const scriptId = 'stripe.js'

    if (document.getElementById(scriptId)) {
      await this._createSession()
    } else {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://js.stripe.com/v3/'
      script.type = 'text/javascript'
      script.async = false
      script.onload = () => {
        this._createSession().catch(err => console.error(err))
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    }
  }

  async _createSession () {
    const {
      cart
    } = this.props

    try {
      const response = await global.fetch(config.lambda.shopOrdersCreate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.props.token
        },
        body: JSON.stringify(cart)
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
    }
  }

  render () {
    return (
      <Spinner />
    )
  }
}

const mapStateToProps = ({ shop: { cart }, session: { token }, user }) => ({
  cart,
  token,
  user
})

const mapDispatchToProps = {
  expiredToken
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
