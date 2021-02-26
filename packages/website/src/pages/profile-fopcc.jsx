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
import Fopcc from '../components/profile/fopcc'
import heroBackground from '../../assets/bg-7.jpg'
import {
  TabHolder,
  Tab,
  TabContent
} from '../components/profile/panels'

class ProfileFopccPage extends Component {
  render () {
    return (
      <WithUser redirect='/profile'>
        <PageWrapper>
          <ShortHero background={heroBackground} />
          <Panel>
            <h2>Profile</h2>
            <p>Hello {this.props.user.name}</p>

            <TabHolder>
              <Tab>
                <Link to='/profile/details'>Details</Link>
              </Tab>
              <Tab>
                <Link to='/profile/orders'>Orders</Link>
              </Tab>
              <Tab selected>
                Friends of PCC
              </Tab>
            </TabHolder>
            <TabContent>
              <h3>Friends of PCC</h3>
              <Fopcc />
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFopccPage)
