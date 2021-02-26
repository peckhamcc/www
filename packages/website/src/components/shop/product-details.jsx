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
import {
  OPTIONS
} from '@peckhamcc/config'
import {
  QuantityButton
} from '../forms'

const PRODUCT_DESCRIPTIONS = {
  'short-sleeved-jersey-2019': (
    <>
      <p>Lightweight Short Sleeved Club Jersey in black.</p>
      <p>Made from a combination of Coolmax and Mondrian fabric, the PCC club jersey has flatlock seams, silicone grippers, three large rear pockets and a fourth with a zip for your valuables.</p>
      <p>It is available in male and female specific versions and has an athletic fit.</p>
      <p>British Cycling approved club colours for racing.</p>
    </>
  ),
  'short-sleeved-summer-jersey-2019': (
    <>
      <p>Lightweight Short Sleeved Club Jersey in white.</p>
      <p>Made from a combination of Coolmax and Mondrian fabric, the PCC club jersey has flatlock seams, silicone grippers, three large rear pockets and a fourth with a zip for your valuables.</p>
      <p>It is available in male and female specific versions and has an athletic fit.</p>
    </>
  ),
  'long-sleeved-jersey-2019': (
    <>
      <p>Long Sleeved Winter Jersey in black.</p>
      <p>Made from a high performing Hydrophilic and Hydrophobic fabric and has three large rear pockets.</p>
      <p>It comes with a full-length YKK zip and silicone grippers on the cuffs &amp; waist.</p>
      <p>It is available in male and female specific versions and has an athletic fit.</p>
      <p>British Cycling approved club colours for racing.</p>
    </>
  ),
  'short-sleeved-race-jersey-2019': (
    <>
      <p>Lightweight Short Sleeved Race Jersey in black.</p>
      <p>This is the same design as our club jersey but in a slim fit with longer sleeves for better aerodynamics.</p>
      <p>Made from a combination of Coolmax and Mondrian fabric, the PCC club jersey has flatlock seams, silicone grippers, three large rear pockets and a fourth with a zip for your valuables.</p>
      <p>It is available in male and female specific versions and has a race fit.</p>
      <p>British Cycling approved club colours for racing.</p>
    </>
  ),
  'winter-tights-2019': (
    <>
      <p>Winter Tights in black</p>
      <p>Thermal winter tights made from Roubaix high stretch insulation (e.g. nylon/lycra construction with a brushed inner to retain heat).</p>
      <p>They are available in male and female specific versions and have an athletic fit.</p>
    </>
  ),
  'bib-shorts-2019': (
    <>
      <p>Club Bib Shorts in black</p>
      <p>Made from Italian Power Lycra fabric with Coldblack Technology, our Club Bibshort has a wicking upper mesh and flat-lock stitching and overlocked seams throughout for comfort.</p>
      <p>There's a discrete rear pocket for your valuables and raw edge silicone hem grips to make sure the legs stay put.</p>
      <p>They are available in male and female specific versions.</p>
    </>
  ),
  'shell-jacket-2019': (
    <>
      <p>Club Shell Jacket in black</p>
      <p>Lightweight packable outer layer in an athletic fit.</p>
    </>
  ),
  'white-gilet-2019': (
    <>
      <p>Lightweight packable Club Gilet in white</p>
      <p>The Club Gilet has a windproof front &amp; shoulders and is made of a high stretch fine denier material.</p>
      <p>It has a deep neck for increased wind protection, comes with a full-length YKK zip, three rear pockets and packs down to easily fit in a jersey pocket.</p>
      <p>It is available in male and female specific versions and has an athletic fit.</p>
      <p>Exactly the same as the black gilet, only it will match your white jersey, socks &amp; cap</p>
    </>
  ),
  'gilet-2019': (
    <>
      <p>Lightweight packable Club Gilet in black</p>
      <p>The Club Gilet has a windproof front &amp; shoulders and is made of a high stretch fine denier material.</p>
      <p>It has a deep neck for increased wind protection, comes with a full-length YKK zip, three rear pockets and packs down to easily fit in a jersey pocket.</p>
      <p>It is available in male and female specific versions and has an athletic fit.</p>
    </>
  ),
  'speed-suit-2019': (
    <>
      <p>Equally at home on the track or at the Christmas Party, a speedsuit is for when only the fastest will do.</p>
      <p>British Cycling approved club colours for racing.</p>
    </>
  ),
  'tri-suit-2019': (
    <>
      <p>The aquatic cousin of the speedsuit, a trisuit worn under a wetsuit will save a few minutes during the transition from swim to cycle.</p>
      <p>And you won't have to strip in a field.</p>
    </>
  ),
  'musette-2019': (
    <>
      <p>Black cotton musette with screen printed club logo.</p>
      <p>N.b. there is stock of this item available to buy at <a href='https://ratracecycles.com'>Rat Race Cycles</a></p>
    </>
  ),
  'bidon-2019': (
    <>
      <p>The club bidon has a <a href='https://www.velominati.com/#52'>500ml capacity</a>, features a lockable lid with a leak-proof membrane cap and is dishwasher safe.</p>
      <p>It's made from 20% post-industrial recycled plastics and is recyclable and biodegradable itself so once retired should not murder anything in the ocean.</p>
      <p>N.b. there is stock of this item available to buy at <a href='https://ratracecycles.com'>Rat Race Cycles</a></p>
    </>
  ),
  'white-socks-2019': (
    <>
      <p>White Club Socks in CoolMax foot &amp; nylon leg culminating in the club stripes at the top.</p>
      <p>Cuff size is a <a href='https://www.velominati.com/#27'>Rule #27</a> friendly 7.5-inches for large, 6.5-inches for medium.</p>
      <p>The Instagram-friendly orientation of the club motto on the top of the socks will remind you we roll united!</p>
      <p>N.b. there is stock of this item available to buy at <a href='https://ratracecycles.com'>Rat Race Cycles</a></p>
    </>
  ),
  'black-socks-2019': (
    <>
      <p>Black Club Socks in CoolMax foot &amp; nylon leg culminating in the club stripes at the top.</p>
      <p>Cuff size is a <a href='https://www.velominati.com/#27'>Rule #27</a> friendly 7.5-inches for large, 6.5-inches for medium.</p>
      <p>The Instagram-friendly orientation of the club motto on the top of the socks will remind you we roll united!</p>
      <p>N.b. there is stock of this item available to buy at <a href='https://ratracecycles.com'>Rat Race Cycles</a></p>
    </>
  ),
  'neck-warmer-2019': (
    <>
      <p>Club Neck Warmer</p>
      <p>Versatile fabric tube that can be worn as a neck tube, mask, bandana, skull cap etc.</p>
    </>
  ),
  'white-cap-2019': (
    <>
      <p>White cotton cap with stitched ribbon and white screen print.</p>
      <p>Cycling caps keep the sun out of your eyes when it's sunny and the rain out of your eyes when it's wet.</p>
      <p>An essential piece of kit, don't leave home without one. Unless you are going to the pub, in which case observe <a href='https://www.velominati.com/#22'>Rule #22</a> and leave it at home.</p>
      <p>Our caps are made in Italy from white cotton with a stiff peak and the Peckham logos are screen printed in black. A stitched ribbon in club colours runs over the top.</p>
      <p>Hand wash only. We mean it.</p>
      <p>N.b. there is stock of this item available to buy at <a href='https://ratracecycles.com'>Rat Race Cycles</a></p>
    </>
  ),
  'black-cap-2019': (
    <>
      <p>Black cotton cap with stitched ribbon and white screen print.</p>
      <p>Cycling caps keep the sun out of your eyes when it's sunny and the rain out of your eyes when it's wet.</p>
      <p>An essential piece of kit, don't leave home without one. Unless you are going to the pub, in which case observe <a href='https://www.velominati.com/#22'>Rule #22</a> and leave it at home.</p>
      <p>Our caps are made in Italy from white cotton with a stiff peak and the Peckham logos are screen printed in black. A stitched ribbon in club colours runs over the top.</p>
      <p>Hand wash only. We mean it.</p>
      <p>N.b. there is stock of this item available to buy at <a href='https://ratracecycles.com'>Rat Race Cycles</a></p>
    </>
  ),
  'white-arm-warmers-2019': (
    <>
      <p>Our Thermal Arm Warmers are made from Roubaix high stretch insulation (e.g. nylon/lycra construction with a brushed inner to retain heat).</p>
      <p>They have minimal seams for comfort and have silicone grippers at the bicep to ensure they stay in place.</p>
      <p>In white to match your white jersey, cap, socks, etc</p>
    </>
  ),
  'black-arm-warmers-2019': (
    <>
      <p>Our Thermal Arm Warmers are made from Roubaix high stretch insulation (e.g. nylon/lycra construction with a brushed inner to retain heat).</p>
      <p>They have minimal seams for comfort and have silicone grippers at the bicep to ensure they stay in place.</p>
      <p>In black to match your black jersey, cap, socks, etc</p>
    </>
  ),
  'hoodie-2021': (
    <>
      <p>Hoodie with kangaroo pocket and club logo design printed on the front and rear.</p>
      <p>Made from 350gsm brushed 85% Organic ring-spun Combed Cotton with 15% Recycled Polyester.</p>
      <p>Looks great on the podium, next to the CX course or in the airport lounge on the way to Mallorca.</p>
      <p>N.b our casualwear line is printed on-demand and shipped directly to you in 1-2 weeks so a postage cost will be calculated at checkout.</p>
    </>
  ),
  'zip-hoodie-2021': (
    <>
      <p>Zip hoodie with kangaroo pocket and club logo design printed on the front and rear.</p>
      <p>Made from 300gsm terry fabric made of 85% Organic ring-spun Combed Cotton with 15% Recycled Polyester.</p>
      <p>Looks great on the podium, next to the CX course or in the airport lounge on the way to Mallorca.</p>
      <p>N.b our casualwear line is printed on-demand and shipped directly to you in 1-2 weeks so a postage cost will be calculated at checkout.</p>
    </>
  ),
  't-shirt-2021': (
    <>
      <p>Short-sleeved t-shirt in 180gsm 100% organic ringspun cotton with club logo printed on the front.</p>
      <p>N.b our casualwear line is printed on-demand and shipped directly to you in 1-2 weeks so a postage cost will be calculated at checkout.</p>
    </>
  ),
  'ls-t-shirt-2021': (
    <>
      <p>Long-sleeved t-shirt in 180gsm 100% organic ringspun cotton with club logo printed on the front.</p>
      <p>N.b our casualwear line is printed on-demand and shipped directly to you in 1-2 weeks so a postage cost will be calculated at checkout.</p>
    </>
  )
}

const productDescription = (slug) => {
  if (PRODUCT_DESCRIPTIONS[slug]) {
    return PRODUCT_DESCRIPTIONS[slug]
  }

  console.warn('No description found for', slug)

  return null
}

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

    this.props.onChooseOption(key, value)
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
    const {
      product
    } = this.props

    this.props.addToCart({
      slug: product.slug,
      name: product.name,
      quantity: this.state.quantity,
      options: {
        ...this.state.options
      }
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

              if (key === 'size') {
                name = option
              } else if (OPTIONS[key] && OPTIONS[key][option]) {
                name = OPTIONS[key][option]
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
        <h3><Price price={product.price.amount} /></h3>
        {productDescription(product.slug)}
        <OptionsArea>
          {options}
          <h4>Quantity</h4>
          <QuantityButton
            onClick={this.handleDecreaseQuantity}
            data-button='decrease-quantity'
            disabled={this.state.quantity === 1}
          ><FaMinus />
          </QuantityButton>
          <Quantity>{this.state.quantity}</Quantity>
          <QuantityButton
            onClick={this.handleIncreaseQuantity}
            data-button='increase-quantity'
          ><FaPlus />
          </QuantityButton>
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
  user: PropTypes.object
}

const mapStateToProps = ({ user: { user, size, gender } }) => ({
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
