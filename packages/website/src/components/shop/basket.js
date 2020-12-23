import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
  SmallTextButton
} from '../panels'
import {
  GreenButton,
  QuantityButton
} from '../forms'
import {
  Quantity,
  Price,
  ItemImage
} from './panels'
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
  errorText
} from '../../colours'
import {
  removeFromCart,
  updateCartItem,
  clearCart,
  acceptedTerms
} from '../../store/actions'
import {
  spacing
} from '../../units'
import {
  OPTIONS
} from '@peckhamcc/config'
import {
  Flag
} from '../../lib/flags'

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
  border-bottom: 1px solid ${lightAccent};
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
  text-align: right;
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

    this.props.history.push('/checkout')
  }

  render () {
    const {
      cart,
      acceptedTerms,
      slugLookup
    } = this.props
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
                const product = slugLookup[item.slug]

                return (
                  <Row key={index}>
                    <Cell>
                      <ProductTitle>{item.name}</ProductTitle>
                      <ProductImage>
                        <ItemImage item={product} width={100} />
                      </ProductImage>
                      <ProductDetails>
                        <DetailWrapper>
                          {item.options && (
                            <p>
                              {
                                Object.keys(item.options).map(option => {
                                  const value = item.options[option]

                                  if (option === 'size') {
                                    return OPTIONS[option][product.sizeChart][value].name
                                  }

                                  return OPTIONS[option][value]
                                }).join(', ')
                              }
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
                    <Cell><Price price={product.price.amount * item.quantity} /></Cell>
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
                  return acc + (slugLookup[item.slug].price.amount * item.quantity)
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
            <p>We aim to send kit orders to the factory every two months, then it will take approximately 6 weeks to be made &amp; shipped.</p>
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
            <Flag
              name={['payments']}
              component={() => <GreenButton data-button='enter-payment-information' onClick={this.handleShowCheckout}>Proceed to payment</GreenButton>}
              fallbackComponent={() => <GreenButton data-button='enter-payment-information' onClick={this.handleShowCheckout}>Enter your details</GreenButton>}
            />
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

const mapStateToProps = ({ shop: { cart, sections, slugLookup }, user: { user, acceptedTerms } }) => ({
  cart,
  sections,
  slugLookup,
  user,
  acceptedTerms
})

const mapDispatchToProps = {
  removeFromCart,
  updateCartItem,
  clearCart,
  userAcceptedTerms: acceptedTerms
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Basket))
