import {
  config,
  SECTIONS,
  JERSEY_SIZES,
  GENDERS
} from '@peckhamcc/config'
import armWarmersImage from '../assets/shop/arm-warmers.png?sizes[]=300,sizes[]=500'
import bibsFrontImage from '../assets/shop/bibs-front.png?sizes[]=300,sizes[]=500'
import bibsRearImage from '../assets/shop/bibs-rear.png?sizes[]=300,sizes[]=500'
import capFrontImage from '../assets/shop/cap-front.png?sizes[]=300,sizes[]=500'
import capSidesImage from '../assets/shop/cap-sides.png?sizes[]=300,sizes[]=500'
import giletFrontImage from '../assets/shop/gilet-front.png?sizes[]=300,sizes[]=500'
import giletRearImage from '../assets/shop/gilet-rear.png?sizes[]=300,sizes[]=500'
import kneeWarmersImage from '../assets/shop/knee-warmers.png?sizes[]=300,sizes[]=500'
import legWarmersImage from '../assets/shop/leg-warmers.png?sizes[]=300,sizes[]=500'
import lsJerseyFrontImage from '../assets/shop/ls-jersey-front.png?sizes[]=300,sizes[]=500'
import lsJerseyRearImage from '../assets/shop/ls-jersey-rear.png?sizes[]=300,sizes[]=500'
import shoeCoversImage from '../assets/shop/shoe-covers.png?sizes[]=300,sizes[]=500'
import ssJerseyFrontImage from '../assets/shop/ss-jersey-front.png?sizes[]=300,sizes[]=500'
import ssJerseyRearImage from '../assets/shop/ss-jersey-rear.png?sizes[]=300,sizes[]=500'
import ssSummerJerseyFrontImage from '../assets/shop/ss-summer-jersey-front.png?sizes[]=300,sizes[]=500'
import ssSummerJerseyRearImage from '../assets/shop/ss-summer-jersey-rear.png?sizes[]=300,sizes[]=500'
import winterJacketFrontImage from '../assets/shop/winter-jacket-front.png?sizes[]=300,sizes[]=500'
import winterJacketRearImage from '../assets/shop/winter-jacket-rear.png?sizes[]=300,sizes[]=500'
import winterTightsFrontImage from '../assets/shop/winter-tights-front.png?sizes[]=300,sizes[]=500'
import winterTightsRearImage from '../assets/shop/winter-tights-rear.png?sizes[]=300,sizes[]=500'
import tripsImage from '../assets/shop/trips.png?sizes[]=300,sizes[]=500'
import socksSideImage from '../assets/shop/socks-side.png?sizes[]=300,sizes[]=500'
import socksTopImage from '../assets/shop/socks-top.png?sizes[]=300,sizes[]=500'
import glovesImage from '../assets/shop/gloves.png?sizes[]=300,sizes[]=500'
import multiTubeImage from '../assets/shop/multi-tube.png?sizes[]=300,sizes[]=500'
import headsetCapImage from '../assets/shop/headset-cap.png?sizes[]=300,sizes[]=500'

const productImages = {
  'CLUB-JERSEY-2018': [
    ssJerseyFrontImage,
    ssJerseyRearImage
  ],
  'WINTER-JERSEY-2018': [
    lsJerseyFrontImage,
    lsJerseyRearImage
  ],
  'CLUB-SUMMER-JERSEY-2018': [
    ssSummerJerseyFrontImage,
    ssSummerJerseyRearImage
  ],
  'WINTER-JACKET-2018': [
    winterJacketFrontImage,
    winterJacketRearImage
  ],
  'RAIN-JACKET-2018': [
    lsJerseyFrontImage,
    lsJerseyRearImage
  ],
  'GILET-2018': [
    giletFrontImage,
    giletRearImage
  ],
  'BIB-SHORTS-2018': [
    bibsFrontImage,
    bibsRearImage
  ],
  'WINTER-TIGHTS-2018': [
    winterTightsFrontImage,
    winterTightsRearImage
  ],
  'ARM-WARMERS-2018': [
    armWarmersImage
  ],
  'CAP-2018': [
    capFrontImage,
    capSidesImage
  ],
  'NECK-WARMER-2018': [
    multiTubeImage
  ],
  'SOCKS-2018': [
    socksSideImage,
    socksTopImage
  ],
  'GLOVES-2018': [
    glovesImage
  ],
  'HEADSET-CAP-2018': [
    headsetCapImage
  ]
}

// Decorate config with product images
Object.keys(productImages).forEach(sku => {
  const product = config.store.products.find(product => product.sku === sku)

  if (!product) {
    console.warn('Could not find product for', sku)
  }

  product.images = productImages[sku]
})

// Decorate sections with images
SECTIONS.JERSEYS.images = [
  ssJerseyFrontImage
]
SECTIONS.OUTERWEAR.images = [
  winterJacketFrontImage
]
SECTIONS.SHORTS.images = [
  bibsFrontImage
]
SECTIONS.ACCESSORIES.images = [
  capFrontImage
]

export default config
export {
  SECTIONS,
  JERSEY_SIZES,
  GENDERS
}
