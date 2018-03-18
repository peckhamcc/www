import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper, Panel } from '../components/panels'
import membershipBackground from '../../assets/membership-bg.jpg'
import contactBackground from '../../assets/about-bg.jpg'
import styled from 'styled-components'
import { Hero } from '../components/panels'

class ContactPage extends Component {

  state = {
    name: '',
    email: '',
    message: ''
  }

  onInputChange = (name, event) => {
    this.setState({
      [name]: event.source.value
    })
  }

  onFormSubmit = (event) => {
    event.preventDefault()
  }

  render () {
    return (
      <PageWrapper>
        <Hero background={contactBackground.src} />
        <Panel>
          <h2>Contact</h2>
          <p>Please get in touch via <a href="https://www.facebook.com/PeckhamCC">Facebook</a> or <a href="https://twitter.com/peckhamcc">Twitter</a>, or alternatively use the contact form below.</p>
          <form onSubmit={this.onFormSubmit}>
            <label for="name">Name</label>
            <input type="text" name="name" onChange={(event) => this.onInputChange('name', event)} value={this.state.name} />
            <label for="email">Email</label>
            <input type="email" name="email" onChange={(event) => this.onInputChange('email', event)} value={this.state.email} />
            <label for="message">Message</label>
            <textarea name="message" onChange={(event) => this.onInputChange('message', event)}>{this.state.message}</textarea>
            <input type="submit" />
          </form>
        </Panel>
      </PageWrapper>
    )
  }
}

export default ContactPage
