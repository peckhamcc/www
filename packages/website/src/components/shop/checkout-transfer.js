import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Button
} from '../panels'
import {
  connect
} from 'react-redux'
import config from '../../config'
import {
  clearCart
} from '../../store/actions'
import Isemail from 'isemail'
import {
  Label,
  Input,
  CheckoutWrapper,
  FormInputWrapper,
  DetailsWrapper,
  NameWrapper,
  AddressWrapper,
  ErrorText,
  ShopCodeWrapper,
  HelpText
} from '../forms'

const STEPS = {
  ENTER_DETAILS: 'ENTER_DETAILS',
  SUBMITTING_PAYMENT: 'SUBMITTING_PAYMENT',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

class DisplayError extends Component {
  render () {
    return (
      <div>
        <p>Something went wrong, please try again later</p>
        <p>{this.props.error.message}</p>
      </div>
    )
  }
}

class MakingPayment extends Component {
  render () {
    return (
      <div>
        <p>Submitting details, hold on...</p>
      </div>
    )
  }
}

class DisplaySuccess extends Component {
  render () {
    return (
      <div data-result='payment-success'>
        <h2>Almost there</h2>
        <p>You have been sent an email with details of how to pay for your order, it should arrive shortly.</p>
        <p>Your order is not complete until payment is received.</p>
        <p>Please <Link to='/contact'>contact us</Link> if you have any questions.</p>
      </div>
    )
  }
}

class EnterDetails extends Component {
  constructor (props) {
    super(props)

    const {
      firstName,
      lastName,
      email,
      address1,
      address2,
      address3,
      postCode,
      shopCode
    } = props.customerDetails || {}

    this.state = {
      values: {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        address1: address1 || '',
        address2: address2 || '',
        address3: address3 || '',
        postCode: postCode || '',
        shopCode: shopCode || ''
      },
      errors: {}
    }

    if (props.error) {
      this.state[props.error] = true
    }
  }

  formFieldChanged = (name) => {
    return (event) => {
      const state = {
        values: Object.assign({}, this.state.values, {
          [name]: event.target.value
        }),
        errors: this.state.errors
      }

      this.validate(state)
    }
  }

  validate = (state) => {
    const required = [
      'firstName',
      'lastName',
      'email',
      'address1',
      'postCode',
      'shopCode'
    ]

    required.forEach(key => {
      delete state.errors[key]

      if (!state.values[key] || !state.values[key].trim()) {
        state.errors[key] = true
      }
    })

    if (!Isemail.validate(state.values.email)) {
      state.errors.email = true
    }

    this.setState(state)
  }

  handleNext = () => {
    this.validate(this.state)

    if (Object.keys(this.state.errors).length) {
      return
    }

    this.props.onDetails({
      firstName: this.state.values.firstName,
      lastName: this.state.values.lastName,
      email: this.state.values.email,
      address1: this.state.values.address1,
      address2: this.state.values.address2,
      address3: this.state.values.address3,
      postCode: this.state.values.postCode,
      shopCode: this.state.values.shopCode
    })
  }

  render () {
    const {
      error
    } = this.props

    const errors = {
      firstName: 'First name is required',
      lastName: 'Last name is required',
      email: 'Email is invalid',
      address1: 'Address is required',
      postCode: 'Post code is required',
      shopCode: 'Shop code is invalid',
      items: 'Your basket is empty'
    }

    return (
      <CheckoutWrapper>
        <DetailsWrapper>
          <NameWrapper>
            <h3>Name</h3>
            <FormInputWrapper error={this.state.errors.firstName}>
              <Label htmlFor='firstName'>First name {this.state.errors.firstName && 'is required'}</Label>
              <Input
                name='firstName'
                type='text'
                onChange={this.formFieldChanged('firstName')}
                value={this.state.values.firstName}
                data-input='first-name'
              />
            </FormInputWrapper>
            <FormInputWrapper error={this.state.errors.lastName}>
              <Label htmlFor='lastName'>Last name {this.state.errors.lastName && 'is required'}</Label>
              <Input
                name='lastName'
                type='text'
                onChange={this.formFieldChanged('lastName')}
                value={this.state.values.lastName}
                data-input='last-name'
              />
            </FormInputWrapper>
            <FormInputWrapper error={this.state.errors.email}>
              <Label htmlFor='email'>Email {this.state.errors.email && 'must be a valid email'}</Label>
              <Input
                name='email'
                type='email'
                onChange={this.formFieldChanged('email')}
                value={this.state.values.email}
                data-input='email'
              />
            </FormInputWrapper>
            <HelpText>We ask for your details for transactional purposes only.</HelpText>
          </NameWrapper>
          <AddressWrapper>
            <h3>Address</h3>
            <FormInputWrapper error={this.state.errors.address1}>
              <Label htmlFor='address1'>Street {this.state.errors.address1 && 'is required'}</Label>
              <Input
                name='address1'
                type='text'
                onChange={this.formFieldChanged('address1')}
                value={this.state.values.address1}
                data-input='address1'
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <Label htmlFor='address2'>Town</Label>
              <Input
                name='address2'
                type='text'
                onChange={this.formFieldChanged('address2')}
                value={this.state.values.address2}
                data-input='address2'
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <Label htmlFor='address3'>County</Label>
              <Input
                name='address3'
                type='text'
                onChange={this.formFieldChanged('address3')}
                value={this.state.values.address3}
                data-input='address3'
              />
            </FormInputWrapper>
            <FormInputWrapper error={this.state.errors.postCode}>
              <Label htmlFor='postCode'>Post code {this.state.errors.postCode && 'is required'}</Label>
              <Input
                name='postCode'
                type='text'
                onChange={this.formFieldChanged('postCode')}
                value={this.state.values.postCode}
                data-input='postCode'
              />
            </FormInputWrapper>
          </AddressWrapper>
        </DetailsWrapper>

        <ShopCodeWrapper>
          <FormInputWrapper error={this.state.errors.shopCode}>
            <Label htmlFor='shopCode'>Shop code {this.state.errors.postCode && 'is required'}</Label>
            <Input
              name='shopCode'
              type='text'
              onChange={this.formFieldChanged('shopCode')}
              value={this.state.values.shopCode}
              data-input='shopCode'
            />
            <HelpText>If you do not know what the shop code is, please <Link to='/contact'>contact us</Link> or ask in the WhatsApp group.</HelpText>
          </FormInputWrapper>
        </ShopCodeWrapper>

        {error && <ErrorText>{errors[error]}</ErrorText>}

        <Button
          onClick={this.handleNext}
          disabled={Object.keys(this.state.errors).length}
          data-button='submit-order'
        >Submit order
        </Button>
      </CheckoutWrapper>
    )
  }
}

class Checkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      step: STEPS.ENTER_DETAILS,
      error: null
    }
  }

  handleCustomerDetails = (customerDetails) => {
    this.setState({
      customerDetails,
      step: STEPS.SUBMITTING_PAYMENT
    })

    global.fetch(config.lambda.sendPayment, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: customerDetails.firstName.trim(),
        lastName: customerDetails.lastName.trim(),
        email: customerDetails.email.trim(),
        address1: customerDetails.address1.trim(),
        address2: customerDetails.address2.trim(),
        address3: customerDetails.address3.trim(),
        postCode: customerDetails.postCode.trim(),
        shopCode: customerDetails.shopCode.trim(),
        items: this.props.cart
      })
    })
      .then(response => {
        if (response.status === 204) {
          this.setState({
            step: STEPS.SUCCESS
          })

          this.props.clearCart()

          return
        }

        if (response.status === 422) {
          return response.json()
            .then(body => {
              this.setState({
                step: STEPS.ENTER_DETAILS,
                error: body.field
              })
            })
        }

        throw new Error(response.statusText)
      })
      .catch(error => {
        this.setState({
          step: STEPS.ERROR,
          error
        })

        console.error('payment error', error)
      })
  }

  onError = (error) => {
    this.setState({
      error,
      step: STEPS.ERROR
    })
  }

  render () {
    const {
      step,
      error,
      transactionId,
      customerDetails
    } = this.state

    const steps = {
      [STEPS.ENTER_DETAILS]: (
        <EnterDetails
          onDetails={this.handleCustomerDetails}
          customerDetails={customerDetails}
          error={error}
        />
      ),
      [STEPS.SUBMITTING_PAYMENT]: <MakingPayment />,
      [STEPS.SUCCESS]: <DisplaySuccess transactionId={transactionId} />,
      [STEPS.ERROR]: <DisplayError error={error} />
    }

    if (steps[step]) {
      return steps[step]
    }

    return steps[STEPS.ERROR]
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
