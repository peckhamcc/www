import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
import {
  PageWrapper,
  Panel,
  Hero,
  LinkPanel
} from '../components/panels'
import ridesBackground from '../../assets/rides-bg.jpg'
import membershipBackground from '../../assets/membership-bg.jpg'
import equipmentBackground from '../../assets/equipment-bg.jpg'

class RidesPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={ridesBackground} />
        <Panel>
          <h2>Club Rides</h2>
          <h3>How to join a ride</h3>
          <p>Looking to join your first ride with Peckham Cycle Club? We look forward to welcoming you!</p>
          <p>Every Saturday we run a Social Ride aimed at introducing new riders to the Club that starts at 8am (summer months) or 8.30am (winter months) at <a href='http://www.southwark.gov.uk/libraries/find-a-library?chapter=13'>Peckham Library</a>. This is usually the <a href='https://ridewithgps.com/routes/34683876'>same route</a> each week and heads out through South East London into the lanes of Kent. It's about 60km and we'll usually be riding for about 3 hours, with a few hills along the way! We ride in groups of 6-8, typically around 20-22kph but don't worry if you're not sure whether that speed is right for you: it is always a no drop ride.</p>
          <p>If you would like to join us please <Link to='/contact'>contact us</Link> in advance and let us know which Saturday date you would like to join.</p>
          <h3>What to expect on the ride</h3>
          <p>There will be one or two nominated ride leaders who will look after the group while on the road. Before setting off, they will talk you through some hand signals that cyclists usually use: watch a video about hand signals and more information about group riding <Link to='/riding'>here</Link>.</p>
          <p>We ride in single or double file and help everyone to stay together by not going too far off the front. We regroup regularly and take breaks for snacks / coffee / loo along the way.</p>
          <h3>What to bring</h3>
          <p>We ask that you come prepared with a few things to make your ride easier. Take a look at our <Link to='/equipment'>equipment</Link> page to find out what to bring along with you </p>
          <h3>Am I ready?</h3>
          <p>We would expect new riders to be confident on their bikes, to be able to ride for 2-3 hours in one go, and to have a road bike. If you're concerned about the distance or anything else let us know when you email us.</p>
          <h3>Do I need to sign up to be a Friend of PCC to ride?</h3>
          <p>You can do as many Social Rides as you like with us without signing up to be a Friend of PCC: they are free and open to all, and always will be.</p>
          <p>If you've done a few rides with us and feel that Peckham CC is a good fit for you and would like to join being a Friend costs £25/year and it will enable you to access more perks like purchasing Club kit, discounts, track sessions and events. Find out more about becoming a Friend of PCC <Link to='/membership'>here</Link>.</p>
          <h3>Rides for women and non-binary people</h3>
          <p>On the second Sunday of each month we have a ride specifically for all cis and trans women as well as non-binary people who are comfortable in a space that centres on women. Our routes and distances vary (there's usually a couple of options) but we aim to provide a safe and inclusive space for a fun and sociable ride. We always aim to include a cafe stop along the way!</p>
          <p>Members can join our <a href='https://peckhamcc.slack.com/archives/C01HW9YSS82'>#women-and-nb-rides</a> Slack channel for chat about the rides and all rides are also advertised on the <a href='https://peckhamcc.slack.com/archives/C01J8SG7YKB'>#announcement</a> channel, Facebook and Instagram.</p>
        </Panel>
        <LinkPanel background={equipmentBackground}>
          <Link to='/equipment'>Equipment</Link>
        </LinkPanel>
        <LinkPanel background={membershipBackground}>
          <Link to='/membership'>Membership</Link>
        </LinkPanel>
      </PageWrapper>
    )
  }
}

export default RidesPage
