import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  withRouter
} from 'react-router-dom'
import {
  expiredToken
} from '../../store/actions'
import {
  Spinner,
  Info
} from '../panels'
import {
  config
} from '@peckhamcc/config'

class Checkout extends Component {
  state = {

  }

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

    if (!cart.length) {
      this.props.history.push('/basket')

      return
    }

    try {
      const response = await globalThis.fetch(config.lambda.shopOrdersCreate, {
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
      this.setState({
        error
      })

      console.error(error)
    }
  }

  render () {
    const {
      error
    } = this.state

    if (error) {
      return (
        <>
          <p>An error occurred, sorry it didn't work out :(</p>
          <p>Maybe try again later?</p>
        </>
      )
    }

    return (
      <>
        <Info>Redirecting you to Stripe for payment</Info>
        <Spinner />
      </>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout))
