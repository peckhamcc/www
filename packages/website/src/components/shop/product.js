import React from 'react'
import PropTypes from 'prop-types'
import {
  Breadcrumb
} from './panels'
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

const Product = ({ section, product }) => {
  return (
    <>
      <Breadcrumb section={section} product={product} />
      <ProductHolder>
        <ImageHolder>
          <ImageViewer product={product} />
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
