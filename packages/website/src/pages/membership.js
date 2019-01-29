import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper, Panel, Hero, LinkPanel } from '../components/panels'
import membershipBackground from '../../assets/membership-bg.jpg'
import ridesBackground from '../../assets/rides-bg.jpg'
import equipmentBackground from '../../assets/equipment-bg.jpg'
import styled from 'styled-components'

class MembershipPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={membershipBackground.src} />
        <Panel>
          <h2>Membership</h2>
          <p>Our weekly social rides are free to join and will be forever.</p>
          <p>If you've been a couple of times and you like the club and wish to continue riding with us, there is a yearly fee currently set at £25 (with a £1 admin fee).</p>
          <p>Paying this fee will allow you to purchase club kit and join us on training events and trips abroad. It is payable once a year and is non-refundable.</p>
          <p>You can pay the membership fee online via our profile page on the <a href="https://www.britishcycling.org.uk/club/profile/8092/peckham-cycle-club">British Cycling website</a>.</p>
          <p>British Cycling membership is advised but is not a requirement.</p>
        </Panel>
        <LinkPanel background={ridesBackground.src}>
          <Link to='/rides'>Rides</Link>
        </LinkPanel>
        <LinkPanel background={equipmentBackground.src}>
          <Link to='/equipment'>Equipment</Link>
        </LinkPanel>
      </PageWrapper>
    )
  }
}

export default MembershipPage
