import React, { Component } from 'react'
import styled from 'styled-components'
import { PageWrapper, Panel } from '../components/panels'
import basketBackground from '../../assets/basket-bg.jpg'
import Basket from '../components/basket'

const Hero = styled.div`
  background-image: url(${basketBackground.src});
  background-size: cover;
  background-position: center top;
  height: 60vh;
`

class BasketPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero />
        <Panel>
          <h2>Basket</h2>
          <Basket />
        </Panel>
      </PageWrapper>
    )
  }
}

export default BasketPage
