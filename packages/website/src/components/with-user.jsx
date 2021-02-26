import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Spinner,
  CentredPanel,
  Info
} from './panels'
import styled from 'styled-components'
import {
  connect
} from 'react-redux'
import {
  signIn,
  signOut,
  setToken,
  expiredToken,
  updateUser
} from '../store/actions'
import {
  config
} from '@peckhamcc/config'
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
  FETCHING_DETAILS: 'FETCHING_DETAILS',
  ENTER_DETAILS: 'ENTER_DETAILS',
  SAVING_DETAILS: 'SAVING_DETAILS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  DONE: 'DONE',
  ERROR: 'ERROR'
}

class WithUser extends Component {
  state = {
    step: STEPS.DONE,
    error: null,
    email: '',
    name: '',
    phone: ''
  }

  async componentDidMount () {
    window.addEventListener('hashchange', this._handleHashChange, false)
    this._handleHashChange()
  }

  componentWillUnmount () {
    window.removeEventListener('hashchange', this._handleHashChange)
  }

  static getDerivedStateFromProps (props, state) {
    state.name = state.name || props.user.name || ''
    state.phone = state.phone || props.user.phone || ''

    const {
      token
    } = props
    const {
      step,
      name,
      phone
    } = state

    if (step === STEPS.DONE) {
      if (!token) {
        state = {
          ...state,
          step: STEPS.ENTER_EMAIL
        }
      } else if (!name || !phone) {
        state = {
          ...state,
          step: STEPS.ENTER_DETAILS
        }
      }
    }

    return state
  }

  _handleHashChange = async () => {
    const token = new URLSearchParams(window.location.hash.substring(1)).get('token')

    if (token) {
      this.props.signOut()

      window.history.replaceState(null, null, ' ')

      await this._exchangeToken(token)
    }
  }

  async _exchangeToken (token) {
    this.setState({
      step: STEPS.VALIDATING_TOKEN
    })

    try {
      const response = await globalThis.fetch(config.lambda.accountTokenExchange, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token
        })
      })

      if (response.status === 200) {
        const body = await response.json()

        return this._getUserDetails(body.token)
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

      console.info(response)
      throw new Error('Could not verify token')
    } catch (error) {
      this.setState({
        step: STEPS.TOKEN_EXPIRED
      })

      console.error(error)
    }
  }

  async _getUserDetails (token) {
    this.setState({
      step: STEPS.FETCHING_DETAILS
    })

    try {
      const response = await globalThis.fetch(config.lambda.accountUserGet, {
        method: 'GET',
        headers: {
          Authorization: token
        }
      })

      if (response.status === 200) {
        const details = await response.json()

        this.props.setToken(token)
        this.props.signIn(details)

        if (!details.name || !details.phone) {
          this.setState({
            step: STEPS.ENTER_DETAILS
          })
        } else {
          this.setState({
            step: STEPS.DONE
          })
        }

        return
      }

      if (response.status === 401) {
        this.props.expiredToken()

        this.setState({
          step: STEPS.TOKEN_EXPIRED
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

      console.info(response)
      throw new Error('Could not verify token')
    } catch (error) {
      this.setState({
        step: STEPS.TOKEN_EXPIRED
      })

      console.error(error)
    }
  }

  handleCreateToken = async (event) => {
    event.preventDefault()

    this.setState({
      step: STEPS.CREATING_TOKEN
    })

    const {
      redirect
    } = this.props
    const {
      email
    } = this.state

    try {
      const response = await globalThis.fetch(config.lambda.accountTokenGenerate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          redirect
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

    const {
      name,
      phone
    } = this.state

    try {
      const response = await globalThis.fetch(config.lambda.accountUserUpdate, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.props.token
        },
        body: JSON.stringify({
          name,
          phone
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

      console.info(response)
      throw new Error('Could not update details')
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
      step,
      email,
      name,
      phone
    } = this.state
    const {
      tokenExpired
    } = this.props

    if (step === STEPS.ENTER_EMAIL) {
      return (
        <>
          <CentredPanel>
            <img src={clubLogo} width='300' height='300' />
            {tokenExpired
              ? (
                <p>Your session has expired.</p>
                )
              : null}
            <p>Please enter your email address to log in:</p>
            <Form onSubmit={this.handleCreateToken}>
              <FormInputWrapper error={this.state.error === 'email'}>
                <Input
                  name='email'
                  type='email'
                  onChange={(event) => this.handleDetailChange('email', event.target.value)}
                  value={email}
                  data-input='email'
                  placeholder='your-email@example.com'
                  required
                />
              </FormInputWrapper>

              <Button
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
            <img src={clubLogo} width='300' height='300' />
            <Info>Creating a log in link...</Info>
            <Spinner />
          </CentredPanel>
        </>
      )
    } else if (step === STEPS.CREATED_TOKEN) {
      return (
        <>
          <CentredPanel>
            <img src={clubLogo} width='300' height='300' />
            <p>A log in link has been emailed to you, please check your inbox and/or spam folder</p>
            <Form onSubmit={this.handleCreateToken}>
              <FormInputWrapper error={this.state.error === 'email'}>
                <Input
                  name='email'
                  type='email'
                  onChange={(event) => this.handleDetailChange('email', event.target.value)}
                  value={email}
                  data-input='email'
                  placeholder='your-email@example.com'
                  required
                />
              </FormInputWrapper>

              <Button
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
            <img src={clubLogo} width='300' height='300' />
            <Info>Validating your log in</Info>
            <Spinner />
          </CentredPanel>
        </>
      )
    } else if (step === STEPS.FETCHING_DETAILS) {
      return (
        <>
          <CentredPanel>
            <img src={clubLogo} width='300' height='300' />
            <Info>Fetching your details</Info>
            <Spinner />
          </CentredPanel>
        </>
      )
    } else if (step === STEPS.ENTER_DETAILS) {
      return (
        <>
          <CentredPanel>
            <img src={clubLogo} width='300' height='300' />
            <p>Please let us know a bit more about you:</p>
            <Form onSubmit={this.handleUpdateDetails}>
              <FormInputWrapper error={this.state.error === 'name'}>
                <Input
                  name='name'
                  type='text'
                  onChange={(event) => this.handleDetailChange('name', event.target.value)}
                  value={name}
                  data-input='name'
                  placeholder='Your name'
                  required
                />
              </FormInputWrapper>
              <FormInputWrapper error={this.state.error === 'phone'}>
                <Input
                  name='phone'
                  type='tel'
                  onChange={(event) => this.handleDetailChange('phone', event.target.value)}
                  value={phone}
                  data-input='phone'
                  placeholder='Your phone number'
                  required
                />
              </FormInputWrapper>

              <Button
                disabled={Boolean(this.state.error)}
                data-button='update-details'
              >Submit
              </Button>
            </Form>
          </CentredPanel>
        </>
      )
    } else if (step === STEPS.SAVING_DETAILS) {
      return (
        <>
          <CentredPanel>
            <img src={clubLogo} width='300' height='300' />
            <Info>Saving your details</Info>
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
          <img src={clubLogo} width='300' height='300' />
          <p>An error occurred, sorry it didn't work out :(</p>
          <p>Maybe try again later?</p>
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
  signOut,
  setToken,
  expiredToken,
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(WithUser)
