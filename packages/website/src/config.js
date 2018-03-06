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
import winterJacketFrontImage from '../assets/shop/winter-jacket-front.png?sizes[]=300,sizes[]=500'
import winterJacketRearImage from '../assets/shop/winter-jacket-rear.png?sizes[]=300,sizes[]=500'
import winterTightsFrontImage from '../assets/shop/winter-tights-front.png?sizes[]=300,sizes[]=500'
import winterTightsRearImage from '../assets/shop/winter-tights-rear.png?sizes[]=300,sizes[]=500'
import tripsImage from '../assets/shop/trips.png?sizes[]=300,sizes[]=500'

const productImages = {
  'SS-JERSEY-2018': [
    ssJerseyFrontImage,
    ssJerseyRearImage
  ],
  'LS-JERSEY-2018': [
    lsJerseyFrontImage,
    lsJerseyRearImage
  ],
  'WINTER-JACKET-2018': [
    winterJacketFrontImage,
    winterJacketRearImage
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
  'KNEE-WARMERS-2018': [
    kneeWarmersImage
  ],
  'LEG-WARMERS-2018': [
    legWarmersImage
  ],
  'CAPS-2018': [
    capFrontImage,
    capSidesImage
  ]
}

// Decorate config with product images
Object.keys(productImages).forEach(sku => {
  const product = config.store.products.find(product => product.sku === sku)

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
SECTIONS.WARMERS.images = [
  armWarmersImage
]
SECTIONS.HEADWEAR.images = [
  capFrontImage
]
SECTIONS.TRIPS.images = [
  tripsImage
]

export default config
export {
  SECTIONS,
  JERSEY_SIZES,
  GENDERS
}
