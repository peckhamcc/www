import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
import {
  connect
} from 'react-redux'
import WithUser from '../components/with-user'
import {
  PageWrapper,
  Panel,
  ShortHero
} from '../components/panels'
import Details from '../components/profile/details'
import heroBackground from '../../assets/bg-7.jpg'
import {
  expiredToken
} from '../store/actions'
import {
  TabHolder,
  Tab,
  TabContent
} from '../components/profile/panels'

class ProfileDetailsPage extends Component {
  render () {
    return (
      <WithUser redirect='/profile'>
        <PageWrapper>
          <ShortHero background={heroBackground} />
          <Panel>
            <h2>Profile</h2>
            <p>Hello {this.props.user.name}</p>

            <TabHolder>
              <Tab selected>Details</Tab>
              <Tab>
                <Link to='/profile/orders'>Orders</Link>
              </Tab>
              <Tab>
                <Link to='/profile/fopcc'>Friends of PCC</Link>
              </Tab>
            </TabHolder>
            <TabContent>
              <h3>Your details</h3>
              <Details />
            </TabContent>
          </Panel>
        </PageWrapper>
      </WithUser>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = {
  expiredToken
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailsPage)
