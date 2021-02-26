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
import Orders from '../components/profile/orders'
import heroBackground from '../../assets/bg-7.jpg'
import {
  TabHolder,
  Tab,
  TabContent
} from '../components/profile/panels'

class ProfileOrdersPage extends Component {
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
              <Tab selected>
                Orders
              </Tab>
              <Tab>
                <Link to='/profile/fopcc'>Friends of PCC</Link>
              </Tab>
            </TabHolder>
            <TabContent>
              <h3>Shop orders</h3>
              <Orders />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileOrdersPage)
