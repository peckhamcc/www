import React, {
  Component
} from 'react'
import {
  PageWrapper,
  Panel,
  ShortHero
} from '../components/panels'
import shopBackground from '../../assets/shop-bg.jpg'

class StravaSuccessPage extends Component {
  render () {
    return (
      <PageWrapper>
        <ShortHero background={shopBackground.src} />
        <Panel>
          <h2>Strava</h2>
          <p>Hooray, you've successfully granted permission for us to read/write your activity data.</p>
          <p>See you on the road!</p>
        </Panel>
      </PageWrapper>
    )
  }
}

export default StravaSuccessPage
