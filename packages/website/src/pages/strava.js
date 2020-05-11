import React, {
  Component
} from 'react'
import {
  PageWrapper,
  Panel,
  ShortHero,
  Button
} from '../components/panels'
import {
  spacing
} from '../units'
import {
  HelpText
} from '../components/forms'
import shopBackground from '../../assets/shop-bg.jpg'
import styled from 'styled-components'

const ButtonForm = styled.form`
  margin: ${spacing(2)} 0;
`

class StravaPage extends Component {
  render () {
    return (
      <PageWrapper>
        <ShortHero background={shopBackground.src} />
        <Panel>
          <h2>Strava</h2>
          <p>Occasionally we use Strava data for fun things such as virtual races and prizes at the end of the year.</p>
          <p>To do this we need your permission to read/write your Strava activity data, please use the button below to grant permission.</p>
          <ButtonForm
            action='https://www.strava.com/api/v3/oauth/authorize'
            method='get'
          >
            <input type='hidden' name='response_type' value='code' />
            <input type='hidden' name='client_id' value='23982' />
            <input type='hidden' name='redirect_uri' value='https://api.peckham.cc/oauth' />
            <input type='hidden' name='scope' value='read,activity:read,activity:write' />
            <input type='hidden' name='approval_prompt' value='force' />
            <Button>Link your Strava account</Button>
          </ButtonForm>
          <HelpText>You can revoke permission at any time from the "My Apps" section of your Strava settings page.</HelpText>
        </Panel>
      </PageWrapper>
    )
  }
}

export default StravaPage
