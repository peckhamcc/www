import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import {
  AccountCircle,
  ShoppingBasket,
  Menu
} from 'material-ui-icons'
import NavigationMenu from './navigation-menu'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from 'material-ui'
import styled from 'styled-components'
import { connect } from 'react-redux'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const CartContentsCount = styled.div`
  color: #FFF;
  background-color: #F10;
  border-radius: 15px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  padding: 2px 5px;
  position: absolute;
  top: 10px;
  left: 10px;
`

const LongMenu = styled.div`
  @media (max-width: 640px) {
    display: none
  }
`

const HamburgerMenu = styled.div`
  @media (min-width: 641px) {
    display: none
  }
`

class MenuAppBar extends Component {
  state = {
    auth: true,
    mainMenuAnchor: null,
    accountMenuAnchor: null
  }

  render() {
    const { classes, cart } = this.props;
    const { auth, mainMenuAnchor, accountMenuAnchor } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <LongMenu>
              <Button component={({...props}) => <Link to='/' {...props} />}>Home</Button>
              <Button component={({...props}) => <Link to='/shop' {...props} />}>Shop</Button>
              <Button component={({...props}) => <Link to='/rides' {...props} />}>Rides</Button>
              <Button component={({...props}) => <Link to='/equipment' {...props} />}>Equipment</Button>
              <Button component={({...props}) => <Link to='/routes' {...props} />}>Routes</Button>
            </LongMenu>
            <HamburgerMenu>
              <NavigationMenu
                id='menu-appbar-navigation'
                icon={<Menu />}
                options={[
                  <Button component={({...props}) => <Link to='/' {...props} />}>Home</Button>,
                  <Button component={({...props}) => <Link to='/shop' {...props} />}>Shop</Button>,
                  <Button component={({...props}) => <Link to='/rides' {...props} />}>Rides</Button>,
                  <Button component={({...props}) => <Link to='/equipment' {...props} />}>Equipment</Button>,
                  <Button component={({...props}) => <Link to='/routes' {...props} />}>Routes</Button>
                ]}
              />
            </HamburgerMenu>
            
            <Typography type='title' color='inherit' className={classes.flex}>
              <Link to='/'>[]</Link>
            </Typography>
            {auth && (
              <Fragment>
                <Button component={({...props}) => <Link to='/shop/basket' {...props} />} style={{position: 'relative'}}>
                  {cart.length ? <CartContentsCount>{cart.length}</CartContentsCount> : null}
                  <ShoppingBasket />
                </Button>
                <NavigationMenu
                  id='menu-appbar-account'
                  icon={<AccountCircle />}
                  options={[
                    <Button component={({...props}) => <Link to='/account' {...props} />}>My account</Button>,
                    <Button component={({...props}) => <Link to='/orders' {...props} />}>My orders</Button>,
                    <Button component={({...props}) => <Link to='/logout' {...props} />}>Log out</Button>
                  ]}
                />
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired
}

const mapStateToProps = ({ shop: { cart } }) => ({
  cart: cart
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MenuAppBar))
