import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Spinner,
  CentredPanel
} from './panels'
import styled from 'styled-components'
import {
  connect
} from 'react-redux'
import {
  signIn,
  setToken,
  expiredToken
} from '../store/actions'
import config from '../config'
import {
  Input,
  FormInputWrapper
} from './forms'
import clubLogo from '../../assets/pcc-logo-round.png'

const Form = styled.form`
  margin-top: 20px;
`

const STEPS = {
  ENTER_NAME: 'ENTER_NAME',
  SAVING_NAME: 'SAVING_NAME',
  DONE: 'DONE',
  ERROR: 'ERROR'
}

class WithUserName extends Component {
  state = {
    step: STEPS.ENTER_NAME,
    firstName: '',
    lastName: '',
    errors: {

    }
  }

  static getDerivedStateFromProps (props, state) {
    if (props.user.firstName && props.user.lastName) {
      state.step = STEPS.DONE
    } else {
      state.step = STEPS.ENTER_NAME
      state.firstName = props.user.firstName || state.firstName || ''
      state.lastName = props.user.lastName || state.lastName || ''
    }

    return state
  }

  handleNameChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  handleSaveName = async (event) => {
    event.preventDefault()

    this.setState({
      step: STEPS.SAVING_NAME
    })

    try {
      const response = await global.fetch(config.lambda.accountUserUpdate, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.props.token
        },
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName
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
          step: STEPS.ENTER_EMAIL,
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
    const step = this.state.step

    if (step === STEPS.ENTER_NAME) {
      return (
        <>
          <CentredPanel>
            <img src={clubLogo.src} width='300' height='300' />
            <p>Please enter your name:</p>
            <Form onSubmit={this.handleSaveName}>
              <FormInputWrapper error={this.state.errors.firstName}>
                <Input
                  name='firstName'
                  type='text'
                  onChange={(event) => this.handleNameChange('firstName', event.target.value)}
                  value={this.state.name}
                  data-input='name'
                  placeholder='First name'
                  required
                  disabled={step === STEPS.SAVING_NAME}
                />
                <Input
                  name='lastName'
                  type='text'
                  onChange={(event) => this.handleNameChange('lastName', event.target.value)}
                  value={this.state.name}
                  data-input='name'
                  placeholder='Last name'
                  required
                  disabled={step === STEPS.SAVING_NAME}
                />
              </FormInputWrapper>

              <Button
                disabled={step === STEPS.SAVING_NAME || Object.keys(this.state.errors).length}
                data-button='save-name'
              >Save
              </Button>
            </Form>
          </CentredPanel>
        </>
      )
    } else if (step === STEPS.SAVING_NAME) {
      return (
        <>
          <CentredPanel>
            <img src={clubLogo.src} width='300' height='300' />
            <p>Saving..</p>
            <Spinner />
          </CentredPanel>
        </>
      )
    } else if (step === STEPS.DONE) {
      return this.props.children
    }

    return (
      <>
        <CentredPanel>
          <img src={clubLogo.src} width='300' height='300' />
          <p>An error occurred, sorry it didn't work out :(</p>
        </CentredPanel>
      </>
    )
  }
}

WithUserName.propTypes = {
  user: PropTypes.object,
  redirect: PropTypes.string
}

const mapStateToProps = ({ session: { token, tokenExpired }, user }) => ({
  token,
  tokenExpired,
  user
})

const mapDispatchToProps = {
  signIn,
  setToken,
  expiredToken
}

export default connect(mapStateToProps, mapDispatchToProps)(WithUserName)
