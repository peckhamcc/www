import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper, Panel } from '../components/panels'
import membershipBackground from '../../assets/membership-bg.jpg'
import contactBackground from '../../assets/about-bg.jpg'
import styled from 'styled-components'
import { Hero } from '../components/panels'

class ContactPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={contactBackground.src} />
        <Panel>
          <h2>Contact</h2>
          <p>Peckham Cycle Club is a <a href='https://www.britishcycling.org.uk/club/profile/8092/peckham-cycle-club'>British Cycling affiliated club</a>.</p>
          <p>We do not have a membership fee, just turn up and ride!</p>
        </Panel>
      </PageWrapper>
    )
  }
}

export default ContactPage
