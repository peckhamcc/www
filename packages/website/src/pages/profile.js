import React, {
  Component
} from 'react'
import styled from 'styled-components'
import {
  connect
} from 'react-redux'
import WithUser from '../components/with-user'
import {
  PageWrapper,
  Panel,
  InnerPanel,
  ShortHero,
  Button
} from '../components/panels'
import Orders from '../components/profile/orders'
import Details from '../components/profile/details'
import heroBackground from '../../assets/bg-7.jpg'
import {
  expiredToken
} from '../store/actions'
import {
  lightAccent
} from '../colours'
import {
  spacing
} from '../units'

const TABS = {
  details: 'DETAILS',
  orders: 'ORDERS'
}

const TabHolder = styled.div``

const Tab = styled(Button)`
  border: none;
  background-color: ${props => props.selected ? lightAccent : 'transparent'};
  padding: ${spacing(0.5)} ${spacing(1)};
  margin-bottom: 0;
`

const TabContent = styled(InnerPanel)`
  margin-top: 0;
`

class ProfilePage extends Component {
  state = {
    tab: TABS.details
  }

  handleSwitchTab = (tab) => {
    this.setState({
      tab
    })
  }

  render () {
    const {
      tab
    } = this.state

    const tabs = {
      [TABS.details]: (
        <>
          <h3>Your details</h3>
          <Details />
        </>
      ),
      [TABS.orders]: (
        <>
          <h3>Kit orders</h3>
          <Orders />
        </>
      )
    }

    return (
      <WithUser redirect='/profile'>
        <PageWrapper>
          <ShortHero background={heroBackground.src} />
          <Panel>
            <h2>Profile</h2>
            <p>Hello {this.props.user.name}</p>

            <TabHolder>
              <Tab selected={tab === TABS.details} onClick={() => this.handleSwitchTab(TABS.details)}>Details</Tab>
              <Tab selected={tab === TABS.orders} onClick={() => this.handleSwitchTab(TABS.orders)}>Orders</Tab>
            </TabHolder>
            <TabContent>{tabs[tab]}</TabContent>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
