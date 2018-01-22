import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Break, PageWrapper, Panel, ShopListItem, Breadcrumb, SmallTextButton, Button, Quantity, Price } from '../components/panels'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PlusIcon from 'react-icons/lib/fa/plus'
import MinusIcon from 'react-icons/lib/fa/minus'
import { light, lightAccent, dark } from '../colours';
import Modal from './modal';
import { 
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} from '../store/actions'
import config from '../config'
import { spacing } from '../units'

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const THead = styled.thead`
  border-bottom: 1px solid ${lightAccent}
`

const TBody = styled.tbody`
`

const Row = styled.tr`
  
`

const Header = styled.th`
  text-align: left;
  vertical-align: top;
  padding: ${spacing(1)};
`

const Cell = styled.td`
  vertical-align: top;
  padding: ${spacing(1)};
`

const SmallCell = Cell.extend`
  width: 200px;
`

const ReallySmallCell = Cell.extend`
  width: 100px;
`

const ImageCell = Cell.extend`
  width: 100px;
`

const ProductTitle = styled.h5`
  font-size: 20px;
  margin: 0;
`

const ProductImage = styled.div`
  display: inline-block;
  margin: 4px ${spacing(1)} 0 0;
  border: 1px solid ${lightAccent};
  padding: 4px;
  vertical-align: top;
`

const ProductDetails = styled.div`
  display: inline-block;
  vertical-align: top;
`

const Checkbox = styled.input`
  font-size: 24px;
`

const PlaceOrder = styled.div`
  
`

const ButtonHolder = styled.div`
  margin: ${spacing(1)};
`

const Terms = styled.div`
  font-size: 16px;
  width: 100%;
  max-width: 600px;
  padding: 0;

  ${props => props.error ? 'border: 1px solid #F10;' : ''}

  p {
    margin: ${spacing(1)};
    padding: 0;
    text-align: left;
  }
`

class Basket extends Component {
  state = {
    acceptedTerms: false
  }

  increaseQuantity = (item) => {
    item.quantity = item.quantity + 1

    this.props.updateCartItem(item)
  }

  decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1
    }

    this.props.updateCartItem(item)
  }

  removeFromBasket = (item) => {
    this.props.removeFromCart(item)
  }

  acceptTerms = (event) => {
    this.setState({
      acceptedTerms: event.target.checked
    })
  }

  render () {
    const { cart } = this.props

    if (!cart.length) {
      return (
        <p>There's nothing in your cart. Try visiting the <Link to='/shop'>shop</Link>?</p>
      )
    }

    return (
      <div>
        <Table>
          <THead>
            <Row>
              <Header>Item</Header>
              <Header>Quantity</Header>
              <Header>Price</Header>
              <Header>Subtotal</Header>
            </Row>
          </THead>
          <TBody>
            {
              cart.map((item, index) => {
                const product = config.store.products.find(product => product.sku === item.sku)

                return (
                  <Row key={index}>
                    <Cell>
                    <ProductTitle>{item.title}</ProductTitle>
                      <ProductImage>
                        <img srcSet={product.images[0].srcSet} src={product.images[0].src} width={100} />
                      </ProductImage>
                      <ProductDetails>
                        <ul>
                          {item.gender && <li>Gender: {item.gender}</li>}
                          {item.size && <li>Size: {item.size}</li>}
                          {item.variant && <li>Variant: {item.variant}</li>}
                        </ul>
                      </ProductDetails>
                    </Cell>
                    <SmallCell>
                      <div>
                        <Button onClick={() => this.decreaseQuantity(item)}><MinusIcon /></Button>
                        <Quantity>{item.quantity}</Quantity>
                        <Button onClick={() => this.increaseQuantity(item)}><PlusIcon /></Button>
                      </div>
                      <SmallTextButton onClick={() => this.removeFromBasket(item)}>Remove from basket</SmallTextButton>
                    </SmallCell>
                    <ReallySmallCell><Price price={product.price} /></ReallySmallCell>
                    <ReallySmallCell><Price price={product.price * item.quantity} /></ReallySmallCell>
                  </Row>
                )
              })
            }
            <Row>
              <Cell colSpan={2}></Cell>
              <Cell>
                Sub total
              </Cell>
              <Cell>
                <Price price={cart.reduce((acc, item) => {
                  const product = config.store.products.find(product => product.sku === item.sku)

                  return acc + (product.price * item.quantity)
                }, 0)} />
              </Cell>
            </Row>
            <Row>
              <Cell colSpan={2}></Cell>
              <Cell>
                Total
              </Cell>
              <Cell>
                <Price price={cart.reduce((acc, item) => {
                  const product = config.store.products.find(product => product.sku === item.sku)

                  return acc + (product.price * item.quantity)
                }, 0)} />
              </Cell>
            </Row>
          </TBody>
        </Table>
        <PlaceOrder>
          <Terms>
            <p>All kit is made to order and cannot be cancelled, exchanged or returned once your order has been placed.</p>
            <p>Delivery times are 4-6 weeks.</p>
            <p>Please check the box to indicate you are happy to proceed with your order: <Checkbox type='checkbox' checked={this.state.acceptedTerms} onClick={this.acceptTerms} /></p>
          </Terms>   
          <ButtonHolder>
            <Button>
              <Link to='/checkout'>Enter payment information</Link>
            </Button>
          </ButtonHolder>
        </PlaceOrder>
      </div>
    )
  }
}

Basket.propTypes = {
  cart: PropTypes.array.isRequired,
  user: PropTypes.object
}

const mapStateToProps = ({ shop: { cart }, user: { user } }) => ({
  cart,
  user
})

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)
