import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  connect
} from 'react-redux'
import WithUser from '../components/with-user'
import {
  PageWrapper,
  Panel,
  ShortHero,
  Button
} from '../components/panels'
import heroBackground from '../../assets/bg-7.jpg'

class ProfilePage extends Component {
  render () {
    return (
      <WithUser redirect='/profile'>
        <PageWrapper>
          <ShortHero background={heroBackground.src} />
          <Panel>
            <h2>Profile</h2>
            <p>Hello {this.props.user.name}</p>
            <p>
              <Button>Manage your profile</Button>
            </p>
            <h3>Friends of PCC</h3>
            <p>You are a Friend of PCC.  Your membership will renew on 12th Dec 2021.</p>
            <p>
              <Button>Manage your membership</Button>
            </p>
            <h3>Kit orders</h3>
            <p>You have no outstanding kit orders</p>
            <h3>Training sessions</h3>
            <p>You have no upcoming training sessions</p>
          </Panel>
        </PageWrapper>
      </WithUser>
    )
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = ({ session: { token, tokenExpired }, user }) => ({
  user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
