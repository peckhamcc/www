import React, {
  Component
} from 'react'
import {
  PageWrapper,
  Panel,
  Hero
} from '../components/panels'
import {
  Breadcrumb
} from '../components/shop/panels'
import basketBackground from '../../assets/basket-bg.jpg'
import Basket from '../components/shop/basket'
import WithProducts from '../components/shop/with-products'

class BasketPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={basketBackground.src} />
        <Panel>
          <Breadcrumb section={{ name: 'Basket' }} />
          <h2>Basket</h2>
          <WithProducts>
            <Basket />
          </WithProducts>
        </Panel>
      </PageWrapper>
    )
  }
}

export default BasketPage
