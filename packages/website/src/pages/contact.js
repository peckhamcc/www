import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper, Panel } from '../components/panels'
import membershipBackground from '../../assets/membership-bg.jpg'
import contactBackground from '../../assets/about-bg.jpg'
import styled from 'styled-components'
import { Hero } from '../components/panels'
import { spacing } from '../units'
import { config } from '@peckhamcc/config'

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

const Submit = styled.input`
  display: block;
  margin: ${spacing(1)} 0;
  font-size: ${spacing(1)};
`

const Warning = styled.p`
  color: #F10;
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

  onInputChange = (name, event) => {
    this.setState({
      [name]: event.target.value
    })
  }

  onFormSubmit = (event) => {
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

    fetch(config.lambda.sendContactFormEmail, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        message
      })
    })
      .then((response) => {
        if (response.status !== 201) {
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
        this.setState({
          error: 'There was an error sending your message, please try again later',
          state: STATE.ERROR
        })
      })
  }

  render () {
    return (
      <PageWrapper>
        <Hero background={contactBackground.src} />
        <Panel>
          <h2>Contact</h2>
          <p>You can contact us via our <a href="https://www.facebook.com/PeckhamCC">Facebook</a> or <a href="https://twitter.com/peckhamcc">Twitter</a> pages, or alternatively use the contact form below.</p>
          {this.state.state === STATE.SENDING && <p>Sending your message...</p>}
          {this.state.state === STATE.SENT && <p>Your message has been sent!</p>}
          {this.state.state === STATE.ERROR && <Warning>{this.state.error}</Warning>}
          <form onSubmit={this.onFormSubmit}>
            <Label for="name">Name</Label>
            <Input type="text" name="name" onChange={(event) => this.onInputChange('name', event)} value={this.state.name} disabled={this.state.state === STATE.SENDING} />
            <Label for="email">Email</Label>
            <Input type="email" name="email" onChange={(event) => this.onInputChange('email', event)} value={this.state.email} disabled={this.state.state === STATE.SENDING} />
            <Label for="message">Message</Label>
            <TextArea name="message" onChange={(event) => this.onInputChange('message', event)} value={this.state.message} disabled={this.state.state === STATE.SENDING} />
            <Submit type="submit" value="Send" disabled={this.state.state === STATE.SENDING} />
          </form>
        </Panel>
      </PageWrapper>
    )
  }
}

export default ContactPage
