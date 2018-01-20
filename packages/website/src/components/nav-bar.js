import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ShoppingCartIcon from 'react-icons/lib/fa/shopping-cart'
import HamburgerMeunIcon from 'react-icons/lib/fa/bars'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { signOut } from '../store/actions'
import {
  FlexContainerCentered,
  FlexContentLeft,
  FlexContentCenter,
  FlexContentRight
} from './panels'
import pccAvatar from '../../assets/pcc-logo-round.png'
import { Break } from './panels'

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

const NavBar = styled.nav`
  padding: 0;
  margin: 0;
  background-color: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 500;
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

const NavLink = styled.li`
  list-style: none;
  display: inline-block;
  margin-right: 20px;
  font-size: 16px;

  a {
    text-decoration: none;
    color: #333;
  }
  a:hover {
    text-decoration: underline;
    color: #F10;
  }
`

const SiteNav = FlexContentLeft.extend`
  padding: 15px 0 0 30px;
`

const SiteIcon = FlexContentCenter.extend`
  padding: 5px 0 0 0;
`

const AccountNav = FlexContentRight.extend`
  padding: 15px 30px 0 0;
`

const NavBarWrapper = ({ cart, user, signOut }) => {
  return (
    <NavBar>
      <LongMenu>
        <FlexContainerCentered>
          <SiteNav>
            <NavLink>
              <Link to='/rides'>Rides</Link>
            </NavLink>
            <NavLink>
              <Link to='/routes'>Routes</Link>
            </NavLink>
            <NavLink>
              <Link to='/shop'>Shop</Link>
            </NavLink>
          </SiteNav>

          <SiteIcon>
            <Link to='/'>
              <img src={pccAvatar} height="50" width="50" />
            </Link>
          </SiteIcon>

          <AccountNav>
              <Link to='/shop/basket' style={{position: 'relative'}}>
              {cart.length ? <CartContentsCount>{cart.length}</CartContentsCount> : null}
              <ShoppingCartIcon />
            </Link>
            {user ? (
              <Fragment>
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
            ) : null}
          </AccountNav>
        </FlexContainerCentered>
      </LongMenu>

      <HamburgerMenu>
        <HamburgerMeunIcon />
      </HamburgerMenu>

      <Break />
    </NavBar>
  )
}

NavBar.propTypes = {
  cart: PropTypes.array.isRequired,
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired
}

const mapStateToProps = ({ shop: { cart }, user: { user } }) => ({
  cart,
  user
})

const mapDispatchToProps = {
  signOut: signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarWrapper)
