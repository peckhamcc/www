import React, {
  Component
} from 'react'
import {
  PageWrapper,
  Panel,
  ShortHero
} from '../components/panels'
import shopBackground from '../../assets/shop-bg.jpg'
import WithProducts from '../components/shop/with-products'
import ItemPanel from '../components/shop/item'
class ItemPage extends Component {
  render () {
    const {
      match: {
        params: {
          slug
        }
      }
    } = this.props

    return (
      <PageWrapper>
        <ShortHero background={shopBackground} />
        <Panel>
          <WithProducts>
            <ItemPanel slug={slug} />
          </WithProducts>
        </Panel>
      </PageWrapper>
    )
  }
}

export default ItemPage
