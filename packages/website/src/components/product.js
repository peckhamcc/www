import React from 'react'
import PropTypes from 'prop-types'
import {
  Breadcrumb
} from '../components/panels'
import styled from 'styled-components'
import ProductDetails from './product-details'
import ImageViewer from './product-images'
import Sizing from './product-sizing'

const ProductHolder = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 940px) {
    flex-direction: column;
  }
`

const ImageHolder = styled.div`
  display: flex;
  flex-direction: column;
`

const Product = ({ product }) => {
  return (
    <>
      <Breadcrumb section={product.section} product={product} />
      <ProductHolder>
        <ImageHolder>
          <ImageViewer images={product.images} />
          <Sizing product={product} />
        </ImageHolder>

        <ProductDetails product={product} />
      </ProductHolder>
    </>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired
}

export default Product
