import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
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
          <p>Don't forget, you can revoke permission at any time from the <Link to='https://www.strava.com/settings/apps'>"My Apps"</Link> section of your Strava settings page.</p>
          <p>See you on the road!</p>
        </Panel>
      </PageWrapper>
    )
  }
}

export default StravaSuccessPage
