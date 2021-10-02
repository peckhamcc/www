import React from 'react'
import {
  useHistory
} from 'react-router-dom'
import {
  connect
} from 'react-redux'
import WithUser from '../components/with-user'

function AdminPage ({ user }) {
  const history = useHistory()

  if (user.membersAdmin) {
    history.push('/admin/members')
    return null
  }

  if (user.kitAdmin) {
    history.push('/admin/kit')
    return null
  }

  if (user.rrcAdmin) {
    history.push('/admin/rrc')
    return null
  }

  if (user) {
    history.push('/')
    return null
  }

  return (
    <WithUser redirect='/admin' />
  )
}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
