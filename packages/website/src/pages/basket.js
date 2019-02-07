import React, {
  Component
} from 'react'
import {
  PageWrapper,
  Panel,
  Breadcrumb,
  Hero
} from '../components/panels'
import basketBackground from '../../assets/basket-bg.jpg'
import Basket from '../components/basket'

class BasketPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={basketBackground.src} />
        <Panel>
          <Breadcrumb section={{ title: 'Basket' }} />
          <h2>Basket</h2>
          <Basket />
        </Panel>
      </PageWrapper>
    )
  }
}

export default BasketPage
