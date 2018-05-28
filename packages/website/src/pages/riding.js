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
          <h2>On the road</h2>
          <p>Cycling is a team activity and there are a few things to bear in mind when riding with a club.</p>
          <p>Every club does these signals slightly differently - these are Peckham CC's.</p>

          <h3>Stopping</h3>
          <p>A hand straight up in the air or a palm shown to the riders behind</p>
          <p>If you don't feel comfortable taking your hands off the bars, yell 'Stopping!'.</p>

          <h3>Slowing</h3>
          <p>A hand held out to the side, palm down and moving up and down like patting an invisible dog.</p>
          <p>Again ff you don't feel comfortable taking your hands off the bars, just yell 'Slowing!'.</p>

          <h3>Pulling out</h3>
          <p>Pointing across your back in the direction you are about to pull out in signals there is an obstruction or hazard to be avoided or overtaken such as a parked car, road furniture or a rider from a rival club who has <a href='https://www.ride25.com/cycling-blog/bonking-birds-bees/'>bonked</a>.</p>

          <h3>Doors</h3>
          <p>Sadly not everyone has mastered the <a href='https://www.dutchreach.org/'>Dutch Reach</a>.  If you see a car door opening in the path of the group, yell 'DOOR!', signal as Pulling Out above, and manuver around the hazard.</p>

          <h3>Turning</h3>
          <p>Hold your hand out to the side the same way you do on your commute.</p>

          <h3>Hazards</h3>
          <p>The people riding behind you may not notice potholes and broken glass until it is too late, so help them out by pointing a hazards you see.</p>
          <p>A good rule of thumb is that if you see something and think you'll have to change course to avoid it, so will the people behind you so let them know!</p>
          <p>If you are travelling too fast, braking or otherwise do not feel comfortable taking your hands off the bars, simply yell 'Hole!', 'Glass!' or 'Gravel!' instead.</p>
          <h4>Potholes</h4>
          <p>Point straight down at the hazard</p>
          <h4>Glass/gravel</h4>
          <p></p>



          <h3>Hand signals</h3>
          <p>Communication between riders is important for everyone's saftey and enjoyment but wind &amp; road noise usually makes talking impratical, so we use hand signals.</p>
          <h4>Pointing out hazards</h4>
          <p>The people riding behind you may not notice potholes and broken glass until it is too late, so help them out by pointing a hazards you see.</p>
          <p>A good rule of thumb is that if you see something and think you'll have to change course to avoid it, so will the people behind you so let them know!</p>
          <p>If you are travelling too fast, braking or otherwise do not feel comfortable taking your hands off the bars, simply yell 'Hole!', 'Glass!' or 'Gravel!' instead.</p>
          <h3>Stopping/slowing</h3>
          <p>When approaching a junction or hazard such as gravel or horses, let the people behind you know you are about to start braking by placing your hand parallel with the ground and moving it up and down.</p>
          <p>If coming to a complete stop, show the riders behind you the palm of your hand.</p>
          <p>If you don't have time to signal or don't feel comfortable taking your hands off the bars, just yell 'Slowing' or 'Stopping'.</p>
          <h3>Cars</h3>
          <p>When cars approach the group from in front or behind it's up to the leading or trailing riders to notify the other members of the group</p>
          <p>If the car is approaching from behind, yell 'Car back!' - if from the front, 'Car up!'</p>
          <p>When you hear this call, repeat it and get into single file to allow the car to pass.</p>
          <p>Try not to create any large gaps in the group while getting into single file as some more enthusiatic drivers will try to fit their car in them, causing the trailing riders to brake hard and likely cause an accident.</p>
          <h3>Pulling out</h3>
          <p></p>
          <h3>Riding in a group</h3>
          <p>At 25kph about 70% of your energy is expended overcoming wind resistance, increasing to 85% at 32kph</p>
          <p>20-40% of your energy on the bike is spent overcoming wind resistance so we ride in a group to minimise this.</p>
          <p>When riding in a group, try to keep a bike length or less between you and the bike in front.  This will allow you to take advantage of .</p>
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
