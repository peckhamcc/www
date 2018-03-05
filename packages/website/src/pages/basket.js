import React, { Component } from 'react'
import styled from 'styled-components'
import { PageWrapper, Panel } from '../components/panels'
import ridesBackground from '../../assets/rides-bg.jpg'
import Basket from '../components/basket'

const Hero = styled.div`
  background-image: url(${ridesBackground.src});
  background-size: cover;
  background-position: center center;
  height: 40vh;
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
