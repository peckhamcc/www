import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from '../components/panels'
import styled from 'styled-components'
import Modal from './modal'
import ProductDetails from './product-details'
import ImageViewer from './product-images'

const ProductHolder = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 940px) {
    flex-direction: column;
  }
`

const Product = ({ product }) => {
  return (
    <Fragment>
      <Breadcrumb section={product.section} product={product} />
      <ProductHolder>
        <ImageViewer images={product.images} />
        <ProductDetails product={product} />
      </ProductHolder>
    </Fragment>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired
}

export default Product
