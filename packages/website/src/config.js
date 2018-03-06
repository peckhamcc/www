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

export const SECTIONS = {
  JERSEYS: {
    title: 'Jerseys',
    slug: 'jerseys',
    images: [
      ssJerseyFrontImage
    ]
  },
  OUTERWEAR: {
    title: 'Outerwear',
    slug: 'outerwear',
    images: [
      winterJacketFrontImage
    ]
  },
  SHORTS: {
    title: 'Bib shorts/tights',
    slug: 'bibs',
    images: [
      bibsFrontImage
    ]
  },
  WARMERS: {
    title: 'Warmers',
    slug: 'warmers',
    images: [
      armWarmersImage
    ]
  },
  HEADWEAR: {
    title: 'Headwear',
    slug: 'headware',
    images: [
      capFrontImage
    ]
  },
  TRIPS: {
    title: 'Trips',
    slug: 'trips',
    images: [
      tripsImage
    ]
  }
}

const JERSEY_SIZES = [{
    code: 'XS',
    name: 'Extra small'
  }, {
    code: 'S',
    name: 'Small'
  }, {
    code: 'M',
    name: 'Medium'
  }, {
    code: 'L',
    name: 'Large'
  }, {
    code: 'XL',
    name: 'Extra large'
  }, {
    code: 'XXL',
    name: '2X Large'
  }, {
    code: 'XXXL',
    name: '3X Large'
  }
]

const GENDERS = [
  'Male',
  'Female'
]

const config = {
  aws: {
    region: 'eu-west-2'
  },
  lambda: {
    clientToken: '/lambda/create-client-token',
    sendPayment: '/lambda/send-payment'
  },
  store: {
    shipping: [{
      title: 'Pick up from Rat Race Cycles',
      price: 0
    }, {
      title: 'UK Postage',
      price: 7
    }, {
      title: 'Postage to rest of world',
      price: 20
    }],
    products: [{
      sku: 'SS-JERSEY-2018',
      title: 'Short Sleeved Club Jersey',
      slug: 'short-sleeved-jersey',
      section: SECTIONS.JERSEYS,
      images: [
        ssJerseyFrontImage,
        ssJerseyRearImage
      ],
      description: '',
      details: [
        'Lightweight club jersey in black',
        'Raglan sleeves, three pockets',
        'Such detail',
        'Wow.'
      ],
      price: 6700,
      sizes: JERSEY_SIZES,
      genders: GENDERS
    }, {
      sku: 'LS-JERSEY-2018',
      title: 'Long Sleeved Club Jersey',
      slug: 'long-sleeved-jersey',
      section: SECTIONS.JERSEYS,
      images: [
        lsJerseyFrontImage,
        lsJerseyRearImage
      ],
      description: '',
      details: [
        'Long sleeved club jersey in black',
        'Raglan sleeves, three pockets',
        'Such detail',
        'Winter rider?'
      ],
      price: 6700,
      sizes: JERSEY_SIZES,
      genders: GENDERS
    }, {
      sku: 'WINTER-JACKET-2018',
      title: 'Winter Jacket',
      slug: 'winter-jacket',
      section: SECTIONS.OUTERWEAR,
      images: [
        winterJacketFrontImage,
        winterJacketRearImage
      ],
      description: '',
      details: [
        'Winter jacket in black',
        'Raglan sleeves, three pockets',
        'Such detail',
        'Winter rider?'
      ],
      price: 8500,
      sizes: JERSEY_SIZES,
      genders: GENDERS
    }, {
      sku: 'GILET-2018',
      title: 'Gilet',
      slug: 'gilet',
      section: SECTIONS.OUTERWEAR,
      images: [
        giletFrontImage,
        giletRearImage
      ],
      description: '',
      details: [
        'Gilet in black',
        'Raglan sleeves, three pockets',
        'Such detail',
        'Winter rider?'
      ],
      price: 4500,
      sizes: JERSEY_SIZES,
      genders: GENDERS
    }, {
      sku: 'BIB-SHORTS-2018',
      title: 'Bib shorts',
      slug: 'bib-shorts',
      section: SECTIONS.SHORTS,
      images: [
        bibsFrontImage,
        bibsRearImage
      ],
      description: '',
      details: [
        'Bib shorts in black',
        'Raglan sleeves, three pockets',
        'Such detail',
        'Winter rider?'
      ],
      price: 5000,
      sizes: JERSEY_SIZES,
      genders: GENDERS
    }, {
      sku: 'WINTER-TIGHTS-2018',
      title: 'Winter tights',
      slug: 'winter-tights',
      section: SECTIONS.SHORTS,
      images: [
        winterTightsFrontImage,
        winterTightsRearImage
      ],
      description: '',
      details: [
        'Winter tights in black',
        'Raglan sleeves, three pockets',
        'Such detail',
        'Winter rider?'
      ],
      price: 8000,
      sizes: JERSEY_SIZES,
      genders: GENDERS
    }, {
      sku: 'ARM-WARMERS-2018',
      title: 'Arm warmers',
      slug: 'arm-warmers',
      section: SECTIONS.WARMERS,
      images: [
        armWarmersImage
      ],
      description: '',
      details: [
        'Arm warmers. Warm.',
        'Such detail',
        'Winter rider?'
      ],
      price: 1500,
      sizes: JERSEY_SIZES
    }, {
      sku: 'KNEE-WARMERS-2018',
      title: 'Knee warmers',
      slug: 'knee-warmers',
      section: SECTIONS.WARMERS,
      images: [
        kneeWarmersImage
      ],
      description: '',
      details: [
        'Knee warmers. Warm.',
        'Such detail',
        'Winter rider?'
      ],
      price: 1500,
      sizes: JERSEY_SIZES
    }, {
      sku: 'LEG-WARMERS-2018',
      title: 'Leg warmers',
      slug: 'leg-warmers',
      section: SECTIONS.WARMERS,
      images: [
        legWarmersImage
      ],
      description: '',
      details: [
        'Leg warmers. Warm.',
        'Such detail',
        'Winter rider?'
      ],
      price: 1500,
      sizes: JERSEY_SIZES
    }, {
      sku: 'CAPS-2018',
      title: 'Cap',
      slug: 'cap',
      section: SECTIONS.HEADWEAR,
      images: [
        capFrontImage,
        capSidesImage
      ],
      description: '',
      details: [
        'Cap.',
        'Such detail',
        'Cotton head.'
      ],
      price: 1500
    }]
  }
}

export default config
