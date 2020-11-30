import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  PageWrapper,
  Panel
} from '../panels'
import styled from 'styled-components'
import {
  connect
} from 'react-redux'
import {
  verifiedRouletteToken,
  clearRouletteToken
} from '../../store/actions'
import config from '../../config'
import {
  Input,
  FormInputWrapper
} from '../forms'
import pccLogo from '../../../assets/pcc-logo-round.png'

const CenteredPanel = styled(Panel)`
  max-width: 376px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  padding-top: 20px;

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`

const Form = styled.form`
  margin-top: 20px;
`

const STEPS = {
  ENTER_DETAILS: 'ENTER_DETAILS',
  CREATING_TOKEN: 'CREATING_TOKEN',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

class LogInFom extends Component {
  state = {
    step: STEPS.ENTER_DETAILS,
    tokenSent: false,
    email: null,
    token: null,
    creatingToken: false,
    verifyingToken: false,
    errors: {

    }
  }

  handleCreateToken = async (event) => {
    event.preventDefault()

    this.setState({
      step: STEPS.CREATING_TOKEN
    })

    try {
      const response = await global.fetch(config.lambda.rideRouletteTokenGenerate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email
        })
      })

      if (response.status === 204) {
        this.setState({
          step: STEPS.SUCCESS
        })
      }

      if (response.status === 422) {
        const body = await response.json()

        console.info(body)

        this.setState({
          step: STEPS.ENTER_DETAILS,
          error: body.field
        })
      }

      throw new Error(response.statusText)
    } catch (error) {
      this.setState({
        step: STEPS.ERROR,
        error
      })

      console.error('payment error', error)
    }
  }

  handleVerifyToken = (event) => {
    if (!this.props.acceptedTerms) {
      event.preventDefault()

      return this.setState({
        showTermsError: true
      })
    }
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handleTokenChange = (event) => {
    this.setState({
      token: event.target.value
    })
  }

  render () {
    if (this.props.token) {
      return
    }

    const {
      step
    } = this.state

    const { user } = this.props
    const { email } = this.state

    let content = (
      <>
        <p>Choose the type of ride you'd like to do at the weekend and get matched up with club members who want to ride at a similar pace and distance</p>
        <Form onSubmit={this.handleCreateToken}>
          <FormInputWrapper error={this.state.errors.firstName}>
            <Input
              name='email'
              type='email'
              onChange={this.handleEmailChange}
              value={email || (user && user.email) || ''}
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
      </>
    )

    if (step === STEPS.SUCCESS) {
      content = (
        <>
          <p>A log in link has been emailed to you, please check your inbox and/or spam folder</p>
        </>
      )
    }

    return (
      <PageWrapper>
        <CenteredPanel>
          <img src={pccLogo.src} width='300' height='300' />
          <h2>Ride Roulette</h2>
          {content}
        </CenteredPanel>
      </PageWrapper>
    )
  }
}

LogInFom.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object
}

const mapStateToProps = ({ roulette: { token }, user: { user, acceptedTerms } }) => ({
  token,
  user
})

const mapDispatchToProps = {
  verifiedRouletteToken,
  clearRouletteToken
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInFom)
