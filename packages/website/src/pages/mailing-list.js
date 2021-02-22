import React, {
  Component
} from 'react'
import {
  PageWrapper,
  Panel,
  Hero
} from '../components/panels'
import background from '../../assets/mailing-list-bg.jpg'

class MailingListPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={background.src} />
        <Panel>
          <div className='ml-form-embed' data-account='2816293:n1z2e4e8x1' data-form='3426454:l5f7t9' />
        </Panel>
      </PageWrapper>
    )
  }
}

export default MailingListPage
