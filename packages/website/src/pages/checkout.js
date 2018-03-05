import React, { Component } from 'react'
import styled from 'styled-components'
import { Break, PageWrapper, Panel } from '../components/panels'
import ridesBackground from '../../assets/rides-bg.jpg'
import Checkout from '../components/checkout'

const Hero = styled.div`
  background-image: url(${ridesBackground.src});
  background-size: cover;
  background-position: center center;
  height: 40vh;
`

class CheckoutPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero />
        <Panel>
          <h2>Checkout</h2>
          <Checkout />
        </Panel>
      </PageWrapper>
    )
  }
}

export default CheckoutPage
