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

class ResultsPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={ridesBackground.src} />
        <Panel>
          <h2>Results</h2>
          <p>During this time of covid lockdown, we've been running virtual races on Zwift for our members.</p>
          <p>Here are the results</p>
          <ol>
            <li><Link to='/results/rainbow-race-early-may-2020'>Rainbow Race (Early May Bank Holiday Weekend 2020)</Link></li>
            <li><Link to='/results/lockdown-crits-2020'>Lockdown Crits</Link></li>
          </ol>
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

export default ResultsPage
