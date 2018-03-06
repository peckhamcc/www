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

const RightAlignedCell = Cell.extend`
  text-align: right
`

const SmallCell = Cell.extend`
  width: 200px;
`

const ImageCell = Cell.extend`
  width: 100px;
`

const ProductTitle = styled.h5`
  font-size: 20px;
  margin: 0;

  @media (max-width: 940px) {
    font-size: 18px;
  }

  @media (max-width: 640px) {
    font-size: 16px;
  }
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

const DetailWrapper = styled.div`
  margin: ${spacing(1)} 0;
`

const Terms = styled.div`
  font-size: 16px;
  width: 100%;
  max-width: 600px;
  padding: 0;

  ${props => props.error ? 'border: 1px solid #F10;' : 'border: 1px solid transparent;'}

  p {
    margin: ${spacing(1)};
    padding: 0;
    text-align: left;
  }
`

const QuantityButton = Button.extend`
  @media (max-width: 940px) {
    padding: 3px ${spacing(1)};
    font-size: 22px;
  }
`

class Basket extends Component {
  state = {
    acceptedTerms: false,
    showTermsError: false
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
      acceptedTerms: event.target.checked,
      showTermsError: false
    })
  }

  showCheckout = (event) => {
    event.preventDefault()

    if (!this.state.acceptedTerms) {
      return this.setState({
        showTermsError: true
      })
    }
  }

  render () {
    const { cart } = this.props
    const { acceptedTerms, showTermsError } = this.state

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
                        <DetailWrapper>
                          <p>{
                            [
                              item.gender, item.size && item.size.name, item.variant
                            ].filter(Boolean).join(', ')
                          }</p>
                        </DetailWrapper>
                        <DetailWrapper>
                          <QuantityButton onClick={() => this.decreaseQuantity(item)}><MinusIcon /></QuantityButton>
                          <Quantity>{item.quantity}</Quantity>
                          <QuantityButton onClick={() => this.increaseQuantity(item)}><PlusIcon /></QuantityButton>
                        </DetailWrapper>
                        <DetailWrapper>
                          <SmallTextButton onClick={() => this.removeFromBasket(item)}>Remove from basket</SmallTextButton>
                        </DetailWrapper>
                      </ProductDetails>
                    </Cell>
                    <Cell><Price price={product.price * item.quantity} /></Cell>
                  </Row>
                )
              })
            }
            <Row>
              <RightAlignedCell>
                Sub total
              </RightAlignedCell>
              <Cell>
                <Price price={cart.reduce((acc, item) => {
                  const product = config.store.products.find(product => product.sku === item.sku)

                  return acc + (product.price * item.quantity)
                }, 0)} />
              </Cell>
            </Row>
            <Row>
              <RightAlignedCell>
                Total
              </RightAlignedCell>
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
          <Terms error={showTermsError}>
            <p>All kit is made to order and cannot be cancelled, exchanged or returned once your order has been placed.</p>
            <p>Kit orders are sent to the factory on a quarterly basis and take 4-6 weeks once ordered.</p>
            <p>Please check the box to indicate you are happy to proceed with your order: <Checkbox type='checkbox' checked={acceptedTerms} onClick={this.acceptTerms} /></p>
          </Terms>   
          <ButtonHolder>
            <Button onClick={this.showCheckout}>Enter payment information</Button>
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
