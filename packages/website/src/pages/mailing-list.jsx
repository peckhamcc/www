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

class MailingListPage extends Component {
  handleSubscribe = (event) => {
    event.preventDefault()

    if (!this.ml) {
      this.ml = window.ml('accounts', '2816293', 'n1z2e4e8x1', 'load')
    }

    this.ml('webforms', '3426454', 'l5f7t9', 'show')
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
