import ssJerseyFrontImage from '../assets/ss-jersey-front.png?sizes[]=300,sizes[]=500'
import ssJerseyRearImage from '../assets/ss-jersey-rear.png?sizes[]=300,sizes[]=500'

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
      ssJerseyFrontImage
    ]
  },
  SHORTS: {
    title: 'Bib shorts/tights',
    slug: 'bibs',
    images: [
      ssJerseyFrontImage
    ]
  },
  WARMERS: {
    title: 'Warmers',
    slug: 'warmers',
    images: [
      ssJerseyFrontImage
    ]
  },
  HEADWEAR: {
    title: 'Headwear',
    slug: 'headware',
    images: [
      ssJerseyFrontImage
    ]
  },
  TRIPS: {
    title: 'Trips',
    slug: 'trips',
    images: [
      ssJerseyFrontImage
    ]
  }
}

const JERSEY_SIZES = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL'
]

const GENDERS = [
  'Male',
  'Female'
]

const config = {
  aws: {
    region: 'eu-west-2'
  },
  store: {
    products: [{
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
      title: 'Long Sleeved Club Jersey',
      slug: 'long-sleeved-jersey',
      section: SECTIONS.JERSEYS,
      images: [
        ssJerseyFrontImage
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
    }]
  }
}

export default config
