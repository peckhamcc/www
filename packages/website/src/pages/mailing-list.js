import React, {
  Component
} from 'react'
import {
  PageWrapper,
  Panel,
  Button,
  Hero
} from '../components/panels'
import background from '../../assets/mailing-list-bg.jpg'
import {
  Label,
  Input,
  HelpText
} from '../components/forms'

class MailingListPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={background.src} />
        <Panel>
          <h2>Mailing list</h2>
          <p>Sign up to our mailing list for club updates, including rides, trips, training, kit, etc</p>
          <form
            style={{
              padding: 3
            }}
            action='https://tinyletter.com/peckhamcc'
            method='post'
            target='popupwindow'
            onSubmit={() => {
              window.open('https://tinyletter.com/peckhamcc', 'popupwindow', 'scrollbars=yes,width=800,height=600')
              return true
            }}
          >
            <p>
              <Label htmlFor='tlemail'>Enter your email address</Label>
            </p>
            <p>
              <Input
                name='email'
                id='tlemail'
                type='email'
                placeholder='me@example.com'
              />
            </p>
            <input type='hidden' value='1' name='embed' />
            <Button>Subscribe</Button>
          </form>
          <HelpText>You can unsubscribe at any time. Your email will only be used to contact you and will not be shared with anyone without your permission.</HelpText>
        </Panel>
      </PageWrapper>
    )
  }
}

export default MailingListPage
