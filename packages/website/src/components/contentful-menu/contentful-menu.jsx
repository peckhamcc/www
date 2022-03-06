import React, { useState, useEffect } from 'react'
import { getMainMenu } from '../../shared/menu'
import { NavLink, NavMenu, NavItem } from './contentful-menu.styles'
import { Link } from 'react-router-dom'

export const ContentfulMenu = ({ mobile = false }) => {
  const [menu, setMenu] = useState(null)

  const getData = async () => {
    const menuContentful = await getMainMenu()
    setMenu(menuContentful)
  }

  useEffect(() => {
    getData()
  }, [])

  return !menu
    ? (
      <></>
      )
    : (
      <>
        {menu?.fields?.items.map((topItem, key) => (
          <NavItem key={key}>
            {topItem?.fields?.items
              ? (
                <NavMenu mobile={mobile}>
                  {topItem.fields.url
                    ? (
                      <>
                        <Link to={topItem.fields.url}>{topItem.fields.title}</Link>
                        <ul>
                          {topItem?.fields?.items.map((subItem, subKey) => (
                            <NavItem key={subKey}>
                              <NavLink>
                                <Link to={subItem.fields.url}>
                                  {subItem.fields.title}
                                </Link>
                              </NavLink>
                            </NavItem>
                          ))}
                        </ul>
                      </>
                      )
                    : (
                      <>
                        <div>{topItem.fields.title}</div>
                        <ul>
                          {topItem?.fields?.items.map((subItem, subKey) => (
                            <NavItem key={subKey}>
                              <NavLink>
                                <Link to={subItem.fields.url}>
                                  {subItem.fields.title}
                                </Link>
                              </NavLink>
                            </NavItem>
                          ))}
                        </ul>
                      </>
                      )}
                </NavMenu>
                )
              : (
                <NavLink>
                  {topItem.fields.url
                    ? (
                      <Link to={topItem.fields.url}>{topItem.fields.title}</Link>
                      )
                    : (
                      <a>{topItem.fields.title}</a>
                      )}
                </NavLink>
                )}
          </NavItem>
        ))}
      </>
      )
}
