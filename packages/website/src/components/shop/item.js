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
      categories,
      slug
    } = this.props

    let section = Object.keys(categories).map(id => categories[id]).find(category => category.slug === slug)
    const product = Object.keys(categories).reduce((acc, id) => {
      return acc.concat(categories[id].items)
    }, []).find(product => product.slug === slug)

    if (product) {
      section = categories[product.category]
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

const mapStateToProps = ({ shop: { categories } }) => ({
  categories
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPanel)
