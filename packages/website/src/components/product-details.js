import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'
import {
  Price,
  Button,
  Quantity,
  SelectableOption
} from './panels'
import styled from 'styled-components'
import {
  connect
} from 'react-redux'
import {
  lightAccent
} from '../colours'
import Modal from './modal'
import {
  addToCart,
  selectedSize,
  selectedGender
} from '../store/actions'
import {
  FaPlus,
  FaMinus,
  FaCartPlus,
  FaShoppingCart,
  FaCheck
} from 'react-icons/fa'
import {
  spacing
} from '../units'

const ProductDetailsPanel = styled.div`
  padding: 0s;
  flex-grow: 1;

  @media (min-width: 940px) {
    max-width: 40vw;
    min-width: 35vw;
  }

  h2 {
    margin: 0;
    line-height: 1;
  }

  h4 {
    margin: ${spacing(1)} 0;
    line-height: 1;
  }
`

const ButtonWrapper = styled.div`
  margin-top: ${spacing(2)};

  button {
    padding: 10px ${spacing(1)};
    margin-bottom: ${spacing(0.5)};
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

    const { product, gender, size, variants } = props

    this.state = {
      quantity: 1,
      confirmationModalOpen: false,
      variants: {}
    }

    if (product.genders) {
      this.state.gender = gender || product.genders[0]
      this.state.gender = product.genders.find(gender => gender.code === this.state.gender.code) || product.genders[0]
    }

    if (product.sizes) {
      this.state.size = size || product.sizes.find(size => size.code === 'M') || product.sizes[0]
      this.state.size = product.sizes.find(size => size.code === this.state.size.code) || product.sizes[0]
    }

    if (product.variants) {
      const defaultVariants = Object.keys(product.variants).reduce((output, key) => {
        output[key] = product.variants[key].options[1]

        return output
      }, {})

      this.state.variants = variants || defaultVariants

      Object.keys(defaultVariants).forEach(key => {
        this.state.variants[key] = product.variants[key].options.find(variant => variant.code === this.state.variants[key].code) || product.variants[key].options[1]
      })
    }
  }

  handleChooseSize = (size) => {
    this.setState({
      size
    })

    this.props.selectedSize(size)
  }

  handleChooseGender = (gender) => {
    this.setState({
      gender
    })

    this.props.selectedGender(gender)
  }

  handleChooseVariant = (key, value) => {
    this.setState(s => {
      s.variants[key] = value

      return s
    })
  }

  handleDecreaseQuantity = () => {
    this.setState(s => {
      if (s.quantity === 0) {
        return s
      }

      return {
        quantity: s.quantity - 1
      }
    })
  }

  handleIncreaseQuantity = () => {
    this.setState(s => {
      return {
        quantity: s.quantity + 1
      }
    })
  }

  handleAddToCart = () => {
    this.props.addToCart({
      sku: this.props.product.sku,
      title: this.props.product.title,
      size: this.state.size,
      gender: this.state.gender,
      quantity: this.state.quantity,
      variants: this.state.variants
    })

    this.setState({
      confirmationModalOpen: true
    })
  }

  handleDismissModal = () => {
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
            onClose={this.handleDismissModal}
          >
            <p>{product.title} Added to basket</p>
            <ButtonWrapper>
              <Button
                data-button='continue-shopping'
                onClick={this.handleDismissModal}
              ><FaCheck /> Continue shopping
              </Button>
              <Link to='/basket'>
                <Button
                  data-button='go-to-checkout'
                ><FaShoppingCart /> Go to checkout
                </Button>
              </Link>
            </ButtonWrapper>
          </Modal>
        )}
        <h2>{product.title}</h2>
        <h3><Price price={product.price} /></h3>
        {product.details.map((line, index) => <p key={index} dangerouslySetInnerHTML={{ __html: line }} />)}
        <OptionsArea>
          {product.genders && (
            <>
              <h4>Gender</h4>
              {product.genders.map((gender, index) => (
                <SelectableOption
                  selected={gender.code === this.state.gender.code}
                  onClick={() => this.handleChooseGender(gender)}
                  key={index}
                  data-gender={gender.code}
                >{gender.name}
                </SelectableOption>
              ))}
            </>
          )}
          {product.sizes && (
            <>
              <h4>Size</h4>
              {product.sizes.map((size, index) => (
                <SelectableOption
                  selected={size.code === this.state.size.code}
                  onClick={() => this.handleChooseSize({
                    code: size.code,
                    name: size.name
                  })}
                  key={index}
                  data-size={size.code}
                >{size.code}
                </SelectableOption>
              ))}
            </>
          )}
          {product.variants && (
            <>
              <h4>Options</h4>
              {Object.keys(product.variants)
                .map((key, index) => (
                  <div key={index}>
                    <p>{product.variants[key].description}</p>
                    {
                      product.variants[key].options.map((variant, index) => (
                        <SelectableOption
                          selected={variant.code === this.state.variants[key].code}
                          onClick={() => this.handleChooseVariant(key, variant)}
                          key={index}
                          data-variant={variant.code}
                        >{variant.name}
                        </SelectableOption>
                      ))
                    }
                  </div>
                ))}
            </>
          )}
          <>
            <h4>Quantity</h4>
            <Button
              onClick={this.handleDecreaseQuantity}
              data-button='decrease-quantity'
            ><FaMinus />
            </Button>
            <Quantity>{this.state.quantity}</Quantity>
            <Button
              onClick={this.handleIncreaseQuantity}
              data-button='increase-quantity'
            ><FaPlus />
            </Button>
          </>
          <ButtonWrapper>
            <Button
              onClick={this.handleAddToCart}
              data-button='add-to-cart'
            ><FaCartPlus /> Add to basket
            </Button>
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

const mapStateToProps = ({ shop: { cart }, user: { user, size, gender } }) => ({
  cart,
  user,
  size,
  gender
})

const mapDispatchToProps = {
  addToCart,
  selectedSize,
  selectedGender
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
