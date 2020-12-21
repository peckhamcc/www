import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'
import {
  Button,
  SelectableOption
} from '../panels'
import {
  Price,
  Quantity
} from './panels'
import styled from 'styled-components'
import {
  connect
} from 'react-redux'
import {
  lightAccent
} from '../../colours'
import Modal from '../modal'
import {
  addToCart,
  selectedSize,
  selectedGender
} from '../../store/actions'
import {
  FaPlus,
  FaMinus,
  FaCartPlus,
  FaShoppingCart,
  FaCheck
} from 'react-icons/fa'
import {
  spacing
} from '../../units'
import OPTIONS from './options'

const ProductDetailsPanel = styled.div`
  padding: 0s;
  flex-grow: 1;

  @media (min-width: 940px) {
    max-width: 40vw;
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

    const { product } = props

    this.state = {
      quantity: 1,
      confirmationModalOpen: false,
      options: {}
    }

    Object.keys(product.options).forEach(key => {
      this.state.options[key] = product.options[key][0]
    })
  }

  handleChooseOption = (key, value) => {
    if (key === 'size') {
      this.props.selectedSize(value)
    }

    if (key === 'gender') {
      this.props.selectedGender(value)
    }

    this.setState(s => {
      s.options[key] = value

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
    const sku = [
      this.props.product.slug.toUpperCase()
    ]

    if (Object.keys(this.props.product.options).length) {
      sku.push(
        Object.keys(this.props.product.options)
          .map(option => this.state.options[option])
          .join('-')
      )
    }

    this.props.addToCart({
      sku: sku.join(':'),
      name: this.props.product.name,
      quantity: this.state.quantity,
      options: this.state.options
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

    const options = []

    Object.keys(product.options).forEach(key => {
      options.push(
        <div key={key}>
          <h4>{key.substring(0, 1).toUpperCase()}{key.substring(1)}</h4>
          {
            product.options[key].map(option => {
              let name = option

              if (OPTIONS[key] && OPTIONS[key][option]) {
                name = OPTIONS[key][option]
              }

              if (key === 'size') {
                // strip size table prefix
                name = option.substring(1)
              }

              return (
                <SelectableOption
                  selected={this.state.options[key] === option}
                  onClick={() => this.handleChooseOption(key, option)}
                  key={`${key}-${option}`}
                >{name}
                </SelectableOption>
              )
            })
          }
        </div>
      )
    })

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
        <h2>{product.name}</h2>
        <h3><Price price={product.variations[0].price} /></h3>
        {product.description.split('\n').map((line, index) => <p key={index} dangerouslySetInnerHTML={{ __html: line }} />)}
        <OptionsArea>
          {options}
          <h4>Quantity</h4>
          <Button
            onClick={this.handleDecreaseQuantity}
            data-button='decrease-quantity'
            disabled={this.state.quantity === 1}
          ><FaMinus />
          </Button>
          <Quantity>{this.state.quantity}</Quantity>
          <Button
            onClick={this.handleIncreaseQuantity}
            data-button='increase-quantity'
          ><FaPlus />
          </Button>
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
