import React, {
  Component
} from 'react'
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

class Product extends Component {
  state = {
    colour: ''
  }

  handleChooseOption = (key, value) => {
    if (key !== 'colour') {
      return
    }

    this.setState({
      colour: value
    })
  }

  render () {
    const { section, product } = this.props
    let { colour } = this.state

    if (!colour && product.options.colour) {
      colour = product.options.colour[0]
    }

    return (
      <>
        <Breadcrumb section={section} product={product} />
        <ProductHolder>
          <ImageHolder>
            <ImageViewer product={product} colour={colour} />
            <Sizing product={product} />
          </ImageHolder>

          <ProductDetails product={product} onChooseOption={this.handleChooseOption} />
        </ProductHolder>
      </>
    )
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired
}

export default Product
