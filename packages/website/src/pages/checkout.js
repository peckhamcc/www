import React, { Component } from 'react'
import {
  PageWrapper,
  Panel,
  Hero
} from '../components/panels'
import {
  Breadcrumb
} from '../components/shop/panels'
import checkoutBackground from '../../assets/checkout-bg.jpg'
import CheckoutTransfer from '../components/shop/checkout-transfer'
import CheckoutPayment from '../components/shop/checkout-payments'
import {
  Flag
} from '../lib/flags'
import WithUser from '../components/with-user'
import WithProducts from '../components/shop/with-products'

class CheckoutPage extends Component {
  render () {
    return (
      <WithUser redirect='/checkout'>
        <PageWrapper>
          <Hero background={checkoutBackground.src} />
          <Panel>
            <Breadcrumb section={{ name: 'Checkout' }} />
            <h2>Checkout</h2>
            <WithProducts>
              <Flag
                name={['payments']}
                component={CheckoutPayment}
                fallbackComponent={CheckoutTransfer}
              />
            </WithProducts>
          </Panel>
        </PageWrapper>
      </WithUser>
    )
  }
}

export default CheckoutPage
