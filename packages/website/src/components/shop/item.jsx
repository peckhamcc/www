import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  ShopItemPanel,
  Breadcrumb
} from './panels'
import styled from 'styled-components'
import Product from './product'

const Items = styled.div`
  text-align: center;
`

const Section = ({ section }) => {
  const products = section.items

  return (
    <>
      <Breadcrumb section={section} />
      <h2>{section.name}</h2>
      <Items>
        {
          products.length ? products.map(product => <ShopItemPanel item={product} key={product.slug} />) : <p>Sorry this section does not have any products at the moment, please check back soon!</p>
        }
      </Items>
    </>
  )
}

class ItemPanel extends Component {
  render () {
    const {
      slug,
      slugLookup
    } = this.props

    let section = slugLookup[slug]
    let product

    if (section.section) {
      product = section
      section = slugLookup[product.section]
    }

    if (!section && !product) {
      window.location = '/shop'
    }

    return (
      <>
        {section && !product && <Section section={section} />}
        {product && <Product section={section} product={product} />}
      </>
    )
  }
}

const mapStateToProps = ({ shop: { slugLookup } }) => ({
  slugLookup
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPanel)
