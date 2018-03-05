import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper, Panel } from '../components/panels'
import membershipBackground from '../../assets/membership-bg.jpg'
import styled from 'styled-components'

const Hero = styled.div`
  background-image: url(${membershipBackground.src});
  background-size: cover;
  background-position: center top;
  height: 60vh;
`

class MembershipPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero />
        <Panel>
          <h2>Membership</h2>
          <p>Peckham Cycle Club is a <a href='https://www.britishcycling.org.uk/club/profile/8092/peckham-cycle-club'>British Cycling affiliated club</a>.</p>
          <p>We do not have a membership fee, just turn up and ride!</p>
        </Panel>
      </PageWrapper>
    )
  }
}

export default MembershipPage
