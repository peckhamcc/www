import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { signOut } from '../store/actions'
import {
  FlexContainerCentered,
  FlexContentLeft,
  ModalBlocker,
  Break
} from './panels'
import { spacing } from '../units'
import onscrolling from 'onscrolling'
import { Flag } from '../lib/flags'
import { config } from '@peckhamcc/config'
import { ContentfulMenu } from './contentful-menu'
import Logo from './logo'

const HAMBUGER_BREAK = 800

const CartContentsCount = styled.div`
  color: #fff;
  background-color: #f10;
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
  padding: 0 0 0 0;
  height: 67px;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 500;
  position: fixed;
  background-color: #fff;
`

const LongMenu = styled.div`
  @media (max-width: ${HAMBUGER_BREAK}px) {
    display: none;
  }
`

const HamburgerMenu = styled.div`
  margin: 15px 0 0 15px;

  @media (min-width: ${HAMBUGER_BREAK + 1}px) {
    display: none;
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
    color: #f10;
  }
`

const CartLink = styled(NavLink)`
  font-size: 24px;
  margin-right: 0;
`

const ProfileLink = styled(NavLink)`
  font-size: 24px;
  margin-right: ${spacing(1)};
`

const SiteNav = styled(FlexContentLeft)`
  padding: ${spacing(1)} 0 0 ${spacing(2)};
`

const MobileNav = styled.ul`
  background: #fff;
  margin: 0;
  padding: 10px;

  li {
    display: block;
    padding: 10px;
  }

  @media (min-width: ${HAMBUGER_BREAK + 1}px) {
    display: none;
  }
`

const UserNav = styled.ul`
  background: #fff;
  margin: 0;
  padding: 10px 50px 10px 20px;
  float: right;

  li {
    display: block;
    padding: 10px;
    padding-right: 0;
  }
`

const SiteIcon = styled.div`
  padding: 5px 0 0 0;
  position: absolute;
  top: 2;
  left: 50vw;
  margin-left: -55px;
  svg{width: 110px;}
`

const AccountNav = styled.div`
  padding: ${spacing(1)} ${spacing(2)} 0 0;
  position: absolute;
  top: 0;
  right: 0;
`

const TopBreak = styled(Break)`
  margin-top: 15px;
`

class NavBarWrapper extends Component {
  static propTypes = {
    cart: PropTypes.array.isRequired,
    user: PropTypes.object,
    signOut: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  }

  state = {
    bgOpacity: 0,
    menuOpen: false
  }

  componentDidMount () {
    onscrolling(this.handleScroll)
  }

  componentWillUnmount () {
    onscrolling.remove(this.handleScroll)
  }

  handleScroll = () => {
    const { pageYOffset } = window

    this.setState({
      bgOpacity: pageYOffset < 100 ? pageYOffset / 100 : 1
    })
  }

  handleToggleDropDownMenu = () => {
    this.setState(s => ({
      menuOpen: !s.menuOpen
    }))
  }

  handleToggleDropDownUserMenu = () => {
    this.setState(s => ({
      userMenuOpen: !s.userMenuOpen
    }))
  }

  handleSignOut = async (event) => {
    event.preventDefault()

    this.props.signOut()

    try {
      await globalThis.fetch(config.lambda.accountTokenInvalidate, {
        method: 'DELETE',
        headers: {
          Authorization: this.props.token
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    const {
      cart
    } = this.props
    const { menuOpen, userMenuOpen } = this.state

    const cartContents = cart.reduce((acc, curr) => {
      return acc + curr.quantity
    }, 0)

    return (
      <NavBar>
        <SiteIcon>
          <Link to='/'>
            <Logo />
          </Link>
        </SiteIcon>

        <LongMenu>
          <FlexContainerCentered>
            <SiteNav>
              <ContentfulMenu />
              <Flag name={['shop']}>
                <NavLink>
                  <Link to='/shop'>Shop</Link>
                </NavLink>
              </Flag>
            </SiteNav>
          </FlexContainerCentered>
        </LongMenu>

        <HamburgerMenu onClick={this.handleToggleDropDownMenu}>
          <FaBars />
        </HamburgerMenu>

        <AccountNav>
          <ProfileLink onClick={this.handleToggleDropDownUserMenu}>
            <FaUser />
          </ProfileLink>
          <Flag name={['shop']}>
            <CartLink>
              <Link to='/basket' style={{ position: 'relative' }}>
                {cartContents
                  ? (
                    <CartContentsCount>{cartContents}</CartContentsCount>
                    )
                  : null}
                <FaShoppingCart />
              </Link>
            </CartLink>
          </Flag>
        </AccountNav>

        {userMenuOpen && (
          <ModalBlocker
            onClick={this.handleToggleDropDownUserMenu}
            style={{ top: 59 }}
          >
            <UserNav>
              {this.props.token
                ? (
                  <>
                    {this.props.user && this.props.user.admin
                      ? (
                        <NavLink>
                          <Link to='/admin'>Club Admin</Link>
                        </NavLink>
                        )
                      : null}
                    <NavLink>
                      <Link to='/profile'>Profile</Link>
                    </NavLink>
                    <NavLink>
                      <a onClick={this.handleSignOut} href='#'>
                        Log out
                      </a>
                    </NavLink>
                  </>
                  )
                : (
                  <>
                    <NavLink>
                      <Link to='/profile'>Log in</Link>
                    </NavLink>
                  </>
                  )}
            </UserNav>
          </ModalBlocker>
        )}

        {menuOpen && (
          <ModalBlocker
            onClick={this.handleToggleDropDownMenu}
            style={{ top: 60 }}
          >
            <MobileNav>
              <ContentfulMenu mobile />

              <Flag name={['shop']}>
                <NavLink>
                  <Link to='/shop'>Shop</Link>
                </NavLink>
              </Flag>
            </MobileNav>
          </ModalBlocker>
        )}

        <TopBreak />
      </NavBar>
    )
  }
}

const mapStateToProps = ({ shop: { cart }, user, session: { token } }) => ({
  cart,
  user,
  token
})

const mapDispatchToProps = {
  signOut
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavBarWrapper)
)
