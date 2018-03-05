import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ShoppingCartIcon from 'react-icons/lib/fa/shopping-cart'
import HamburgerMeunIcon from 'react-icons/lib/fa/bars'
import { Link, withRouter } from 'react-router-dom'
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
import navBackground from '../../assets/nav-gradient.png'
import { Break } from './panels'
import { spacing } from '../units'

const CartContentsCount = styled.div`
  color: #FFF;
  background-color: #F10;
  border-radius: ${spacing(1)};
  font-size: ${spacing(1)};
  font-weight: bold;
  text-align: center;
  padding: 2px 5px;
  position: absolute;
  top: -5px;
  right: -10px;
`

const NavBar = styled.nav`
  padding: 10px 0 0 0;
  height: 60px;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 500;
  position: fixed;
`

const NavBarUnderlay = styled.nav`
  height: 100px;
  top: 8px;
  left: 0;
  right: 0;
  z-index: 400;
  position: absolute;
  background-image: url(${navBackground.src});
  background-repeat: repeat;
  background-position: left top;
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
  font-size: 18px;

  a {
    text-decoration: none;
    color: #333;
  }
  a:hover {
    text-decoration: underline;
    color: #F10;
  }
`

const CartLink = NavLink.extend`
  font-size: 24px;
`

const SiteNav = FlexContentLeft.extend`
  padding: ${spacing(1)} 0 0 ${spacing(2)};
`

const SiteIcon = styled.div`
  padding: 5px 0 0 0;
  position: absolute;
  top: 10px;
  left: 50vw;
  margin-left: -25px;
`

const AccountNav = FlexContentRight.extend`
  padding: ${spacing(1)} ${spacing(2)} 0 0;
`

class NavBarWrapper extends Component {
  static propTypes = {
    cart: PropTypes.array.isRequired,
    user: PropTypes.object,
    signOut: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  }

  state = {
    bgOpacity: 0
  }

  componentDidMount () {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { documentElement: { scrollTop } } = document

    this.setState({
      bgOpacity: scrollTop < 100 ? scrollTop/100 : 1,
      paddingTop: scrollTop > 10 ? 0 : 10 - scrollTop
    })
  }

  render () {
    const { cart, user, signOut, location: { pathname } } = this.props
    const { bgOpacity, paddingTop } = this.state
    let logoOpacity = 1

    if (pathname === '/') {
      logoOpacity = bgOpacity
    }

    return (
      <div>
        <NavBarUnderlay />
        <NavBar style={{
          backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`,
          paddingTop
        }}>
          <LongMenu>
            <SiteIcon style={{
              opacity: logoOpacity,
              top: paddingTop
            }}>
              <Link to='/'>
                <img src={pccAvatar} height="50" width="50" />
              </Link>
            </SiteIcon>

            <FlexContainerCentered>
              <SiteNav>
                <NavLink>
                  <Link to='/'>Home</Link>
                </NavLink>
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
    
              <AccountNav>
                <CartLink>
                  <Link to='/basket' style={{position: 'relative'}}>
                    {cart.length ? <CartContentsCount>{cart.length}</CartContentsCount> : null}
                    <ShoppingCartIcon />
                  </Link>
                </CartLink>
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

        </NavBar>
      </div>
    )
  }
}

const mapStateToProps = ({ shop: { cart }, user: { user } }) => ({
  cart,
  user
})

const mapDispatchToProps = {
  signOut: signOut
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarWrapper))
