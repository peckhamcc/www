import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccessAlarm from 'material-ui-icons/AccessAlarm'
import ThreeDRotation from 'material-ui-icons/ThreeDRotation'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class Navigation extends Component {
  state = {
    auth: true,
    anchorEl: null,
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes } = this.props
    const { auth, anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/rides'>Rides</Link></li>
          <li><Link to='/equipment'>Equipment</Link></li>
          <li><Link to='/routes'>Routes</Link></li>
          <li><Link to='/shop'>Shop</Link></li>
        </ul>
      </div>
    )
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default Navigation