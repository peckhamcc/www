import React, {
  Component
} from 'react'
import {
  Button,
  CentredPanel
} from './panels'
import {
  connect
} from 'react-redux'
import {
  Link
} from 'react-router-dom'
import clubLogo from '../../assets/pcc-logo-round.png'

class WithFoPCC extends Component {
  render () {
    const {
      user,
      children
    } = this.props

    if (user.fopcc && ((user.fopcc.status === 'active') || (user.fopcc.bc && user.fopcc.expires > Date.now()))) {
      return children
    }

    return (
      <>
        <CentredPanel>
          <img src={clubLogo} width='300' height='300' />
          <h3>Friends of PCC only</h3>
          <p>To access this area you must be a <Link to='/membership'>Friend of PCC</Link>, our voluntary membership scheme.</p>
          <p>Don't worry though, it is open to all!</p>
          <Button centred><Link to='/profile/fopcc'>Join Friends of PCC</Link></Button>
          <p>If you have a valid Friends of PCC membership and are seeing this message, please <Link to='/contact'>contact us</Link>.</p>
        </CentredPanel>
      </>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(WithFoPCC)
