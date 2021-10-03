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
import Kit from '../components/admin/kit'
import heroBackground from '../../assets/bg-7.jpg'
import {
  TabHolder,
  Tab,
  TabContent
} from '../components/profile/panels'

class AdminKitPage extends Component {
  render () {
    return (
      <WithUser redirect='/admin/kit'>
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
              {
                this.props.user.rrcAdmin
                  ? (
                    <Tab>
                      <Link to='/admin/rrc'>RRC</Link>
                    </Tab>
                    )
                  : null
              }
              <Tab selected>
                Kit
              </Tab>
            </TabHolder>
            <TabContent>
              <Kit />
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminKitPage)
