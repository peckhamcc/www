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
        <Hero background={background} />
        <Panel>
          <h2>Mailing list</h2>
          <div className='ml-embedded' data-form='bRGP4R' />
        </Panel>
      </PageWrapper>
    )
  }
}

export default MailingListPage
