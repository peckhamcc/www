import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
import {
  connect
} from 'react-redux'
import {
  PageWrapper,
  Panel,
  ShortHero
} from '../components/panels'
import {
  ShopCategoryPanel
} from '../components/shop/panels'
import shopBackground from '../../assets/shop-bg.jpg'
import styled from 'styled-components'
import WithProducts from '../components/shop/with-products'

const Items = styled.div`
  text-align: center;
`

class ShopPage extends Component {
  render () {
    return (
      <PageWrapper>
        <ShortHero background={shopBackground} />
        <Panel>
          <h2>Shop</h2>
          <p>Our cycling kit is made to order, and is only available to <Link to='/membership'>Friends of Peckham CC</Link>, our voluntary membership scheme. </p>
          <p>If you are unsure on sizing or have questions, please email <a href='mailto:info@kalas.co.uk'>info@kalas.co.uk</a> with your measurements for advice.</p>
          <WithProducts>
            <Items>
              {
                this.props.sections
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .filter(section => section.slug !== 'unknown')
                  .map(section => {
                    return (
                      <ShopCategoryPanel item={section} key={section.slug} />
                    )
                  })
              }
            </Items>
          </WithProducts>
        </Panel>
      </PageWrapper>
    )
  }
}

const mapStateToProps = ({ shop: { sections } }) => ({
  sections
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
