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

const Error = styled.p`
  color: #F10;
`

class ContactPage extends Component {

  state = {
    name: '',
    email: '',
    message: '',
    sent: false,
    error: false,
    sending: false
  }

  onInputChange = (name, event) => {
    this.setState({
      [name]: event.target.value.trim()
    })
  }

  onFormSubmit = (event) => {
    event.preventDefault()

    if (!this.state.name || !this.state.email || !this.state.message) {
      return this.setState({
        error: 'All fields are required',
        sending: false
      })
    }

    if (this.state.email.indexOf('@') === -1) {
      return this.setState({
        error: 'Please enter a valid email address',
        sending: false
      })
    }

    this.setState({
      error: false,
      sending: true,
      sent: false
    })

    fetch(config.lambda.sendContactFormEmail, {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        message: this.state.message
      })
    })
      .then(() => {
        this.setState({
          error: false,
          sent: true,
          sending: false
        })
      })
      .catch(error => {
        console.error(error)

        this.setState({
          error: 'There was an error sending your message, please try again later',
          sending: false
        })
      })
  }

  render () {
    return (
      <PageWrapper>
        <Hero background={contactBackground.src} />
        <Panel>
          <h2>Contact</h2>
          <p>Please get in touch via <a href="https://www.facebook.com/PeckhamCC">Facebook</a> or <a href="https://twitter.com/peckhamcc">Twitter</a>, or alternatively use the contact form below.</p>
          {this.state.sent && <p>Your message has been sent!</p>}
          {this.state.error && <Error>{this.state.error}</Error>}
          {!this.state.sent && (
            <form onSubmit={this.onFormSubmit}>
              <Label for="name">Name</Label>
              <Input type="text" name="name" onChange={(event) => this.onInputChange('name', event)} value={this.state.name} disabled={this.state.sending} />
              <Label for="email">Email</Label>
              <Input type="email" name="email" onChange={(event) => this.onInputChange('email', event)} value={this.state.email} disabled={this.state.sending} />
              <Label for="message">Message</Label>
              <TextArea name="message" onChange={(event) => this.onInputChange('message', event)} value={this.state.message} disabled={this.state.sending} />
              <Submit type="submit" value="Send" disabled={this.state.sending} />
            </form>
          )}
        </Panel>
      </PageWrapper>
    )
  }
}

export default ContactPage
