import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Break, PageWrapper, Panel, ShopListItem, Breadcrumb, SmallTextButton, Button, Quantity, Price } from '../components/panels'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  light,
  lightAccent,
  dark,
  darkLowlight,
  errorBackground,
  errorText
} from '../colours'
import config from '../config'
import { spacing } from '../units'
import { 
  clearCart
} from '../store/actions'
import Isemail from 'isemail'

const Label = styled.label`
  display: block;
  margin-bottom: ${spacing(1)};
`

const Input = styled.input`
  display: block;
  padding: 5px;
  margin-bottom: ${spacing(1)};
  width: 300px;
  font-size: 18px;
`

const CheckoutWrapper = styled.div`

  .braintree-heading {
    color: ${light};
  }
`

const TransactionId = styled.p`
  display: inline-block;
  background-color: ${light};
  color: ${darkLowlight};
  border: 5px solid ${darkLowlight};
  padding: ${spacing(1)};
  font-size: 24px;
`

const FormInputWrapper = styled.div`
  ${props => props.error ? `
    label {
      color: ${errorText};
    }

    input {
      border: 1px solid ${errorText};
      color: ${errorText};
      background: ${errorBackground};
    }
  ` : ''}
`

const ErrorText = styled.p`
  color: ${errorText};
`

const PaymentHolder = styled.div`
  margin: ${spacing(1)} 0;
`

class Checkout extends Component {

  constructor (props) {
    super(props)

    const amount = props.cart.reduce((acc, item) => {
      const product = config.store.products.find(product => product.sku === item.sku)

      return acc + (product.price * item.quantity)
    }, 0)

    this.state = {
      canMakePayment: false,
      loadingToken: true,
      makingPayment: false,
      transactionId: null,
      paymentFailure: false,
      firstName: '',
      lastName: '',
      email: '',
      errors: {}
    }
  }

  componentDidMount () {
    if (!this.props.cart.length) {
      return
    }

    fetch(config.lambda.clientToken, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(result => {
        braintree.dropin.create({
          authorization: result.clientToken,
          container: this.paymentHolder,
          paypal: {
            flow: 'checkout'
          }
        }, (error, instance) => {
          if (error) {
            return console.error(error)
          }

          this.paymentProvider = instance

          this.setState({
            loadingToken: false
          })
        })
      })
      .catch(error => console.error(error))
  }

  requestPaymentMethod = () => {
    if (!this.paymentProvider) {
      return
    }

    const errors = {}

    if (!this.state.firstName.trim()) {
      errors['firstName'] = true
    }

    if (!this.state.lastName.trim()) {
      errors['lastName'] = true
    }

    if (!Isemail.validate(this.state.email)) {
      errors['email'] = true
    }

    this.setState({
      errors: errors
    })

    if (Object.keys(errors).length) {
      return
    }

    this.setState({
      makingPayment: true
    })

    this.paymentProvider.requestPaymentMethod((error, payload) => {
      if (error) {
        this.setState({
          errors: Object.assign({}, this.state.errors, {
            payment: true
          }),
          makingPayment: false
        })

        return console.error(error)
      }

      fetch(config.lambda.sendPayment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: this.state.firstName.trim(),
          lastName: this.state.lastName.trim(),
          email: this.state.email.trim(),
          nonce: payload.nonce,
          items: this.props.cart
        })
      })
        .then(response => response.json())
        .then(result => {
          console.info('payment result', result)

          if (result.errors) {
            this.setState({
              paymentFailure: true,
              makingPayment: false
            })

            return
          }

          this.setState({
            transactionId: result.transaction,
            makingPayment: false
          })

          this.props.clearCart()
        })
        .catch(error => {
          this.setState({
            paymentFailure: true,
            makingPayment: false
          })

          console.error('payment error', error)
        })
    })
  }

  formFieldChanged = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })

    if (event.target.name === 'firstName' && event.target.value.trim()) {
      this.setState({
        errors: Object.assign({}, this.state.errors, {
          firstName: false
        })
      })
    }

    if (event.target.name === 'lastName' && event.target.value.trim()) {
      this.setState({
        errors: Object.assign({}, this.state.errors, {
          lastName: false
        })
      })
    }

    if (event.target.name === 'email' && Isemail.validate(event.target.value)) {
      this.setState({
        errors: Object.assign({}, this.state.errors, {
          email: false
        })
      })
    }
  }

  render () {
    const { cart } = this.props
    const { loadingToken, makingPayment, transactionId, paymentFailure } = this.state

    if (transactionId) {
      return (
        <CheckoutWrapper>
          <h2>Payment complete</h2>
          <p>The transaction was processed successfully.  A confirmation email should soon arrive in your inbox.</p>
          <p>This is your transaction ID, please keep a note of it:</p>
          <TransactionId>{transactionId}</TransactionId>
          <h3>What's next?</h3>
          <p>Your order will be submitted to the factory soon.  We'll be in touch with the delivery date once we have it.</p>
        </CheckoutWrapper>
      )
    }

    if (paymentFailure) {
      return (
        <CheckoutWrapper>
          <h2>Payment failure</h2>
          <p>Your payment failed to go through.</p>
          <p>It has been logged and will be investigated.</p>
          <p>Sorry about that.</p>
        </CheckoutWrapper>
      )
    }

    if (!cart.length) {
      return (
        <p>There's nothing in your cart. Try visiting the <Link to='/shop'>shop</Link>?</p>
      )
    }

    return (
      <CheckoutWrapper>
        <h3>Your details:</h3>
        <FormInputWrapper error={this.state.errors['firstName']}>
          <Label for='firstName'>First name {this.state.errors['firstName'] && 'is required'}</Label>
          <Input name='firstName' type='text' onChange={this.formFieldChanged} value={this.state.firstName} />
        </FormInputWrapper>
        <FormInputWrapper error={this.state.errors['lastName']}>
          <Label for='lastName'>Last name {this.state.errors['lastName'] && 'is required'}</Label>
          <Input name='lastName' type='text' onChange={this.formFieldChanged} value={this.state.lastName} />
        </FormInputWrapper>
        <FormInputWrapper error={this.state.errors['email']}>
          <Label for='email'>Email {this.state.errors['email'] && 'must be a valid email'}</Label>
          <Input name='email' type='email' onChange={this.formFieldChanged} value={this.state.email} />
        </FormInputWrapper>
        <h3>Payment method:</h3>
        {loadingToken && <p>Loading payment methods...</p>}
        {this.state.errors['payment'] && <ErrorText>Your payment method was invalid, please try again.</ErrorText>}
        <PaymentHolder>
          <div ref={ref => this.paymentHolder = ref}></div>
        </PaymentHolder>
        {!loadingToken && <Button onClick={this.requestPaymentMethod} disabled={makingPayment}>Submit payment</Button>}
      </CheckoutWrapper>
    )
  }
}

Checkout.propTypes = {
  cart: PropTypes.array.isRequired,
  user: PropTypes.object
}

const mapStateToProps = ({ shop: { cart }, user: { user } }) => ({
  cart,
  user
})

const mapDispatchToProps = {
  clearCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
