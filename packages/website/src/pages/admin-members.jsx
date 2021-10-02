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
import Members from '../components/admin/members'
import heroBackground from '../../assets/bg-7.jpg'
import {
  TabHolder,
  Tab,
  TabContent
} from '../components/profile/panels'

class AdminMembersPage extends Component {
  render () {
    return (
      <WithUser redirect='/admin/members'>
        <PageWrapper>
          <ShortHero background={heroBackground} />
          <Panel>
            <h2>Club Admin</h2>
            <p>Hello {this.props.user.name}</p>

            <TabHolder>
              <Tab selected>
                Members
              </Tab>
              {
                this.props.user.rrcAdmin
                  ? (
                    <Tab>
                      <Link to='/admin/rrc'>RRC</Link>
                    </Tab>
                    )
                  : null
              }
              {
                this.props.user.kitAdmin
                  ? (
                    <Tab>
                      <Link to='/admin/kit'>Kit</Link>
                    </Tab>
                    )
                  : null
              }
            </TabHolder>
            <TabContent>
              <Members />
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminMembersPage)
