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
  LinkPanel,
  Button
} from '../components/panels'
import {
  HelpText
} from '../components/forms'
import membershipBackground from '../../assets/membership-bg.jpg'
import ridesBackground from '../../assets/rides-bg.jpg'
import equipmentBackground from '../../assets/equipment-bg.jpg'

class MembershipPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={membershipBackground.src} />
        <Panel>
          <h2>Friends of PCC</h2>
          <p>Friends of PCC is a voluntary membership scheme intended to support the activities of the club.</p>
          <p>Joining the scheme costs &pound;25 per year and entitles members to perks exclusive to Friends of PCC. These include 10% off parts at <a href='https://ratracecycles.com'>Rat Race Cycles</a>, access to our club kit, invitations to club events and participation on club trips abroad and in the UK.</p>
          <p>The scheme is managed via the British Cycling website. You do not have to join British Cycling be part of Friends of PCC but we do recommend it.</p>
          <form
            style={{
              marginTop: 20,
              marginBottom: 20
            }}
            action='https://www.britishcycling.org.uk/club/subscriptions/buy'
            method='get'
          >
            <input type='hidden' name='club_id' value='8092' />
            <input type='hidden' name='subscription_id' value='2760' />
            <Button>Join Friends of PCC</Button>
          </form>
          <HelpText>The fee is due anually and is non-refundable. Fees go towards the club's running costs such as our continued affiliation to British Cycling, kit design fees, venue hire and other projects to benefit members.</HelpText>
          <h2>Social Rides</h2>
          <p>Our weekend Social Rides are free to join - we welcome all comers whether they choose to become Friends of PCC or not.</p>
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
