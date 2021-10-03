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
import Rrc from '../components/admin/rrc'
import heroBackground from '../../assets/bg-7.jpg'
import {
  TabHolder,
  Tab,
  TabContent
} from '../components/profile/panels'

class AdminRRCPage extends Component {
  render () {
    return (
      <WithUser redirect='/admin/rrc'>
        <PageWrapper>
          <ShortHero background={heroBackground} />
          <Panel>
            <h2>Club Admin</h2>
            <TabHolder>
              {
                this.props.user.membersAdmin
                  ? (
                    <Tab>
                      <Link to='/admin/members'>Members</Link>
                    </Tab>
                    )
                  : null
              }
              <Tab selected>
                RRC
              </Tab>
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
              <Rrc />
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminRRCPage)
