import React, {
  Component
} from 'react'
import styled from 'styled-components'
import {
  Link
} from 'react-router-dom'
import backgroundImage1 from '../../assets/bg-1.jpg'
import backgroundImage2 from '../../assets/bg-2.jpg'
import backgroundImage3 from '../../assets/bg-3.jpg'
import backgroundImage4 from '../../assets/bg-4.jpg'
import backgroundImage5 from '../../assets/bg-5.jpg'
import backgroundImage6 from '../../assets/bg-6.jpg'
import backgroundImage7 from '../../assets/bg-7.jpg'
import backgroundImage8 from '../../assets/bg-8.jpg'
import backgroundImage9 from '../../assets/bg-9.jpg'
import membershipBackground from '../../assets/membership-bg.jpg'
import equipmentBackground from '../../assets/equipment-bg.jpg'
import logoImage from '../../assets/pcc-logo@2x.png'
import SlideShow from '../components/slide-show'
import {
  PageWrapper,
  Panel,
  LinkPanel
} from '../components/panels'

const Logo = styled.h1`
  margin: 0;
  padding: 250px 0 0 0;
  height: 0;
  overflow: hidden;
  background: url(${logoImage}) no-repeat;
  background-position: center;
  background-size: contain;

  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 450;
`

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}

class HomePage extends Component {
  render () {
    return (
      <PageWrapper>
        <Logo>Peckham Cycle Club</Logo>
        <SlideShow slides={shuffle([
          backgroundImage1,
          backgroundImage2,
          backgroundImage3,
          backgroundImage4,
          backgroundImage5,
          backgroundImage6,
          backgroundImage7,
          backgroundImage8,
          backgroundImage9
        ])}
        />
        <Panel>
          <h2>Welcome to Peckham Cycle Club!</h2>
          <p>We are a social cycling club based out of Peckham in South East London. We organise friendly, inclusive rides which usually take place around Kent on the weekends, as well as organising events, trips in the UK and abroad, and lots of social activities! Our growing number of riders have interests that span all areas of cycling, from commuters looking to tackle their first sportive, through to mile-munching roadies and riders looking to have some fun on gravel.  We also have first time racers getting into cyclo-cross, track racing, and crits and one or two of us are even standing on the odd podium.</p>
          <p>We hope there's something to suit everyone and very much encourage our members to try new things out.</p>
          <p>Our weekly Saturday Social rides are at the heart of the Club. If you'd like to try out Peckham CC then this is the ride for you - just take a look at our <Link to='/rides'>Ride With Us</Link> page first and send us an email/message on social media to introduce yourself.</p>
          <p>We hope to see you on a ride soon.</p>
          <p>United we Roll!</p>
        </Panel>
        <LinkPanel background={membershipBackground}>
          <Link to='/membership'>Membership</Link>
        </LinkPanel>
        <LinkPanel background={equipmentBackground}>
          <Link to='/equipment'>Equipment</Link>
        </LinkPanel>
      </PageWrapper>
    )
  }
}

export default HomePage
