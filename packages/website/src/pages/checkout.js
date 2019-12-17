import React, { Component } from 'react'
import { PageWrapper, Panel, Hero, Breadcrumb } from '../components/panels'
import checkoutBackground from '../../assets/checkout-bg.jpg'
import CheckoutTransfer from '../components/checkout-transfer'
import CheckoutPayment from '../components/checkout-payments'
import { Flag } from '../lib/flags'

class CheckoutPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={checkoutBackground.src} />
        <Panel>
          <Breadcrumb section={{ title: 'Checkout' }} />
          <h2>Checkout</h2>
          <Flag
            name='payments'
            component={CheckoutPayment}
            fallbackComponent={CheckoutTransfer}
          />
        </Panel>
      </PageWrapper>
    )
  }
}

export default CheckoutPage
