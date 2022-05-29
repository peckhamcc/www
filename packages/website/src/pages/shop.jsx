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
          <p>
            Our kit is made to order, and is only available to <Link to='/membership'>Friends of Peckham CC</Link>, our
            voluntary membership scheme.
          </p>
          <p>
            However, everyone is welcome to buy our musettes (tote bags), bidons (bottles) or casquettes (bike caps)
            from <a href='https://ratracecycles.com/'>Rat Race Cycles</a>.
          </p>
        </Panel>
        <Panel>
          <h2>Shop</h2>
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
