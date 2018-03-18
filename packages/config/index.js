
const SECTIONS = {
  JERSEYS: {
    title: 'Jerseys',
    slug: 'jerseys'
  },
  OUTERWEAR: {
    title: 'Outerwear',
    slug: 'outerwear'
  },
  SHORTS: {
    title: 'Bib shorts/tights',
    slug: 'bibs'
  },
  WARMERS: {
    title: 'Warmers',
    slug: 'warmers'
  },
  HEADWEAR: {
    title: 'Headwear',
    slug: 'headware'
  },
  TRIPS: {
    title: 'Trips',
    slug: 'trips'
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
  code: '2XL',
  name: '2X Large'
}, {
  code: '3XL',
  name: '3X Large'
}]

const GENDERS = [{
  code: 'M',
  name: 'Male'
}, {
  code: 'F',
  name: 'Female'
}]

const config = {
  aws: {
    ses: {
      region: 'eu-west-1',
      version: '2010-12-01'
    },
    lambda: {
      region: 'eu-west-2'
    }
  },
  lambda: {
    clientToken: '/lambda/create-client-token',
    sendPayment: '/lambda/send-payment',
    sendContactFormEmail: '/lambda/send-contact-form-email'
  },
  flags: {
    store: false
  },
  email: {
    to: 'peckhamcc@gmail.com',
    from: 'peckhamcc@gmail.com'
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

if (process.env.NODE_ENV !== 'development') {
  config.lambda.sendContactFormEmail = 'https://2vgzz1azxk.execute-api.eu-west-2.amazonaws.com/prod/contact'
}

module.exports = {
  config,
  SECTIONS,
  JERSEY_SIZES,
  GENDERS
}
