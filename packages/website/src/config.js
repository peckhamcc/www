import {
  config,
  SECTIONS,
  JERSEY_SIZES,
  GENDERS
} from '@peckhamcc/config'
import armWarmersImage from '../assets/shop/arm-warmers.png?sizes[]=300,sizes[]=500'
import armWarmersWhiteImage from '../assets/shop/arm-warmers-white.png?sizes[]=300,sizes[]=500'
import bibsFrontImage from '../assets/shop/bibs-front.png?sizes[]=300,sizes[]=500'
import bibsRearImage from '../assets/shop/bibs-rear.png?sizes[]=300,sizes[]=500'
import capFrontImage from '../assets/shop/cap-front.png?sizes[]=300,sizes[]=500'
import capWhiteSidesImage from '../assets/shop/cap-white-sides.png?sizes[]=300,sizes[]=500'
import capWhiteFrontImage from '../assets/shop/cap-white-front.png?sizes[]=300,sizes[]=500'
import capSidesImage from '../assets/shop/cap-sides.png?sizes[]=300,sizes[]=500'
import giletFrontImage from '../assets/shop/gilet-front.png?sizes[]=300,sizes[]=500'
import giletRearImage from '../assets/shop/gilet-rear.png?sizes[]=300,sizes[]=500'
import giletWhiteFrontImage from '../assets/shop/gilet-white-front.png?sizes[]=300,sizes[]=500'
import giletWhiteRearImage from '../assets/shop/gilet-white-rear.png?sizes[]=300,sizes[]=500'
import lsJerseyFrontImage from '../assets/shop/ls-jersey-front.png?sizes[]=300,sizes[]=500'
import lsJerseyRearImage from '../assets/shop/ls-jersey-rear.png?sizes[]=300,sizes[]=500'
import ssJerseyFrontImage from '../assets/shop/ss-jersey-front.png?sizes[]=300,sizes[]=500'
import ssJerseyRearImage from '../assets/shop/ss-jersey-rear.png?sizes[]=300,sizes[]=500'
import ssSummerJerseyFrontImage from '../assets/shop/ss-summer-jersey-front.png?sizes[]=300,sizes[]=500'
import ssSummerJerseyRearImage from '../assets/shop/ss-summer-jersey-rear.png?sizes[]=300,sizes[]=500'
// import ctsJerseyFrontImage from '../assets/shop/cts-jersey-front.png?sizes[]=300,sizes[]=500'
import winterJacketFrontImage from '../assets/shop/winter-jacket-front.png?sizes[]=300,sizes[]=500'
import winterJacketRearImage from '../assets/shop/winter-jacket-rear.png?sizes[]=300,sizes[]=500'
import winterTightsFrontImage from '../assets/shop/winter-tights-front.png?sizes[]=300,sizes[]=500'
import winterTightsRearImage from '../assets/shop/winter-tights-rear.png?sizes[]=300,sizes[]=500'
import socksSummerSideImage from '../assets/shop/socks-summer-side.png?sizes[]=300,sizes[]=500'
import socksSummerTopImage from '../assets/shop/socks-summer-top.png?sizes[]=300,sizes[]=500'
import socksWinterSideImage from '../assets/shop/socks-winter-side.png?sizes[]=300,sizes[]=500'
import socksWinterTopImage from '../assets/shop/socks-winter-top.png?sizes[]=300,sizes[]=500'
// import glovesImage from '../assets/shop/gloves.png?sizes[]=300,sizes[]=500'
import multiTubeImage from '../assets/shop/multi-tube.png?sizes[]=300,sizes[]=500'
// import headsetCapImage from '../assets/shop/headset-cap.png?sizes[]=300,sizes[]=500'
import bidonImage from '../assets/shop/bidon.png?sizes[]=300,sizes[]=500'
// import tshirtFrontImage from '../assets/shop/tshirt-front.png?sizes[]=300,sizes[]=500'
// import tshirtRearImage from '../assets/shop/tshirt-rear.png?sizes[]=300,sizes[]=500'
// import lsTshirtFrontImage from '../assets/shop/ls-tshirt-front.png?sizes[]=300,sizes[]=500'
// import lsTshirtRearImage from '../assets/shop/ls-tshirt-rear.png?sizes[]=300,sizes[]=500'
// import hoodieFrontImage from '../assets/shop/hoodie-front.png?sizes[]=300,sizes[]=500'
// import hoodieRearImage from '../assets/shop/hoodie-rear.png?sizes[]=300,sizes[]=500'
// import zipHoodieFrontImage from '../assets/shop/zip-hoodie-front.png?sizes[]=300,sizes[]=500'
import musetteImage from '../assets/shop/musette.png?sizes[]=300,sizes[]=500'
import speedSuitFrontImage from '../assets/shop/skin-suit-front.png?sizes[]=300,sizes[]=500'
import speedSuitRearImage from '../assets/shop/skin-suit-rear.png?sizes[]=300,sizes[]=500'
import triSuitFrontImage from '../assets/shop/tri-suit-front.png?sizes[]=300,sizes[]=500'
import triSuitRearImage from '../assets/shop/tri-suit-rear.png?sizes[]=300,sizes[]=500'

const productImages = {
  /*
  'CTS-JERSEY-2019': [
    ctsJerseyFrontImage,
    ssSummerJerseyRearImage
  ],
  */
  'CLUB-JERSEY-2020': [
    ssJerseyFrontImage,
    ssJerseyRearImage
  ],
  'WINTER-JERSEY-2020': [
    lsJerseyFrontImage,
    lsJerseyRearImage
  ],
  'CLUB-SUMMER-JERSEY-2020': [
    ssSummerJerseyFrontImage,
    ssSummerJerseyRearImage
  ],
  'RACE-JERSEY-2020': [
    ssJerseyFrontImage,
    ssJerseyRearImage
  ],
  /*
  'WINTER-JACKET-2018': [
    winterJacketFrontImage,
    winterJacketRearImage
  ],
  */
  'SHELL-JACKET-2020': [
    winterJacketFrontImage,
    winterJacketRearImage
  ],
  'GILET-2020': [
    giletFrontImage,
    giletRearImage
  ],
  'GILET-WHITE-2020': [
    giletWhiteFrontImage,
    giletWhiteRearImage
  ],
  'BIB-SHORTS-2020': [
    bibsFrontImage,
    bibsRearImage
  ],
  'WINTER-TIGHTS-2020': [
    winterTightsFrontImage,
    winterTightsRearImage
  ],
  'ARM-WARMERS-2020': [
    armWarmersImage
  ],
  'ARM-WARMERS-WHITE-2020': [
    armWarmersWhiteImage
  ],
  'CAP-2018': [
    capFrontImage,
    capSidesImage
  ],
  'CAP-WHITE-2020': [
    capWhiteFrontImage,
    capWhiteSidesImage
  ],
  'NECK-WARMER-2018': [
    multiTubeImage
  ],
  'SOCKS-SUMMER-2019': [
    socksSummerSideImage,
    socksSummerTopImage
  ],
  'SOCKS-WINTER-2019': [
    socksWinterSideImage,
    socksWinterTopImage
  ],
  /*  'GLOVES-2018': [
    glovesImage
  ],
  'HEADSET-CAP-2018': [
    headsetCapImage
  ],
  */
  'CLUB-BIDON-2018': [
    bidonImage
  ],
  /*
  'CLUB-TSHIRT-2019': [
    tshirtFrontImage,
    tshirtRearImage
  ],
  'CLUB-LS-TSHIRT-2019': [
    lsTshirtFrontImage,
    lsTshirtRearImage
  ],
  'CLUB-HOODIE-2019': [
    hoodieFrontImage,
    hoodieRearImage
  ],
  'CLUB-ZIP-HOODIE-2019': [
    zipHoodieFrontImage,
    hoodieRearImage
  ],
  */
  'MUSETTE-2019': [
    musetteImage
  ],
  'SPEED-SUIT-2020': [
    speedSuitFrontImage,
    speedSuitRearImage
  ],
  'TRI-SUIT-2020': [
    triSuitFrontImage,
    triSuitRearImage
  ]
}

// Decorate config with product images
Object.keys(productImages).forEach(sku => {
  const product = config.store.products.find(product => product.sku === sku)

  if (!product) {
    console.warn('Could not find product for', sku)

    return
  }

  product.images = productImages[sku]
})

// Remove sections without products
Object.keys(SECTIONS).forEach(name => {
  const section = SECTIONS[name]
  const product = config.store.products.find(product => product.section.slug === section.slug)

  if (product) {
    section.images = [
      product.images[0]
    ]
  } else {
    delete SECTIONS[name]
  }
})

export default config
export {
  SECTIONS,
  JERSEY_SIZES,
  GENDERS
}
