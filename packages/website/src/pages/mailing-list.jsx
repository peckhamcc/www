import React, {
  Component
} from 'react'
import {
  PageWrapper,
  Panel,
  Hero,
  Button
} from '../components/panels'
import background from '../../assets/mailing-list-bg.jpg'

class MailingListPage extends Component {
  componentDidMount () {

  }

  handleSubscribe () {
    window.ml('show', 'rltD5e', true)
  }

  render () {
    return (
      <PageWrapper>
        <Hero background={background} />
        <Panel>
          <h2>Mailing list</h2>
          <p>Sign up to our mailing list for club updates, including rides, trips, training, kit, etc</p>
          <Button onClick={this.handleSubscribe}>Subscribe</Button>
        </Panel>
      </PageWrapper>
    )
  }
}

export default MailingListPage
