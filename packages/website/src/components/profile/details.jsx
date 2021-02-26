import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import styled from 'styled-components'
import {
  Button,
  Spinner,
  Info
} from '../panels'
import {
  expiredToken,
  signIn
} from '../../store/actions'
import {
  Input,
  FormInputWrapper,
  GreenButton,
  BlueButton
} from '../forms'
import {
  config
} from '@peckhamcc/config'

const Form = styled.form`
  margin-top: 20px;
`

const STEPS = {
  ENTER_DETAILS: 'ENTER_DETAILS',
  SAVING_DETAILS: 'SAVING_DETAILS',
  DONE: 'DONE',
  ERROR: 'ERROR'
}

class Details extends Component {
  state = {
    step: STEPS.DONE,
    name: '',
    phone: '',
    email: '',
    error: null
  }

  handleEditDetails = () => {
    this.setState({
      step: STEPS.ENTER_DETAILS,
      name: this.props.user.name,
      email: this.props.user.email,
      phone: this.props.user.phone
    })
  }

  handleCancelEditDetails = () => {
    this.setState({
      step: STEPS.DONE,
      name: this.props.user.name,
      email: this.props.user.email,
      phone: this.props.user.phone
    })
  }

  handleDetailChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  handleUpdateDetails = async (event) => {
    event.preventDefault()

    this.setState({
      step: STEPS.SAVING_DETAILS
    })

    try {
      const response = await globalThis.fetch(config.lambda.accountUserUpdate, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.props.token
        },
        body: JSON.stringify({
          name: this.state.name,
          phone: this.state.phone,
          email: this.state.email
        })
      })

      if (response.status === 200) {
        this.props.signIn(await response.json())

        this.setState({
          step: STEPS.DONE
        })

        return
      }

      if (response.status === 401) {
        this.props.expiredToken()

        this.setState({
          step: STEPS.ENTER_EMAIL
        })

        return
      }

      if (response.status === 422) {
        const body = await response.json()

        this.setState({
          step: STEPS.ENTER_DETAILS,
          error: body.field
        })

        return
      }

      throw new Error(response.statusText)
    } catch (error) {
      this.setState({
        step: STEPS.ERROR,
        error
      })

      console.error(error)
    }
  }

  render () {
    const {
      step
    } = this.state

    if (step === STEPS.ENTER_DETAILS) {
      return (
        <>
          <Form onSubmit={this.handleUpdateDetails}>
            <FormInputWrapper error={this.state.error === 'name'}>
              <Input
                name='name'
                type='text'
                onChange={(event) => this.handleDetailChange('name', event.target.value)}
                value={this.state.name}
                data-input='name'
                placeholder='Your name'
                required
              />
            </FormInputWrapper>
            <FormInputWrapper error={this.state.error === 'email'}>
              <Input
                name='email'
                type='email'
                onChange={(event) => this.handleDetailChange('email', event.target.value)}
                value={this.state.email}
                data-input='email'
                placeholder='Your email'
                required
              />
            </FormInputWrapper>
            <FormInputWrapper error={this.state.error === 'phone'}>
              <Input
                name='phone'
                type='tel'
                onChange={(event) => this.handleDetailChange('phone', event.target.value)}
                value={this.state.phone}
                data-input='phone'
                placeholder='Your phone number'
                required
              />
            </FormInputWrapper>

            <GreenButton
              disabled={Boolean(this.state.error)}
              data-button='update-details'
            >Save
            </GreenButton>
            <BlueButton
              onClick={this.handleCancelEditDetails}
              data-button='update-details'
            >Cancel
            </BlueButton>
          </Form>
        </>
      )
    } else if (step === STEPS.SAVING_DETAILS) {
      return (
        <>
          <Info>Saving your details</Info>
          <Spinner />
        </>
      )
    } else if (step === STEPS.DONE) {
      return (
        <>
          <p>Name: {this.props.user.name}</p>
          <p>Email: {this.props.user.email}</p>
          <p>Phone: {this.props.user.phone}</p>
          <Button
            onClick={this.handleEditDetails}
            data-button='update-details'
          >Update details
          </Button>
        </>
      )
    }

    return (
      <>
        <p>An error occurred, sorry it didn't work out :(</p>
        <p>Maybe try again later?</p>
      </>
    )
  }
}

const mapStateToProps = ({ user, session: { token } }) => ({
  user,
  token
})

const mapDispatchToProps = {
  signIn,
  expiredToken
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
