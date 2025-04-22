import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'
import {
  Button,
  SelectableOption,
  Note
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
import {
  getPrice
} from '../../lib/products'

const PRODUCT_DESCRIPTIONS = {
  'club-jersey-2022': (
    <>
      <p>The Club Jersey has flatlock seams, silicone grippers, and three large rear pockets including one with a hook to secure your valuables.</p>
      <p>The fit is similar to casual, core or endurance-style jerseys from other brands.</p>
      <p>It is available in male and female specific versions and has an athletic fit, please see the size guide for details.</p>
    </>
  ),
  'pro-jersey-2022': (
    <>
      <p>The pro jersey has a slimmer fit than the club jersey. It is made from more advanced materials and has a closer fit around the shoulders and waist.</p>
      <p>The fit is similar to "Pro Team" or race-style jerseys from other brands.</p>
      <p>If you normally wear a more casual fit jersey, please consider the <Link to='/shop/club-jersey-2022'>Club Jersey</Link> instead.</p>
      <p>It has flatlock seams, silicone grippers, and three large rear pockets including one with a hook to secure your valuables.</p>
      <p>It is available in male and female specific versions and has an athletic fit, please see the size guide for details.</p>
    </>
  ),
  'pro-summer-jersey-2022': (
    <>
      <p>The pro summer jersey has a similar fit to the pro jersey but is made from a very thin material that is only really suited to baking hot days on the continent - it will see very little use in the UK.</p>
      <p>If you will wear this on our regular club rides, please consider the <Link to='/shop/pro-jersey-2022'>Pro Jersey</Link> instead.</p>
      <p>It has flatlock seams, silicone grippers, and three large rear pockets including one with a hook to secure your valuables.</p>
      <p>You should consider putting on sun cream on underneath it, unless you think <a href='https://www.velominati.com/'>rule #7</a> also applies to bib straps.</p>
    </>
  ),
  'youth-jersey-2022': (
    <>
      <p>Junior sized jersey in a close-fitting cut with three rear pockets for conkers and marbles.</p>
      <p>The fabric is a medium weight with excellent breathability.</p>
      <p>There is an option for a full length or half length zip</p>
      <p>Sizing is based on height, please see the size guide for details.</p>
      <p>If between two sizes, choose the larger size.</p>
    </>
  ),
  'winter-club-jersey-2022': (
    <>
      <p>Made from 240g/m2 insulated material with a higher neck than the club jersey to keep the elements out, the Winter Club Jersey has flatlock seams, silicone grippers, and three large rear pockets.</p>
      <p>It is available in male and female specific versions and has an athletic fit, please see the size guide for details.</p>
      <p>Some jerseys are available in a "plus size" that adds 5cm to the sleeves &amp; body.</p>
    </>
  ),
  'winter-pro-jersey-2022': (
    <>
      <p>Made from 200g/m2 material with a higher neck than the pro jersey to keep the elements out, the Winter Pro Jersey has extra panels for a more aerodynamic fit, flatlock seams, silicone grippers, and three large rear pockets.</p>
      <p>It is available in male and female specific versions and has an athletic fit, please see the size guide for details.</p>
      <p>Some jerseys are available in a "plus size" that adds 5cm to the sleeves &amp; body.</p>
    </>
  ),
  'winter-youth-jersey-2022': (
    <>
      <p>Junior sized jersey in a close-fitting cut with a high neck to keep the weather out and three rear pockets for snacks.</p>
      <p>The fabric is insulated to handle unpredictable weather.</p>
      <p>Sizing is based on height, please see the size guide for details.</p>
      <p>If between two sizes, choose the larger size.</p>
    </>
  ),
  'club-lightweight-gilet-2022': (
    <>
      <p>The Packable Gilet is perfect for long descents on summer rides and packs down easily to be stowed in a jersey pocket when not in use.</p>
      <p>It is made from a 77g/m2 100% polyester material, has a deep neck for increased wind protection, comes with a full-length zip and a mesh back.</p>
      <p>Some gilets are available in a "plus size" that adds 5cm to the body.</p>
    </>
  ),
  'club-gilet-2022': (
    <>
      <p>The Club Gilet has a waterproof rating of 10k/10k, and is made of a 160g/m2 high stretch 90% polyester/10% polyurethane material.</p>
      <p>It has a deep neck for increased wind protection, comes with a full-length zip, a mesh back, three rear pockets and is a great three-season option for layering and comfort.</p>
      <p>Some gilets are available in a "plus size" that adds 5cm to the body.</p>
    </>
  ),
  'pro-gilet-2022': (
    <>
      <p>The Pro Gilet has a waterproof rating of 8k/10k, and is made of a lightweight 110g/m2 high stretch 95% polyester/5% polyurethane material.</p>
      <p>It has a deep neck for increased wind protection, comes with a full-length zip, a mesh back, and is a great three-season option for layering and comfort.</p>
      <p>This gilet has no rear pockets but the zip opens from the bottom as well as the top to give easy access to your jersey pockets.</p>
      <p>Some gilets are available in a "plus size" that adds 5cm to the body.</p>
    </>
  ),
  'club-bib-shorts-2022': (
    <>
      <p>Our Club Bib Short has a wicking upper mesh and flat-lock stitching with overlocked seams throughout for comfort and the legs have raw edge silicone hem grips to make sure the legs stay put.</p>
      <p>They are available in male and female specific versions and the male fit can also be made with female pads.</p>
      <p>There are two pads available, a regular pad and an endurance pad that some may find more comfortable on longer rides.</p>
      <p>Some shorts are available in a "plus size" that adds 5cm to the legs.</p>
    </>
  ),
  'pro-bib-shorts-2022': (
    <>
      <p>Our Pro Bib Shorts have more panels than the Club version for a closer fit are made from a textured lycra fabric that increases aerodynamic efficiency.</p>
      <p>They feature flat-lock stitching with overlocked seams throughout for comfort and the legs have raw edge silicone hem grips to make sure the legs stay put.</p>
      <p>They are available in male and female specific versions and the male fit can also be made with female pads.</p>
      <p>There are two pads available, a regular pad and an endurance pad that some may find more comfortable on longer rides.</p>
      <p>Some shorts are available in a "plus size" that adds 5cm to the legs.</p>
    </>
  ),
  'club-3-4-bib-shorts-2022': (
    <>
      <p>Our 3/4 length shorts feature silicone elastic grippers to keep the legs in place, flat seams for comfort, and reflective elements for visibility.</p>
      <p>They are available in male and female specific versions and with a choice of pads - a regular pad and an endurance pad that some may find more comfortable on longer rides.</p>
      <p>Some shorts are available in a "plus size" that adds 5cm to the legs.</p>
      <p>Shorts are available in regular lycra fabric or roubaix which is insulated for colder weather.</p>
    </>
  ),
  'club-bib-tights-2022': (
    <>
      <p>Our bib tights are made from an insulated roubaix material and feature silicone elastic grippers to keep the legs in place, flat seams for comfort, and reflective elements for visibility.</p>
      <p>They are available in male and female specific versions and with a choice of pads - a regular pad and an endurance pad that some may find more comfortable on longer rides.</p>
      <p>Some tights are available in a "plus size" that adds 5cm to the legs.</p>
    </>
  ),
  'pro-rain-jacket-2022': (
    <>
      <p>Our rain jacket is designed for bad weather. With a high neck, fully taped seams, an elongated tail and a waterproof zipper it will protect you against the worst the sky can chuck at you.</p>
      <p>The fabric has a 20k/20k waterproof/breathability rating and is a lightweight 100g/m2.</p>
      <p>It is available in male and female specific versions and has an athletic fit, please see the size guide for details.</p>
      <p>Some jackets are available in a "plus size" that adds 5cm to the sleeves &amp; body.</p>
    </>
  ),
  'club-winter-jacket-2022': (
    <>
      <p>Our club winter jacket has 10k/10k waterproof/breathability rating and is made from a lightweight three-layer 160g/m2 fabric that is wind and waterproof while remaining breathable.</p>
      <p>It is available in male and female specific versions and has an athletic fit, please see the size guide for details.</p>
      <p>Some jackets are available in a "plus size" that adds 5cm to the sleeves &amp; body.</p>
    </>
  ),
  'pro-deep-winter-jacket-2022': (
    <>
      <p>For deep winter riding, our pro winter jacket has a 10k waterproof rating and is made from a thermally insulated 285g/m2 fabric to keep you toasty while out in the lanes.</p>
      <p>It also features a long tail to keep road spray at bay to help keep you dry.</p>
      <p>It is available in male and female specific versions and has an athletic fit, please see the size guide for details.</p>
      <p>Some jackets are available in a "plus size" that adds 5cm to the sleeves &amp; body.</p>
    </>
  ),
  'pro-winter-jacket-2022': (
    <>
      <p>A heavier version of our spring jacket it features 8k waterproofing, three rear pockets and a high collar and cuffs to keep the elements out.</p>
      <p>It is available in male and female specific versions and has an athletic fit, please see the size guide for details.</p>
      <p>Some jackets are available in a "plus size" that adds 5cm to the sleeves &amp; body.</p>
    </>
  ),
  'pro-spring-jacket-2022': (
    <>
      <p>A mid-season jacket perfect for the spring and autumn, it features 8k waterproofing, three rear pockets and a high collar and cuffs to keep the elements out.</p>
      <p>It is available in male and female specific versions and has an athletic fit, please see the size guide for details.</p>
      <p>Some jackets are available in a "plus size" that adds 5cm to the sleeves &amp; body.</p>
    </>
  ),
  'club-skin-suit-2022': (
    <>
      <p>All purpose skin suit with sleeve, pad, material and pocket options making it suited to all racing types or just for hanging out in at the Brick.</p>
      <p>It is available in male and female specific versions and has an athletic fit, please see the size guide for details.</p>
      <p>Some skin suits are available in a "plus size" that adds 5cm to the sleeves &amp; body.</p>
    </>
  ),
  'road-skin-suit-2022': (
    <>
      <p>Skin suit with short sleeves and three rear pockets suited to road/CX or MTB racing.</p>
      <p>It is available in male and female specific versions and has an athletic fit, please see the size guide for details.</p>
      <p>Some skin suits are available in a "plus size" that adds 5cm to the sleeves &amp; body.</p>
    </>
  ),
  'track-skin-suit-2022': (
    <>
      <p>Based on the track skin suits worn by Team GB, this skin suit has number pockets so you don't need to use pins.</p>
      <p>It is available in male and female specific versions and has an athletic fit, please see the size guide for details.</p>
      <p>Some skin suits are available in a "plus size" that adds 5cm to the sleeves &amp; body.</p>
    </>
  ),
  'pit-jacket-2022': (
    <>
      <p>A warm, insulated jacket to wear in before/after your races to keep you warm.</p>
    </>
  ),
  'pit-tights-2022': (
    <>
      <p>Insulated tights without a pad to wear over your bibs while you're rolling round the inner track/on the rollers waiting for your race to start, or after the races while you are having a beer.</p>
      <p>The tights have ankle zips for easy and quick removal without having to take your shoes off.</p>
    </>
  ),
  'musette-2019': (
    <>
      <p>Black cotton musette with screen printed club logo.</p>
    </>
  ),
  'bidon-2023': (
    <>
      <p>The club bidon has a <a href='https://www.velominati.com/#52'>rule #52</a>-friendly 600ml capacity, features a lockable lid with a leak-proof membrane cap and is dishwasher safe.</p>
      <p>It's made from polyethylene derived from sugar cane and is recyclable and biodegradable itself so once retired should not murder anything in the ocean.</p>
      <p>It's dishwasher safe up to 30 degrees and can be recycled as #4 LDPE, so anywhere that accepts plastic bags/film such as <a href='https://www.southwark.gov.uk/bins-and-recycling/recycling/recycling-centres/reuse-and-recycling-centre?chapter=3'>Southwark Recycling Centre</a>.</p>
    </>
  ),
  'white-socks-2023': (
    <>
      <p>White Summer Socks with club stripes at the top.</p>
      <p>These socks have a single layer leg for comfort on warmer days and pair nicely with white gloves and shoes.</p>
      <p>The Instagram-friendly orientation of the club motto on the top of the socks will remind you we roll united!</p>
      <p>The previous design is still available at RRC, now with a steep discount.</p>
    </>
  ),
  'black-socks-2023': (
    <>
      <p>Black Winter Socks with club stripes at the top.</p>
      <p>These socks have a double layer leg for extra warmth in cooler months.</p>
      <p>The Instagram-friendly orientation of the club motto on the top of the socks will remind you we roll united!</p>
      <p>The previous design is still available at RRC, now with a steep discount.</p>
    </>
  ),
  'white-cap-2019': (
    <>
      <p>White cotton cap with stitched ribbon and white screen print.</p>
      <p>Cycling caps keep the sun out of your eyes when it's sunny and the rain out of your eyes when it's wet.</p>
      <p>An essential piece of kit, don't leave home without one. Unless you are going to the pub, in which case observe <a href='https://www.velominati.com/#22'>Rule #22</a> and leave it at home.</p>
      <p>Our caps are made in Italy from white cotton with a stiff peak and the Peckham logos are screen printed in black. A stitched ribbon in club colours runs over the top.</p>
      <p>Hand wash only. We mean it.</p>
    </>
  ),
  'black-cap-2019': (
    <>
      <p>Black cotton cap with stitched ribbon and white screen print.</p>
      <p>Cycling caps keep the sun out of your eyes when it's sunny and the rain out of your eyes when it's wet.</p>
      <p>An essential piece of kit, don't leave home without one. Unless you are going to the pub, in which case observe <a href='https://www.velominati.com/#22'>Rule #22</a> and leave it at home.</p>
      <p>Our caps are made in Italy from white cotton with a stiff peak and the Peckham logos are screen printed in black. A stitched ribbon in club colours runs over the top.</p>
      <p>Hand wash only. We mean it.</p>
    </>
  ),
  'winter-arm-warmers-2022': (
    <>
      <p>Our Winter Arm Warmers are made from roubaix fabric -nylon/lycra construction with a brushed inner to retain heat.</p>
      <p>They have minimal seams for comfort and have silicone grippers at the bicep to ensure they stay in place.</p>
      <p>For sizing you should match them to your jersey size.</p>
    </>
  ),
  'summer-sleeves-2022': (
    <>
      <p>Lightweight lycra sleeves designed to keep the sun off your skin, or for summer alpine descents where you want to remove wind chill but not get any hotter.</p>
      <p>They have minimal seams for comfort and have silicone grippers at the bicep to ensure they stay in place.</p>
      <p>For sizing you should match them to your jersey size.</p>
    </>
  ),
  'neck-warmer-2022': (
    <>
      <p>Versatile fabric tube for use as a neck-warmer, face mask, hat, etc</p>
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
  ),
  'bday-t-shirt-2021': (
    <>
      <p>Celebrate our <del>10th</del> 11th birthday with this limited-edition short-sleeved t-shirt in 180gsm 100% organic ringspun cotton with front and rear designs.</p>
      <p>N.b our casualwear line is printed on-demand and shipped directly to you in 1-2 weeks so a postage cost will be calculated at checkout.</p>
    </>
  ),
  'track-top-2023': (
    <>
      <p>Casual track top made from 100% merino wool.</p>
      <p>Made for us by that stylish lot over at <a href='https://magliamo.be'>Magliamo</a>, our track tops harks back to the golden age of cycling - they are made from thick wool with a full length zip and will keep you warm while watching Track League or hanging out at the Brick.</p>
      <p>This is a high-quality knitted garment with the club logo woven front and back and the club stripes on the cuffs, collar and sleeves.</p>
      <p>Hand wash only.</p>
    </>
  ),
  'bar-bag-2022': (
    <>
      <p>For when you are on an Audax and need somewhere to stash your pork pies, some tools or an extra layer or two, look no further than our very own bar bag in our very own club colours.</p>
      <p>Made for us by the most excellent <a href='https://aravisbagworks.com'>Aravis Bagworks</a>, our handlebar bag is water resistant and made from 1000d cordura with a 6oz nylon lining.</p>
      <p>It also features a removable plastic insert to ensure it keeps its shape, and has attachment points in case you wish to add a shoulder strap.</p>
      <p>It comes with straps to mount the bag to your handlebars quickly and securely.</p>
    </>
  ),
  'trucker-cap-2023': (
    <>
      <p>Snapback trucker cap with embroidered club logo.</p>
      <p>Perfect for hanging out at the Brick or in the stands at Herne Hill.</p>
      <p>One size fits all with solid front, mesh back and adjustable strap at rear.</p>
    </>
  ),
  'down-jacket-2023': (
    <>
      <p>Packable down jacket in black with embroidered club logo on the breast.</p>
      <p>Perfect for evenings round the camp fire on bike packing trips, hanging out in the pits between races or just being in SE15 during the colder months of the year.</p>
      <p>It packs down into a small storage bag which is supplied with the jacket.</p>
      <p>Construction:</p>
      <ul>
        <li>Outer shell: 100% polyester</li>
        <li>Lining: 100% nylon</li>
        <li>Filling: 90% down/10% feathers</li>
      </ul>
      <p>The jacket filling complies with the <a href='https://icea.bio/en/certifications/non-food/biological-and-sustainable-textile-products/responsible-down-standard/'>Responsible Down Standard</a> for animal welfare.</p>
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

    if (product.variations) {
      product.variations.split('-').forEach(key => {
        if (Array.isArray(product.options[key])) {
          this.state.options[key] = product.options[key][0]
        } else {
          // non-array options are gendered
          this.state.options[key] = product.options[key][product.options.gender[0]][0]
        }
      })
    }
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

      if (key === 'gender') {
        // reset any options that are not available to this gender

        Object.keys(this.props.product.options).forEach(key => {
          if (Array.isArray(this.props.product.options[key])) {
            return
          }

          // non-array options are gendered
          if (!this.props.product.options[key][value]) {
            // this product does not have this option available for this gender
            s.options[key] = this.props.product.options[key][this.props.product.options.gender[0]][0]
          } else if (!this.props.product.options[key][value].includes(s.options[key])) {
            s.options[key] = this.props.product.options[key][value][0]
          }
        })
      }

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
    const { options } = this.state

    const productOptions = []

    if (product.variations) {
      product.variations.split('-').forEach(key => {
        let optionDetails = OPTIONS[key]

        if (key === 'size') {
          if (!product.sizeChart) {
            throw new Error(`No size chart defined for product ${product.slug}`)
          }

          optionDetails = OPTIONS.size[product.sizeChart]
        }

        if (!optionDetails) {
          throw new Error(`No options key defined for ${key}`)
        }

        const choices = product.options[key]

        if (Array.isArray(choices)) {
          productOptions.push(
            <div key={key}>
              <h4>{optionDetails.name}</h4>
              {optionDetails.notes ? <Note>{optionDetails.notes}</Note> : ''}
              {
                product.options[key].map(option => {
                  let name

                  if (key === 'size') {
                    name = option
                  } else if (optionDetails.options[option]) {
                    name = optionDetails.options[option]
                  }

                  if (!name) {
                    throw new Error(`No option name ${option} for option ${key} - had ${JSON.stringify(optionDetails.options)}`)
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
        } else {
          // non-array options are gendered options
          const gender = options.gender

          if (choices[gender]) {
            productOptions.push(
              <div key={key}>
                <h4>{optionDetails.name}</h4>
                {optionDetails.notes ? <Note>{optionDetails.notes}</Note> : ''}
                {
                  choices[gender].map(option => {
                    let name = option

                    if (key === 'size') {
                      name = optionDetails.options[option].name
                    } else if (optionDetails.options[option]) {
                      name = optionDetails.options[option]
                    }

                    if (!name) {
                      throw new Error(`No gendered option name ${option} for option ${key}`)
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
          }
        }
      })
    }

    const price = getPrice(product, options)
    let optionsArea

    if (product.type === 'premade') {
      optionsArea = (
        <OptionsArea>
          <h4>Pre-made item</h4>
          <p>This item is not available buy online, it is (almost certainly) in stock at <a href='https://ratracecycles.com'>Rat Race Cycles</a> for immediate purchase.</p>
          <p>Please pop down to the shop at your earliest convenience!</p>
        </OptionsArea>
      )
    } else {
      optionsArea = (
        <OptionsArea>
          {productOptions}
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
      )
    }

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
        <h3><Price price={price.amount} /></h3>
        {productDescription(product.slug)}
        {optionsArea}
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
