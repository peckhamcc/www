import React, {
  Component
} from 'react'
import {
  PageWrapper,
  Panel,
  Hero
} from '../components/panels'
import {
  GreenButton
} from '../components/forms'
import contactBackground from '../../assets/contact-bg.jpg'
import styled from 'styled-components'
import {
  spacing
} from '../units'
import {
  config
} from '@peckhamcc/config'
import { pccRed } from '../colours'

const Label = styled.label`
  display: block;
  margin: ${spacing(1)} 0;
`

const Input = styled.input`
  padding: 5px;
  width: 100%;
  max-width: 500px;
  font-size: ${spacing(1)};
`

const TextArea = styled.textarea`
  padding: 5px;
  width: 100%;
  max-width: 500px;
  height: 300px;
  font-size: ${spacing(1)};
`

const Warning = styled.p`
  color: ${pccRed};
`

const STATE = {
  ERROR: 'error',
  SENDING: 'sending',
  SENT: 'sent'
}

class ContactPage extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    state: null
  }

  handleInputChange = (name, event) => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    const name = this.state.name.trim()
    const email = this.state.email.trim()
    const message = this.state.message.trim()

    if (!name || !email || !message) {
      return this.setState({
        error: 'All fields are required',
        state: STATE.ERROR
      })
    }

    if (email.indexOf('@') === -1) {
      return this.setState({
        error: 'Please enter a valid email address',
        state: STATE.ERROR
      })
    }

    this.setState({
      state: STATE.SENDING
    })

    globalThis.fetch(config.lambda.sendContactFormEmail, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        message
      })
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.setState({
          state: STATE.SENT,
          name: '',
          email: '',
          message: ''
        })
      })
      .catch(error => {
        console.error(error)

        this.setState({
          error: 'There was an error sending your message, please try again later',
          state: STATE.ERROR
        })
      })
  }

  render () {
    return (
      <PageWrapper>
        <Hero background={contactBackground} />
        <Panel>
          <h2>Contact</h2>
          <p>You can contact us via our <a href='https://www.facebook.com/PeckhamCC'>Facebook</a> or <a href='https://twitter.com/peckhamcc'>Twitter</a> pages, or alternatively use the contact form below.</p>
          {this.state.state === STATE.SENDING && <p>Sending your message...</p>}
          {this.state.state === STATE.SENT && <p>Your message has been sent!</p>}
          {this.state.state === STATE.ERROR && <Warning>{this.state.error}</Warning>}
          <form onSubmit={this.handleFormSubmit}>
            <Label htmlFor='name'>Name</Label>
            <Input type='text' name='name' onChange={(event) => this.handleInputChange('name', event)} value={this.state.name} disabled={this.state.state === STATE.SENDING} />
            <Label htmlFor='email'>Email</Label>
            <Input type='email' name='email' onChange={(event) => this.handleInputChange('email', event)} value={this.state.email} disabled={this.state.state === STATE.SENDING} />
            <Label htmlFor='message'>Message</Label>
            <TextArea name='message' onChange={(event) => this.handleInputChange('message', event)} value={this.state.message} disabled={this.state.state === STATE.SENDING} />
            <div>
              <GreenButton type='submit' disabled={this.state.state === STATE.SENDING}>Send</GreenButton>
            </div>
          </form>
        </Panel>
      </PageWrapper>
    )
  }
}

export default ContactPage
