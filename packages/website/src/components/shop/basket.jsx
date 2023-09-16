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
import {
  getPrice
} from '../../lib/products'

const PRODUCT_TYPES = {
  'made-to-order': 'Made to order',
  dropship: 'Made on demand',
  premade: 'Pre-made',
  subscription: 'Subscription',
  vistaprint: 'Made on demand'
}

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
  margin: 0 0 ${spacing(0.5)} 0;

  p {
    margin: 0
  }

  li {
    margin: 0
  }
`

const Terms = styled.div`
  font-size: 16px;
  width: 100%;
  max-width: 600px;
  padding: 0;
  border: 1px solid transparent;

  ${props => props.error
  ? `
    /*border: 1px solid ${errorText};*/
    color: ${errorText};
  `
  : ''}

  h4, h5 {
    margin: 0 ${spacing(1)};
    padding: 0;
  }

  p {
    margin: ${spacing(1)};
    padding: 0;
    text-align: left;
  }
`

const SHIPPING_LIMITS = [{
  max: 700,
  method: 'Royal Mail 24 Tracked',
  cost: 390
}, {
  max: Infinity,
  method: 'Amazon Next Day',
  cost: 575
}]

const findShippingMethod = (shippingWeight) => {
  return SHIPPING_LIMITS
    .filter(method => shippingWeight < method.max)
    .shift()
}

const Shipping = ({ shippingWeight }) => {
  const {
    method,
    cost
  } = findShippingMethod(shippingWeight)

  return (
    <Row>
      <Cell>
        <ProductTitle>Shipping</ProductTitle>
        <ProductDetails>
          <DetailWrapper>
            Shipping of made on demand items will be via {method}
          </DetailWrapper>
        </ProductDetails>
      </Cell>
      <Cell><Price price={cost} /></Cell>
    </Row>
  )
}

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
    const {
      showTermsError
    } = this.state

    if (!cart.length) {
      return (
        <p>There's nothing in your cart. Try visiting the <Link to='/shop'>shop</Link>?</p>
      )
    }

    let hasMtoKit = false
    let hasDropShipKit = false
    let hasPremadeKit = false
    let hasSubscription = false

    cart.forEach(item => {
      const product = slugLookup[item.slug]

      hasMtoKit = hasMtoKit || product.type === 'made-to-order'
      hasDropShipKit = hasDropShipKit || product.type === 'dropship'
      hasPremadeKit = hasPremadeKit || product.type === 'premade'
      hasSubscription = hasSubscription || product.type === 'subscription'
    })

    const terms = []

    if (hasMtoKit) {
      terms.push((
        <>
          <h5>Made to order</h5>
          <p>Your basket contains kit that is made to order.</p>
          <p>Orders cannot be cancelled, exchanged, or refunded once your order has been placed.</p>
          <p>We aim to send kit orders to the factory on the first of every month, then it will take approximately 6 weeks to be made &amp; shipped.</p>
          <p>When items are available, your order will be available to be picked up from <a href='https://ratracecycles.com/'>Rat Race Cycles</a> at 118 Evelina Road, SE15 3HL.</p>
        </>
      ))
    }

    if (hasDropShipKit) {
      terms.push((
        <>
          <h5>Made on demand</h5>
          <p>Your basket contains items that are made on demand.</p>
          <p>On-demand kit is submitted to the factory as soon as payment has been received and is shipped directly to you, usually within 1-2 weeks.</p>
        </>
      ))
    }

    if (hasPremadeKit) {
      terms.push((
        <>
          <h5>Pre-made</h5>
          <p>Your basket contains items that are pre-made.</p>
          <p>Once payment is made your order will be available to be picked up immediately from <a href='https://ratracecycles.com/'>Rat Race Cycles</a> at 118 Evelina Road, SE15 3HL.</p>
        </>
      ))
    }

    if (hasSubscription) {
      terms.push((
        <>
          <h5>Subscription</h5>
          <p>Your basket contains a subscription.</p>
          <p>The FoPCC subscription will renew on a yearly basis - visit your <Link to='/user/profile'>profile page</Link> to cancel at any time.</p>
        </>
      ))
    }

    function findPrice (item) {
      const price = getPrice(slugLookup[item.slug], item.options)

      return price.amount * item.quantity
    }

    let cartTotal = cart.reduce((acc, item) => acc + findPrice(item), 0)

    const shippingWeight = cart.reduce((acc, item) => {
      const product = slugLookup[item.slug]

      if (!product.shippingWeight) {
        return acc
      }

      return acc + (product.shippingWeight * item.quantity)
    }, 0)

    if (hasDropShipKit) {
      cartTotal += findShippingMethod(shippingWeight).cost
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
                const details = []

                if (item.options) {
                  Object.keys(item.options).forEach(option => {
                    const optionDetails = OPTIONS[option]
                    const value = item.options[option]

                    if (option === 'size') {
                      const chart = OPTIONS[option][product.sizeChart]

                      details.push(
                        `${chart.name}: ${chart.options[value].name}`
                      )
                    } else {
                      details.push(
                        `${optionDetails.name}: ${optionDetails.options[value]}`
                      )
                    }
                  })
                }

                return (
                  <Row key={index}>
                    <Cell>
                      <ProductTitle>{item.name} - {PRODUCT_TYPES[product.type]}</ProductTitle>
                      <ProductImage>
                        <ItemImage item={product} colour={item.options && item.options.colour} width={100} />
                      </ProductImage>
                      <ProductDetails>
                        <DetailWrapper>
                          <ul>
                            {
                              details.map((detail, index) => (
                                <li key={`index-${index}`}>{detail}</li>
                              ))
                            }
                          </ul>
                        </DetailWrapper>
                      </ProductDetails>
                      <DetailWrapper>
                        <QuantityButton onClick={() => this.decreaseQuantity(item)} disabled={item.quantity === 1}><FaMinus /></QuantityButton>
                        <Quantity>{item.quantity}</Quantity>
                        <QuantityButton onClick={() => this.increaseQuantity(item)}><FaPlus /></QuantityButton>
                      </DetailWrapper>
                      <DetailWrapper>
                        <SmallTextButton onClick={() => this.removeFromBasket(item)}>Remove from basket</SmallTextButton>
                      </DetailWrapper>
                    </Cell>
                    <Cell><Price price={findPrice(item)} /></Cell>
                  </Row>
                )
              })
            }
            {hasDropShipKit && <Shipping shippingWeight={shippingWeight} />}
          </TBody>
          <TFoot>
            <Row>
              <RightAlignedCell>
                Total
              </RightAlignedCell>
              <Cell>
                <Price price={cartTotal} />
              </Cell>
            </Row>
          </TFoot>
        </Table>
        <PlaceOrder>
          <Terms error={showTermsError}>
            <h4>Terms &amp; Conditions</h4>
            <p>Once placed orders cannot be cancelled, exchanged, or refunded.</p>
            {
              terms.map((terms, index) => {
                return (
                  <div key={`terms-${index}`}>
                    {terms}
                  </div>
                )
              })
            }
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
