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
        <Hero background={ridesBackground.src} />
        <Panel>
          <h2>Club Rides</h2>
          <p>All rides leave <a href='http://www.southwark.gov.uk/libraries/find-a-library?chapter=13'>Peckham Library</a> at 8am in the summer or 8:30am in the winter.</p>
          <p>Details of weekend rides are usually posted to <a href='https://www.facebook.com/PeckhamCC'>Facebook</a> and <a href='https://twitter.com/peckhamcc'>Twitter</a> towards the end of the week.</p>
          <p>First time riders are more than welcome but if you are thinking of joining us for the first time, please get in touch first so we know to look out for you!</p>
          <h3>Social Spin</h3>
          <p>There is a club social ride on every Saturday throughout the year and is the ideal introduction to riding with Peckham CC.</p>
          <p>It's a non-drop ride, meaning we regroup at the tops of climbs and everyone rides back together.</p>
          <p>The '<Link to='/routes'>short loop</Link>' is about 60km long and takes about three hours. There are always multiple groups at the library, and there's generally a group of people interested in riding further and/or slightly faster.</p>
          <h3>Ladies Ride</h3>
          <p>From spring to autumn, once a month there is a women-only ride aimed at riders of all abilities.The route varies month to month and is designed to offer women and non-male identifying people a safe and inclusive space to stretch themselves. The pace is inclusive and the distance is generally slightly further than the social ride.</p>
          <h3>Training Rides</h3>
          <p>Depending on the time of year and people's training goals, there my be a faster group on Saturdays and sometimes Sundays too.</p>
          <p>These rides are 100-200km in length.</p>
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
