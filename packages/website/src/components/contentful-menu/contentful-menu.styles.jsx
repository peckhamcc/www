import styled, { css } from 'styled-components'

export const NavLink = styled.div`
  list-style: none;
  display: inline-block;
  margin: 0px;
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

export const NavMenu = styled.div`
  display: inline-block;
  margin: 0;
  padding: 0;

  > a {
    font-size: 18px;
    text-decoration: none;
    color: #333;
    padding: 0;
    margin: 0 0px 0 0;
  }
  a:hover {
    text-decoration: underline;
    color: #f10;
  }

  ul {
    display: none;
  }

  :hover {
    ul {
      background-color: #fff;
      display: block;
      margin: 0 0 0 -15px;
      padding: 20px 10px 5px 10px;
      min-width: 100px;
      position: absolute;

      li {
        display: block;
        margin: 5px 5px 15px 5px;
      }
    }
  }

  ${({ mobile = false }) =>
    mobile &&
    css`
      ul {
        display: block;
      }
      :hover {
        ul {
          position: relative;
          margin: 0 0 0 0;
          padding: 0 0 0 40px;
          li {
            display: block;
            margin: 0 0 0 0;
          }
        }
      }
    `}
`

export const NavItem = styled.li`
  list-style: none;
  display: inline-block;
  margin-right: 20px;
  font-size: 18px;
`
