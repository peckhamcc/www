import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Break, PageWrapper, Panel, ShopListItem, Breadcrumb } from '../components/panels'
import ridesBackground from '../../assets/rides-bg.jpg'
import styled from 'styled-components'
import config, { SECTIONS } from '../config'
import Product from '../components/product'

const Hero = styled.div`
  background-image: url(${ridesBackground});
  background-size: cover;
  background-position: center center;
  height: 10vh;
`

const Section = ({ section }) => {
  const products = config.store.products.filter(product => product.section.slug === section.slug)

  return (
    <Fragment>
      <Breadcrumb section={section} />
      <h2>{section.title}</h2>
      {
        products.length ? products.map(product => <ShopListItem item={product} key={product.slug} />) : <p>Sorry this section does not have any products at the moment, please check back soon!</p>
      }
    </Fragment>
  )
}

class ItemPage extends Component {
  render (props) {
    const {
      match: {
        params: {
          slug
        }
      }
    } = this.props

    const section = SECTIONS[Object.keys(SECTIONS).find(key => SECTIONS[key].slug === slug)]
    const product = config.store.products.find(product => product.slug === slug)

    if (!section && !product) {
      window.location = '/shop'
    }

    return (
      <PageWrapper>
        <Hero />
        <Break />
        <Panel>
          {section && <Section section={section} />}
          {product && <Product product={product} />}
        </Panel>
      </PageWrapper>
    )
  }
}

export default ItemPage
