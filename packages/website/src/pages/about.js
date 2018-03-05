import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper, Panel } from '../components/panels'
import membershipBackground from '../../assets/membership-bg.jpg'
import aboutBackground from '../../assets/about-bg.jpg'
import styled from 'styled-components'

const Hero = styled.div`
  background-image: url(${aboutBackground.src});
  background-size: cover;
  background-position: center top;
  height: 60vh;
`

class AboutPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero />
        <Panel>
          <h2>About</h2>
          <p>Peckham Cycle Club is a <a href='https://www.britishcycling.org.uk/club/profile/8092/peckham-cycle-club'>British Cycling affiliated club</a>.</p>
          <p>We do not have a membership fee, just turn up and ride!</p>
        </Panel>
      </PageWrapper>
    )
  }
}

export default AboutPage
