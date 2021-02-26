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
import WithFoPCC from '../components/with-fopcc'
import WithProducts from '../components/shop/with-products'

class CheckoutPage extends Component {
  render () {
    return (
      <WithUser redirect='/checkout'>
        <WithFoPCC>
          <PageWrapper>
            <Hero background={checkoutBackground} />
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
        </WithFoPCC>
      </WithUser>
    )
  }
}

export default CheckoutPage
