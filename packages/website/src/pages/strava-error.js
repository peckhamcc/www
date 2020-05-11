import React, {
  Component
} from 'react'
import {
  PageWrapper,
  Panel,
  ShortHero
} from '../components/panels'
import shopBackground from '../../assets/shop-bg.jpg'

class StravaErrorPage extends Component {
  render () {
    return (
      <PageWrapper>
        <ShortHero background={shopBackground.src} />
        <Panel>
          <h2>Strava</h2>
          <p>Oh dear, that didn't work. The error has been logged, please ask the web team to investigate.</p>
        </Panel>
      </PageWrapper>
    )
  }
}

export default StravaErrorPage
