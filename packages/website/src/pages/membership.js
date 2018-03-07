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
          <p>There are no membership fees or club dues for riding with Peckham Cycle Club, just turn up and ride.</p>
          <p>We hope to keep the club fee free forever but we do have some overheads so to support the club a small levy is added to all club kit orders which pays for things like <a href='https://www.britishcycling.org.uk/club/profile/8092/peckham-cycle-club'>British Cycling Affiliation</a>.</p>
          <p>Organisation takes place primarily via a <a href="https://www.whatsapp.com/">WhatsApp</a> group, please get in touch on <a href="https://www.facebook.com/PeckhamCC">Facebook</a> or <a href="https://twitter.com/peckhamcc">Twitter</a> if you'd like to be added to the group.</p>
          <p>We also have a group page on <a href="https://www.strava.com/clubs/63491">Strava</a>.</p>
          <h3>British Cycling Membership</h3>
          <p>You don't have to be a member of British Cycling to ride with us but we do recommend it.</p>
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
