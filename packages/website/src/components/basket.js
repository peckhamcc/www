import React, {
  Component,
  Fragment
} from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'
import {
  SmallTextButton,
  Button,
  Quantity,
  Price
} from '../components/panels'
import styled from 'styled-components'
import {
  connect
} from 'react-redux'
import {
  FaPlus,
  FaMinus
} from 'react-icons/fa'
import {
  lightAccent,
  errorText,
  errorBackground
} from '../colours'
import {
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  acceptedTerms
} from '../store/actions'
import config from '../config'
import {
  spacing
} from '../units'

const BasketWrapper = styled.div`
  display: flex;

  @media (max-width: 1000px) {
    display: block;
  }
`

const Table = styled.table`
  width: 100%;
  max-width: 600px;
  border-collapse: collapse;
`

const THead = styled.thead`
  border-bottom: 1px solid ${lightAccent}
`

const TFoot = styled.tfoot`
  border-top: 1px solid ${lightAccent};
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

const RightAlignedCell = styled(Cell)`
  text-align: right
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
  border: 1px solid transparent;

  ${props => props.error ? `
    /*border: 1px solid ${errorText};*/
    color: ${errorText};
    /*background: ${errorBackground};*/
  ` : ''}

  h4 {
    margin: 0 ${spacing(1)};
    padding: 0;
  }

  p {
    margin: ${spacing(1)};
    padding: 0;
    text-align: left;
  }
`

const QuantityButton = styled(Button)`
  @media (max-width: 940px) {
    padding: 3px ${spacing(1)};
    font-size: 22px;
  }
`

class Basket extends Component {
  state = {
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

  handleAcceptTerms = (event) => {
    this.setState({
      showTermsError: false
    })

    this.props.userAcceptedTerms(event.target.checked)
  }

  handleShowCheckout = (event) => {
    if (!this.props.acceptedTerms) {
      event.preventDefault()

      return this.setState({
        showTermsError: true
      })
    }
  }

  render () {
    const { cart, acceptedTerms } = this.props
    const { showTermsError } = this.state

    if (!cart.length) {
      return (
        <p>There's nothing in your cart. Try visiting the <Link to='/shop'>shop</Link>?</p>
      )
    }

    return (
      <BasketWrapper>
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
                              item.gender && item.gender.name, item.size && item.size.name
                            ].filter(Boolean).join(', ')
                          }
                          </p>
                          {item.variants && (
                            <p>
                              {Object.keys(item.variants).map((variant, index) => {
                                return (
                                  <Fragment key={index}>{variant.substring(0, 1).toUpperCase()}{variant.substring(1)}: {item.variants[variant].name}<br /></Fragment>
                                )
                              })}
                            </p>
                          )}
                        </DetailWrapper>
                        <DetailWrapper>
                          <QuantityButton onClick={() => this.decreaseQuantity(item)} disabled={item.quantity === 1}><FaMinus /></QuantityButton>
                          <Quantity>{item.quantity}</Quantity>
                          <QuantityButton onClick={() => this.increaseQuantity(item)}><FaPlus /></QuantityButton>
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
          </TBody>
          <TFoot>
            <Row>
              <RightAlignedCell>
                Total
              </RightAlignedCell>
              <Cell>
                <Price price={cart.reduce((acc, item) => {
                  const product = config.store.products.find(product => product.sku === item.sku)

                  return acc + (product.price * item.quantity)
                }, 0)}
                />
              </Cell>
            </Row>
          </TFoot>
        </Table>
        <PlaceOrder>
          <Terms error={showTermsError}>
            <h4>Terms &amp; Conditions</h4>
            <p>All kit is made to order and cannot be cancelled, exchanged or refunded once your order has been placed.</p>
            <p>Items from kit orders are sent to the factory when minimum quantities are reached and take 4-6 weeks to be made &amp; shipped.</p>
            <p>When items are available, your order will be available to be picked up from the most excellent <a href='https://ratracecycles.com/'>Rat Race Cycles</a> at 118 Evelina Road, SE15 3HL.</p>
            <p>We will be in touch to let you know the delivery date as soon as it is available and once items are ready for pick up.</p>
            <p>Please confirm you understand the above and are happy to proceed with your order:
              <Checkbox
                type='checkbox'
                checked={acceptedTerms}
                onChange={this.handleAcceptTerms}
                data-button='accept-terms'
              />
            </p>
          </Terms>
          <ButtonHolder>
            <Link to='/checkout' onClick={this.handleShowCheckout}>
              <Button data-button='enter-payment-information'>Enter your details</Button>
            </Link>
          </ButtonHolder>
        </PlaceOrder>
      </BasketWrapper>
    )
  }
}

Basket.propTypes = {
  cart: PropTypes.array.isRequired,
  user: PropTypes.object
}

const mapStateToProps = ({ shop: { cart }, user: { user, acceptedTerms } }) => ({
  cart,
  user,
  acceptedTerms
})

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  userAcceptedTerms: acceptedTerms
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)
