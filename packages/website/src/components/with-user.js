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
  ENTER_EMAIL: 'ENTER_EMAIL',
  CREATING_TOKEN: 'CREATING_TOKEN',
  CREATED_TOKEN: 'CREATED_TOKEN',
  VALIDATING_TOKEN: 'VALIDATING_TOKEN',
  DONE: 'DONE',
  ERROR: 'ERROR'
}

class WithUser extends Component {
  state = {
    step: STEPS.ENTER_EMAIL,
    tokenSent: false,
    name: '',
    email: '',
    token: null,
    creatingToken: false,
    verifyingToken: false,
    errors: {

    }
  }

  static getDerivedStateFromProps (props, state) {
    if (props.token) {
      state.step = STEPS.DONE
    } else {
      state.step = STEPS.ENTER_EMAIL
    }

    return state
  }

  async componentDidMount () {
    const token = new URLSearchParams(window.location.search).get('token')

    if (token) {
      this.setState({
        step: STEPS.VALIDATING_TOKEN
      })

      try {
        const response = await global.fetch(config.lambda.accountUserGet, {
          method: 'GET',
          headers: {
            Authorization: token
          }
        })

        if (response.status === 200) {
          this.props.setToken(token)
          this.props.signIn(await response.json())

          window.location = `${window.location}`.split('?')[0]

          return
        }

        if (response.status === 401) {
          this.props.expiredToken()

          window.location = `${window.location}`.split('?')[0]

          return
        }

        if (response.status === 422) {
          const body = await response.json()

          console.info(body)

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

        console.error('verify token error')
        console.error(error)
      } finally {
        this.setState({
          loading: false
        })
      }
    }
  }

  handleCreateToken = async (event) => {
    event.preventDefault()

    this.setState({
      step: STEPS.CREATING_TOKEN
    })

    try {
      const response = await global.fetch(config.lambda.accountTokenGenerate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          redirect: this.props.redirect
        })
      })

      if (response.status === 204) {
        this.setState({
          step: STEPS.CREATED_TOKEN
        })

        return
      }

      if (response.status === 422) {
        const body = await response.json()

        console.info(body)

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

      console.error('generate token error')
      console.error(error)
    }
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  render () {
    const step = this.state.step

    if (step === STEPS.ENTER_EMAIL) {
      return (
        <>
          <CentredPanel>
            <img src={clubLogo.src} width='300' height='300' />
            {this.props.tokenExpired ? (
              <p>Your session has expired.</p>
            ) : null}
            <p>Please enter your email address to log in:</p>
            <Form onSubmit={this.handleCreateToken}>
              <FormInputWrapper error={this.state.errors.firstName}>
                <Input
                  name='email'
                  type='email'
                  onChange={this.handleEmailChange}
                  value={this.state.email}
                  data-input='email'
                  placeholder='your-email@example.com'
                  required
                  disabled={step === STEPS.CREATING_TOKEN}
                />
              </FormInputWrapper>

              <Button
                disabled={step === STEPS.CREATING_TOKEN || Object.keys(this.state.errors).length}
                data-button='create-token'
              >Submit
              </Button>
            </Form>
          </CentredPanel>
        </>
      )
    } else if (step === STEPS.CREATING_TOKEN) {
      return (
        <>
          <CentredPanel>
            <img src={clubLogo.src} width='300' height='300' />
            <p>Enter your email address to log in:</p>
            <Spinner />
          </CentredPanel>
        </>
      )
    } else if (step === STEPS.CREATED_TOKEN) {
      return (
        <>
          <CentredPanel>
            <img src={clubLogo.src} width='300' height='300' />
            <p>A log in link has been emailed to you, please check your inbox and/or spam folder</p>
            <Form onSubmit={this.handleCreateToken}>
              <FormInputWrapper error={this.state.errors.firstName}>
                <Input
                  name='email'
                  type='email'
                  onChange={this.handleEmailChange}
                  value={this.state.email}
                  data-input='email'
                  placeholder='your-email@example.com'
                  required
                  disabled={step === STEPS.CREATING_TOKEN}
                />
              </FormInputWrapper>

              <Button
                disabled={step === STEPS.CREATING_TOKEN || Object.keys(this.state.errors).length}
                data-button='create-token'
              >Submit
              </Button>
            </Form>
          </CentredPanel>
        </>
      )
    } else if (step === STEPS.VALIDATING_TOKEN) {
      return (
        <>
          <CentredPanel>
            <img src={clubLogo.src} width='300' height='300' />
            <p>Validating your log in</p>
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

WithUser.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(WithUser)
