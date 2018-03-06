import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Break, PageWrapper, Panel, ShopListItem, Breadcrumb, Price, Button, Quantity } from '../components/panels'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { light, lightAccent, dark } from '../colours';
import Modal from './modal';
import { addToCart } from '../store/actions'
import PlusIcon from 'react-icons/lib/fa/plus'
import MinusIcon from 'react-icons/lib/fa/minus'
import AddToBasketIcon from 'react-icons/lib/fa/cart-plus'
import ShoppingCartIcon from 'react-icons/lib/fa/shopping-cart'
import TickIcon from 'react-icons/lib/fa/check'
import { spacing } from '../units'

const ProductDetailsPanel = styled.div`
  padding: 0s;
  flex-grow: 1;

  h2 {
    margin: 0;
    line-height: 1;
  }

  h4 {
    margin: ${spacing(1)} 0;
    line-height: 1;
  }
`

const SelectableOption = styled.div`
  border-radius: 2px;
  border: 1px solid ${light};
  background-color: ${props => props.selected ? lightAccent : 'transparent'};
  cursor: pointer;
  display: inline-block;
  margin: 0 5px 5px 0;
  padding: 3px ${spacing(1)};
  min-width: 40px;
  text-align: center;

  &:active {
    background-color: ${dark};
  }

  &:hover {
    background-color: ${lightAccent};
  }

  @media (max-width: 940px) {
    padding: 3px ${spacing(2)};
    font-size: 22px;
  }
`

const ButtonWrapper = styled.div`
  margin-top: ${spacing(2)};

  button {
    padding: 10px ${spacing(1)};
  }
`

const OptionsArea = styled.div`
  padding: ${spacing(1)};
  border-radius: 3px;
  border: solid 1px ${lightAccent};
  margin: ${spacing(1)} 0;
`

class ProductDetails extends Component {
  constructor (props, context) {
    super(props, context)

    const { product } = props

    this.state = {
      quantity: 1,
      confirmationModalOpen: false
    }

    if (product.genders) {
      this.state.gender = product.genders[0]
    }

    if (product.sizes) {
      this.state.size = product.sizes[0]
    }

    if (product.variants) {
      this.state.variant = product.variants[0]
    }
  }

  chooseSize = (size) => {
    this.setState({
      size
    })
  }

  chooseGender = (gender) => {
    this.setState({
      gender
    })
  }

  chooseVariant = (variant) => {
    this.setState({
      variant
    })
  }

  decreaseQuantity = () => {
    this.setState(s => {
      if (s.quantity === 0) {
        return s
      }

      return {
        quantity: s.quantity - 1
      }
    })
  }

  increaseQuantity = () => {
    this.setState(s => {
      return {
        quantity: s.quantity + 1
      }
    })
  }

  addToCart = () => {
    this.props.addToCart({
      sku: this.props.product.sku,
      title: this.props.product.title,
      size: this.state.size,
      gender: this.state.gender,
      quantity: this.state.quantity,
      variant: this.state.variant
    })

    this.setState({
      confirmationModalOpen: true
    })
  }

  dismissModal = () => {
    this.setState({
      confirmationModalOpen: false
    })
  }

  render () {
    const { product } = this.props

    return (
      <ProductDetailsPanel>
        {this.state.confirmationModalOpen && (
          <Modal
            title='Product added'
            width={500}
            height={180}
            onClose={this.dismissModal}
          >
            <p>{product.title} Added to basket</p>
            <ButtonWrapper>
              <Button><TickIcon /> Continue shopping</Button>
              <Button><Link to='/basket'><ShoppingCartIcon /> Go to checkout</Link></Button>
            </ButtonWrapper>
          </Modal>
        )}
        <h2>{product.title}</h2>
        <h3><Price price={product.price} /></h3>
        {
          product.details.map((line, index) => <p key={index}>{line}</p>)
        }
        <OptionsArea>
          {product.genders && (
            <Fragment>
              <h4>Gender</h4>
              {product.genders.map((gender, index) => <SelectableOption selected={gender === this.state.gender} onClick={() => this.chooseGender(gender)} key={index}>{gender}</SelectableOption>)}
            </Fragment>
          )}
          {product.sizes && (
            <Fragment>
              <h4>Size</h4>
              {product.sizes.map((size, index) => <SelectableOption selected={size === this.state.size} onClick={() => this.chooseSize(size)} key={index}>{size.code}</SelectableOption>)}
            </Fragment>
          )}
          {product.variants && (
            <Fragment>
              <h4>Variant</h4>
              {product.variants.map((variant, index) => <SelectableOption selected={variant === this.state.variant} onClick={() => this.chooseSize(variant)} key={index}>{variant}</SelectableOption>)}
            </Fragment>
          )}
          <Fragment>
            <h4>Quantity</h4>
            <Button onClick={this.decreaseQuantity}><MinusIcon /></Button>
            <Quantity>{this.state.quantity}</Quantity>
            <Button onClick={this.increaseQuantity}><PlusIcon /></Button>
          </Fragment>
          <ButtonWrapper>
            <Button onClick={this.addToCart}><AddToBasketIcon /> Add to basket</Button>
          </ButtonWrapper>
        </OptionsArea>
      </ProductDetailsPanel>  
    )
  }
}

ProductDetails.propTypes = {
  cart: PropTypes.array.isRequired,
  user: PropTypes.object
}

const mapStateToProps = ({ shop: { cart }, user: { user } }) => ({
  cart,
  user
})

const mapDispatchToProps = {
  addToCart: addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
