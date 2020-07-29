import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
import {
  PageWrapper,
  Panel,
  ShopListItem,
  Hero
} from '../components/panels'
import shopBackground from '../../assets/shop-bg.jpg'
import styled from 'styled-components'
import {
  SECTIONS
} from '../config'

const Items = styled.div`
  text-align: center;
`

class ShopPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={shopBackground.src} />
        <Panel>
          <p>
            Our Kit is made to order, and is only availabe to <Link to='/membership'>friends of Peckham CC</Link>, our
            voluntary membership scheme.
          </p>
          <p>
            However, everyone is welcome to buy our musettes (tote bags), bidons (bottles) or casquettes (bike caps)
            from <a href='https://ratracecycles.com/'>Rat Race Cycles</a>.
          </p>
        </Panel>
        <Panel>
          <h2>Shop</h2>
          <Items>
            {
              Object.keys(SECTIONS).map((key, index) => {
                return (
                  <ShopListItem item={SECTIONS[key]} key={index} />
                )
              })
            }
          </Items>
        </Panel>
      </PageWrapper>
    )
  }
}

export default ShopPage
