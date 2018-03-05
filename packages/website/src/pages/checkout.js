import React, { Component } from 'react'
import styled from 'styled-components'
import { Break, PageWrapper, Panel } from '../components/panels'
import checkoutBackground from '../../assets/checkout-bg.jpg'
import Checkout from '../components/checkout'

const Hero = styled.div`
  background-image: url(${checkoutBackground.src});
  background-size: cover;
  background-position: center top;
  height: 60vh;
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
