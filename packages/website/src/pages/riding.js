import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Break, PageWrapper, Panel, Hero, LinkPanel } from '../components/panels'
import ridingBackground from '../../assets/riding-bg.jpg'
import membershipBackground from '../../assets/membership-bg.jpg'
import equipmentBackground from '../../assets/equipment-bg.jpg'
import { spacing } from '../units'
import styled from 'styled-components'

const Video = styled.iframe`
  margin-top: ${spacing(1)};
  width: 100%;
  max-width: 560px;
  height: 315px;
`

class RidesPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={ridingBackground.src} />
        <Panel>
          <h2>On the road</h2>
          <p>Once you've got <Link to='/equipment'>all the kit</Link>, it's time to get out on the road.</p>
          <p>Cycling is a team activity and there are a few things to bear in mind when riding with a club.</p>

          <h3>Hand signals &amp; Shouts</h3>
          <p>When you see someone make a hand signal or hear a shot, you should repeat it to pass the message on to the riders around you.</p>
          <p>Common shouts are:</p>
          <ul>
            <li>Car back! - car approaching from the rear of the group</li>
            <li>Car up! - car approaching from the front of the group</li>
            <li>Slowing! - the group is about to slow down</li>
            <li>Stopping! - the group is about to stop</li>
            <li>Hole/Glass/Gravel! - someone spotted something too late or was travelling too fast for hand signals</li>
          </ul>
          <p>This video is a useful run-down of the most common hand signals.</p>
          <Video src='https://www.youtube.com/embed/YyiBuqziEoo' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></Video>

          <h3>Riding in a group</h3>
          <Video src="https://www.youtube.com/embed/lK5MPtMrMqU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></Video>

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
