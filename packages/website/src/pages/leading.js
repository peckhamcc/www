import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PageWrapper, Panel, Hero, LinkPanel } from '../components/panels'
import leadingBackground from '../../assets/leading-bg.jpg'
import membershipBackground from '../../assets/membership-bg.jpg'
import equipmentBackground from '../../assets/equipment-bg.jpg'

const SubList = styled.ol`
  list-style-type: lower-alpha;
`

class LeadingPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={leadingBackground.src} />
        <Panel>
        <h2>Leading a social ride</h2>
          <p>Our weekly social and monthly women's rides are a key part of the club's appeal and should be welcoming to beginners regardless of their cycling ability (to a degree).  The responsibility of the ride leaders are to make sure everyone makes it round and has a good time.</p>
          <p>There should be a minimum of two leaders on a ride, one at the front and one at the back.  Additional club regulars can help out where they can but should defer to the ride leaders on pace &amp; route.</p>

          <h3>Who can lead a ride</h3>
          <p>There is no exacting criteria for who can lead a ride. If you’ve done the ride enough times to consider yourself a regular and know the route, you can volunteer to help lead the ride.  Regulars should try to lead a ride at least every couple of months to spread the workload around.</p>

          <h3>Before the ride</h3>
          <p>Before setting off ensure:</p>
          <ol>
            <li>Eyeball everyone’s bike to make sure it’s suitable for the ride</li>
            <li>Everyone understands and is comfortable with the distance that will be travelled</li>
            <li>
              Each rider has:
              <SubList>
                <li>Water (at least one bottle)</li>
                <li>Food (at least two bars)</li>
                <li>Tyre levers and spare tube and/or patch kit</li>
              </SubList>
            </li>
            <li>
              Go through the hand signals and shouts:
              <SubList>
                <li>Pothole</li>
                <li>Glass/gravel</li>
                <li>Pulling out (e.g. arm behind the back)</li>
                <li>Turning left/right, going straight on (e.g. arm straight out)</li>
                <li>Car up/back</li>
                <li>Slowing/stopping</li>
                <li>At junctions: clear left/right, car left/right</li>
              </SubList>
            </li>
            <li>Tell people they are expected to pass hand signals/shouts up/down the group</li>
            <li>Remind people to ride within their limits, stop at red lights, don’t cross into the opposite lane on blind bends, etc</li>
            <li>Announce any other business - upcoming sportives, socials, kit orders, etc</li>
          </ol>
          <p>If people turn up without the right equipment, plan a stop at <a href='http://cadenceperformance.com'>Cadence</a>, <a href='https://www.paulscustomcycles.com'>Paul’s</a> or <a href='https://ratracecycles.com'>Rat Race Cycles</a> to they can buy the missing parts.  At the time of writing <a href='https://www.seabasscycles.co.uk'>Seabass</a> opens at 9am on Saturdays so is closed when the ride starts.</p>
          <p>If people turn up with bags, they can leave them at <a href='https://ratracecycles.com'>Rat Race Cycles</a> and bike locks can be left locked to something sturdy near the finishing point (bike stands near <a href='https://www.seabasscycles.co.uk'>Seabass</a> for example).</p>

          <h3>During the ride</h3>
          <p>The leader at the head of the ride should keep a steady pace, no more than 24kp/h average.  A bike computer is essential for this.  If people overtake you, tell them where the next stopping point is and that they should consider joining our training rides but do not chase them otherwise the group will get too strung out.</p>
          <p>When approaching junctions or traffic, remember to require enough space &amp; leave enough time for the whole group to pass through, not just individual riders.  This might mean occupying a whole lane three cars back at the lights instead of filtering through stationary traffic in single file to get to the front.</p>
          <p>The leader at the back of the ride should try to keep the leader in sight as much as is possible and should encourage the slower members of the group but must not drop them.</p>
          <p>Leaders should encourage people to ride two-by-two where possible on quiet roads. This shortens the length of the group making it safer for cars to pass and increases the drag for slower riders further down the line.</p>
          <p>If there are punctures, stop the ride while the rider changes their tube.  Offer assistance if they are in need but all riders should be able to fix their own punctures.</p>

          <h3>After the ride</h3>
          <p>Nothing specific here, have a coffee and some cake, maybe go for a beer afterwards.</p>
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

export default LeadingPage
