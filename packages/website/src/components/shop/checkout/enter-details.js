import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
import {
  Spinner
} from '../../panels'
import {
  GreenButton,
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
} from '../../forms'
import Isemail from 'isemail'
import {
  connect
} from 'react-redux'
import {
  updateUser,
  expiredToken
} from '../../../store/actions'

import {
  config
} from '@peckhamcc/config'

const STEPS = {
  LOADING: 'LOADING',
  ENTER_DETAILS: 'ENTER_DETAILS'
}

class EnterDetails extends Component {
  constructor (props) {
    super(props)

    const {
      firstName,
      lastName,
      email,
      telephone,
      address1,
      address2,
      address3,
      postCode,
      shopCode
    } = props.user || {}

    this.state = {
      values: {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        telephone: telephone || '',
        address1: address1 || '',
        address2: address2 || '',
        address3: address3 || '',
        postCode: postCode || '',
        shopCode: shopCode || ''
      },
      errors: {},
      step: STEPS.ENTER_DETAILS
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
      'telephone',
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

  handleNext = async () => {
    this.validate(this.state)

    if (Object.keys(this.state.errors).length) {
      return
    }

    this.setState({
      step: STEPS.LOADING
    })

    try {
      const response = await global.fetch(config.lambda.shopOrdersCreate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.props.token
        },
        body: JSON.stringify({
          user: {
            firstName: this.state.values.firstName,
            lastName: this.state.values.lastName,
            email: this.state.values.email,
            telephone: this.state.values.telephone,
            address1: this.state.values.address1,
            address2: this.state.values.address2,
            address3: this.state.values.address3,
            postCode: this.state.values.postCode
          },
          shopCode: this.state.values.shopCode,
          items: this.props.cart.map(item => ({
            id: this.props.products[item.sku].id,
            quantity: item.quantity
          }))
        })
      })

      if (response.status === 200) {
        const {
          idempotencyKey,
          orderId,
          amount,
          user
        } = await response.json()

        this.props.updateUser(user)
        this.props.onSuccess({
          idempotencyKey,
          orderId,
          amount
        })

        return
      }

      if (response.status === 401) {
        this.props.expiredToken()

        return
      }

      if (response.status === 422) {
        const body = await response.json()
        let field = body.field

        if (field.includes('.')) {
          field = field.split('.').pop()
        }

        this.setState({
          step: STEPS.ENTER_DETAILS,
          errors: {
            [field]: true
          }
        })

        return
      }

      throw new Error(response.statusText)
    } catch (error) {
      this.props.onError(error)
    }
  }

  render () {
    const {
      error
    } = this.props
    const {
      step
    } = this.state

    console.info(this.state)

    const errors = {
      firstName: 'First name is required',
      lastName: 'Last name is required',
      email: 'Email is invalid',
      telephone: 'Telephone is invalid',
      address1: 'Address is required',
      postCode: 'Post code is required',
      shopCode: 'Shop code is invalid',
      items: 'Your basket is empty'
    }

    if (step === STEPS.LOADING) {
      return (
        <Spinner />
      )
    }

    return (
      <CheckoutWrapper>
        <DetailsWrapper>
          <NameWrapper>
            <h3>Name</h3>
            <FormInputWrapper error={this.state.errors.firstName}>
              <Label htmlFor='firstName'>First name {this.state.errors.firstName && 'is invalid'}</Label>
              <Input
                name='firstName'
                type='text'
                onChange={this.formFieldChanged('firstName')}
                value={this.state.values.firstName}
                data-input='first-name'
              />
            </FormInputWrapper>
            <FormInputWrapper error={this.state.errors.lastName}>
              <Label htmlFor='lastName'>Last name {this.state.errors.lastName && 'is invalid'}</Label>
              <Input
                name='lastName'
                type='text'
                onChange={this.formFieldChanged('lastName')}
                value={this.state.values.lastName}
                data-input='last-name'
              />
            </FormInputWrapper>
            <FormInputWrapper error={this.state.errors.email}>
              <Label htmlFor='email'>Email {this.state.errors.email && 'is invalid'}</Label>
              <Input
                name='email'
                type='email'
                onChange={this.formFieldChanged('email')}
                value={this.state.values.email}
                data-input='email'
              />
            </FormInputWrapper>
            <FormInputWrapper error={this.state.errors.email}>
              <Label htmlFor='telephone'>Telephone {this.state.errors.telephone && 'is invalid'}</Label>
              <Input
                name='telephone'
                type='text'
                onChange={this.formFieldChanged('telephone')}
                value={this.state.values.telephone}
                data-input='telephone'
              />
            </FormInputWrapper>
          </NameWrapper>
          <AddressWrapper>
            <h3>Address</h3>
            <FormInputWrapper error={this.state.errors.address1}>
              <Label htmlFor='address1'>Street {this.state.errors.address1 && 'is invalid'}</Label>
              <Input
                name='address1'
                type='text'
                onChange={this.formFieldChanged('address1')}
                value={this.state.values.address1}
                data-input='address1'
              />
            </FormInputWrapper>
            <FormInputWrapper error={this.state.errors.address2}>
              <Label htmlFor='address2'>Town {this.state.errors.address2 && 'is invalid'}</Label>
              <Input
                name='address2'
                type='text'
                onChange={this.formFieldChanged('address2')}
                value={this.state.values.address2}
                data-input='address2'
              />
            </FormInputWrapper>
            <FormInputWrapper error={this.state.errors.address3}>
              <Label htmlFor='address3'>County {this.state.errors.address3 && 'is invalid'}</Label>
              <Input
                name='address3'
                type='text'
                onChange={this.formFieldChanged('address3')}
                value={this.state.values.address3}
                data-input='address3'
              />
            </FormInputWrapper>
            <FormInputWrapper error={this.state.errors.postCode}>
              <Label htmlFor='postCode'>Post code {this.state.errors.postCode && 'is invalid'}</Label>
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
            <Label htmlFor='shopCode'>Shop code {this.state.errors.shopCode && 'is invalid'}</Label>
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

        <GreenButton
          onClick={this.handleNext}
          disabled={Object.keys(this.state.errors).length}
          data-button='choose-payment-method'
        >Choose payment method
        </GreenButton>
      </CheckoutWrapper>
    )
  }
}

const mapStateToProps = ({ user, session: { token }, shop: { cart, categories, products } }) => ({
  user,
  token,
  cart,
  categories,
  products
})

const mapDispatchToProps = {
  updateUser,
  expiredToken
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterDetails)
