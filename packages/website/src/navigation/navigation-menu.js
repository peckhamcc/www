import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  IconButton,
  Menu,
  MenuItem
} from 'material-ui'

class MenuIcon extends Component {
  state = {
    anchor: null
  }

  openMenu = (event) => {
    this.setState({
      anchor: event.currentTarget
    })
  }

  closeMenu = () => {
    this.setState({
      anchor: null
    })
  }

  render() {
    const { classes, children, id, icon, options } = this.props
    const { anchor } = this.state
    const open = Boolean(anchor)

    return (
      <Fragment>
        <IconButton
          aria-owns={open ? id : null}
          aria-haspopup='true'
          onClick={this.openMenu}
          color='contrast'
        >
          {icon}
        </IconButton>
        <Menu
          id={id}
          anchorEl={anchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.closeMenu}
        >
          {options.map((option, index) => <MenuItem key={index} onclick={this.closeMenu}>{option}</MenuItem>)}
        </Menu>
      </Fragment>
    )
  }
}

MenuIcon.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
}

export default MenuIcon
