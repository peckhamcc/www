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

const SECTION_DESCRIPTIONS = {
  jerseys: (
    <>
      <p>Jerseys are available in a regular Club fit or a slimmer Pro version.</p>
      <p>If you are unsure on sizing or have questions, please email <a href='mailto:info@kalas.co.uk'>info@kalas.co.uk</a> with your measurements for advice.</p>
    </>
  ),
  outerwear: (
    <>
      <p>Outerwear is available in a regular Club fit or a slimmer Pro version.</p>
      <p>If you are unsure on sizing or have questions, please email <a href='mailto:info@kalas.co.uk'>info@kalas.co.uk</a> with your measurements for advice.</p>
    </>
  ),
  'skin-suits': (
    <>
      <p>Please email <a href='mailto:info@kalas.co.uk'>info@kalas.co.uk</a> with your measurements for sizing advice.</p>
    </>
  )
}

const sectionDescription = (slug) => {
  if (SECTION_DESCRIPTIONS[slug]) {
    return SECTION_DESCRIPTIONS[slug]
  }

  return null
}

const Section = ({ section }) => {
  const products = section.items

  return (
    <>
      <Breadcrumb section={section} />
      <h2>{section.name}</h2>
      {sectionDescription(section.slug)}
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
