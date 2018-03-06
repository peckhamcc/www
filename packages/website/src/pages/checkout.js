import React, { Component } from 'react'
import styled from 'styled-components'
import { Break, PageWrapper, Panel, Hero } from '../components/panels'
import checkoutBackground from '../../assets/checkout-bg.jpg'
import Checkout from '../components/checkout'

class CheckoutPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={checkoutBackground.src} />
        <Panel>
          <h2>Checkout</h2>
          <Checkout />
        </Panel>
      </PageWrapper>
    )
  }
}

export default CheckoutPage
