import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Break, PageWrapper, Panel, ShopListItem, Hero } from '../components/panels'
import shopBackground from '../../assets/shop-bg.jpg'
import styled from 'styled-components'
import config, { SECTIONS } from '../config'

const Section = styled.div`
  width: 23%;
  display: inline-block;

`

const Items = styled.div`
  text-align: center;
`

class ShopPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={shopBackground.src} />
        <Panel>
          <h2>Shop</h2>
          <Items>
            {
              Object.keys(SECTIONS).map((key, index) => {
                return (
                  <ShopListItem item={SECTIONS[key]} key={index} />
                )
              })
            }
          </Items>
        </Panel>
      </PageWrapper>
    )
  }
}

export default ShopPage
