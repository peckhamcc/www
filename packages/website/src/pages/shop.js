import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Break, PageWrapper, Panel, ShopListItem } from '../components/panels'
import ridesBackground from '../../assets/rides-bg.jpg'
import styled from 'styled-components'
import config, { SECTIONS } from '../config'

const Hero = styled.div`
  background-image: url(${ridesBackground.src});
  background-size: cover;
  background-position: center center;
  height: 10vh;
`

const Section = styled.div`
  width: 23%;
  display: inline-block;

`

class ShopPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero />
        <Break />
        <Panel>
          <h2>Shop</h2>
          {
            Object.keys(SECTIONS).map((key, index) => {
              return (
                <ShopListItem item={SECTIONS[key]} key={index} />
              )
            })
          }
        </Panel>
      </PageWrapper>
    )
  }
}

export default ShopPage
