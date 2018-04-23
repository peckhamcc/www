import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Break, PageWrapper, Panel, Hero, LinkPanel } from '../components/panels'
import ridesBackground from '../../assets/rides-bg.jpg'
import membershipBackground from '../../assets/membership-bg.jpg'
import equipmentBackground from '../../assets/equipment-bg.jpg'
import styled from 'styled-components'

class RidesPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={ridesBackground.src} />
        <Panel>
          <h2>Club Rides</h2>
          <p>All rides leave <a href="http://www.southwark.gov.uk/libraries/find-a-library?chapter=13">Peckham Library</a> at 8am in the summer or 8:30am in the winter.</p>
          <p>Details of weekend rides are usually posted to <a href="https://www.facebook.com/PeckhamCC">Facebook</a> and <a href="https://twitter.com/peckhamcc">Twitter</a> towards the end of the week.</p>
          <p>First time riders are more than welcome but if you are thinking of joining us for the first time, please get in touch first so we know to look out for you!</p>
          <h3>Social Spin</h3>
          <p>There is a club social ride on most Saturdays throughout the year and is the ideal introduction to riding with Peckham CC.</p>
          <p>It's a non-drop ride, meaning we regroup at the tops of climbs and everyone rides back together.</p>
          <p>The '<Link to='/routes'>short loop</Link>' is about 60km long and takes about three hours.  At the 30km point we usually decide whether to go further, sometimes splitting the group if people have to be back early.</p>
          <h3>Ladies Ride</h3>
          <p>On the third Sunday of every month there is a women-only ride aimed at riders of all abilities.  The route varies month to month but is about 50km in length and the group leaves the library at 9am.</p>
          <h3>Training Rides</h3>
          <p>Depending on the time of year and people's training goals, there my be a faster group on Saturdays and sometimes Sundays too.</p>
          <p>These rides are around 150-200km in length.</p>
        </Panel>
        <LinkPanel background={equipmentBackground.src}>
          <Link to='/equipment'>Equipment</Link>
        </LinkPanel>
        <LinkPanel background={membershipBackground.src}>
          <Link to='/membership'>Membership</Link>
        </LinkPanel>
      </PageWrapper>
    )
  }
}

export default RidesPage
