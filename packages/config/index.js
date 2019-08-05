
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
  ACCESSORIES: {
    title: 'Accessories',
    slug: 'accessories'
  },
  CASUAL: {
    title: 'Casualwear',
    slug: 'casualwear'
  }
}

const JERSEY_SIZES = [{
  code: 'XS',
  name: 'Extra small',
  measurements: {
    chest: {
      male: {
        min: 78,
        max: 82
      },
      female: {
        min: 77,
        max: 80
      }
    },
    waist: {
      male: {
        min: 71,
        max: 72
      },
      female: {
        min: 61,
        max: 64
      }
    }
  }
}, {
  code: 'S',
  name: 'Small',
  measurements: {
    chest: {
      male: {
        min: 83,
        max: 88
      },
      female: {
        min: 81,
        max: 84
      }
    },
    waist: {
      male: {
        min: 73,
        max: 78
      },
      female: {
        min: 65,
        max: 68
      }
    }
  }
}, {
  code: 'M',
  name: 'Medium',
  measurements: {
    chest: {
      male: {
        min: 89,
        max: 94
      },
      female: {
        min: 85,
        max: 88
      }
    },
    waist: {
      male: {
        min: 79,
        max: 84
      },
      female: {
        min: 85,
        max: 88
      }
    }
  }
}, {
  code: 'L',
  name: 'Large',
  measurements: {
    chest: {
      male: {
        min: 95,
        max: 100
      },
      female: {
        min: 89,
        max: 92
      }
    },
    waist: {
      male: {
        min: 85,
        max: 90
      },
      female: {
        min: 73,
        max: 76
      }
    }
  }
}, {
  code: 'XL',
  name: 'Extra large',
  measurements: {
    chest: {
      male: {
        min: 101,
        max: 106
      },
      female: {
        min: 93,
        max: 96
      }
    },
    waist: {
      male: {
        min: 91,
        max: 96
      },
      female: {
        min: 77,
        max: 80
      }
    }
  }
}, {
  code: 'XXL',
  name: 'XX Large',
  measurements: {
    chest: {
      male: {
        min: 107,
        max: 112
      },
      female: {
        min: 97,
        max: 100
      }
    },
    waist: {
      male: {
        min: 97,
        max: 102
      },
      female: {
        min: 81,
        max: 84
      }
    }
  }
}]
/*
const ARM_WARMER_SIZES = [{
  code: 'S',
  name: 'Small',
  measurements: {
    bicep: {
      unisex: {
        min: 25,
        max: 30
      }
    }
  }
}, {
  code: 'M',
  name: 'Medium',
  measurements: {
    bicep: {
      unisex: {
        min: 30,
        max: 35
      }
    }
  }
}, {
  code: 'L',
  name: 'Large',
  measurements: {
    bicep: {
      unisex: {
        min: 35,
        max: 40
      }
    }
  }
}]
*/
const SOCK_SIZES = [{
  code: 'S/M',
  name: 'Small/Medium',
  measurements: {
    shoe: {
      unisex: 'UK 3-6'
    }
  }
}, {
  code: 'L/XL',
  name: 'Large/Extra Large',
  measurements: {
    shoe: {
      unisex: 'UK 7-11+'
    }
  }
}]
/*
const GLOVE_SIZES = [{
  code: 'XS',
  name: 'Extra small',
  measurements: {
    palm: {
      unisex: {
        metric: '7cm',
        imperial: '2.7"'
      }
    }
  }
}, {
  code: 'S',
  name: 'Small',
  measurements: {
    palm: {
      unisex: {
        metric: '8cm',
        imperial: '3.1"'
      }
    }
  }
}, {
  code: 'M',
  name: 'Medium',
  measurements: {
    palm: {
      unisex: {
        metric: '9cm',
        imperial: '3.5"'
      }
    }
  }
}, {
  code: 'L',
  name: 'Large',
  measurements: {
    palm: {
      unisex: {
        metric: '10cm',
        imperial: '3.9"'
      }
    }
  }
}, {
  code: 'XL',
  name: 'Extra large',
  measurements: {
    palm: {
      unisex: {
        metric: '11cm',
        imperial: '4.3"'
      }
    }
  }
}, {
  code: 'XXL',
  name: 'XX Large',
  measurements: {
    palm: {
      unisex: {
        metric: '12cm',
        imperial: '5.1"'
      }
    }
  }
}]
*/
const TSHIRT_SIZES = [{
  code: 'S',
  name: 'Small',
  measurements: {
    chest: {
      male: {
        min: 86,
        max: 91
      },
      female: {
        min: 86,
        max: 89
      }
    }
  }
}, {
  code: 'M',
  name: 'Medium',
  measurements: {
    chest: {
      male: {
        min: 96,
        max: 101
      },
      female: {
        min: 91,
        max: 94
      }
    }
  }
}, {
  code: 'L',
  name: 'Large',
  measurements: {
    chest: {
      male: {
        min: 106,
        max: 111
      },
      female: {
        min: 99,
        max: 101
      }
    }
  }
}, {
  code: 'XL',
  name: 'Extra large',
  measurements: {
    chest: {
      male: {
        min: 117,
        max: 122
      },
      female: {
        min: 106,
        max: 112
      }
    }
  }
}, {
  code: 'XXL',
  name: 'XX Large',
  measurements: {
    chest: {
      male: {
        min: 127,
        max: 132
      },
      female: {
        min: 117,
        max: 122
      }
    }
  }
}]
/*
const VARIANTS_SHORT_SLEEVED_JERSEY = [{
  code: 'LONG',
  name: 'Long (+5cm body, +2.5cm sleeves)'
}, {
  code: 'REGULAR',
  name: 'Regular'
}, {
  code: 'SHORT',
  name: 'Short (-5cm body, -2.5cm sleeves)'
}]

const VARIANTS_LEG = [{
  code: 'LONG',
  name: 'Long (+5cm leg length)'
}, {
  code: 'REGULAR',
  name: 'Regular'
}, {
  code: 'SHORT',
  name: 'Short (-5cm leg length)'
}]

const VARIANTS_PAD = [{
  code: 'NARROW',
  name: 'Narrow (up to 134mm)'
}, {
  code: 'REGULAR',
  name: 'Regular (135-144mm)'
}, {
  code: 'WIDE',
  name: 'Wide (145mm+)'
}]
*/
const GENDERS = [{
  code: 'M',
  name: 'Male'
}, {
  code: 'F',
  name: 'Female'
}]

const UNITS = [{
  code: 'M',
  name: 'Metric'
}, {
  code: 'I',
  name: 'Imperial'
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
    sendPayment: '/lambda/send-payment',
    sendContactFormEmail: '/lambda/send-contact-form-email'
  },
  flags: {
    store: true,
    email: true,
    payments: false
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
    products: [
      /*
    {
      sku: 'CTS-JERSEY-2019',
      title: 'Chase The Sun Event Jersey',
      slug: 'cts-jersey',
      section: SECTIONS.JERSEYS,
      details: [
        'Lightweight Short Sleeved Jersey in white.',
        'An anatomically cut jersey with a smooth Asteria Lycra front for maximum aero and a lightly meshed back and under-arms for breathability.',
        'It comes with a full-length zip, silicone grippers on the arms &amp; waist, three rear pockets along with a zip pocket for your valuables.',
        'It is available in male and female specific versions and has an athletic fit yet the material is stretchy enough to accommodate most body shapes.'
      ],
      price: 6500,
      sizes: JERSEY_SIZES,
      genders: GENDERS
    },
    {
      sku: 'CLUB-JERSEY-2018',
      title: 'Short Sleeved Club Jersey',
      slug: 'short-sleeved-jersey',
      section: SECTIONS.JERSEYS,
      details: [
        'Lightweight Short Sleeved Club Jersey in black.',
        'Based on the jerseys used by the Movistar professional team, the Peckham CC Club Jersey is made from Italian wicking fabrics with Coldblack Technology and has three large rear pockets.',
        'It comes with a full-length YKK zip, silicone grippers on the arms &amp; waist and is available in various lengths and sizes and is handmade in Scotland.',
        'It is available in male and female specific versions and has an athletic fit.'
      ],
      price: 8000,
      sizes: JERSEY_SIZES,
      variants: {
        length: {
          description: 'Custom length',
          options: VARIANTS_SHORT_SLEEVED_JERSEY
        }
      },
      genders: GENDERS,
      fs260: {
        link: 'https://www.endurasport.com/product/pro-sl-jersey-e3132/',
        name: 'Pro SL Jersey'
      }
    }, {
      sku: 'CLUB-SUMMER-JERSEY-2018',
      title: 'Short Sleeved Summer Jersey',
      slug: 'short-sleeved-summer-jersey',
      section: SECTIONS.JERSEYS,
      details: [
        'Lightweight Short Sleeved Club Jersey in white.',
        'Based on the jerseys used by the Movistar professional team, the Peckham CC Club Jersey is made from Italian wicking fabrics with Coldblack Technology and has three large rear pockets.',
        'It comes with a full-length YKK zip, silicone grippers on the arms &amp; waist and is available in various lengths and sizes and is handmade in Scotland.',
        'It is available in male and female specific versions and has an athletic fit.'
      ],
      price: 8000,
      sizes: JERSEY_SIZES,
      variants: {
        length: {
          description: 'Custom length',
          options: VARIANTS_SHORT_SLEEVED_JERSEY
        }
      },
      genders: GENDERS,
      fs260: {
        link: 'https://www.endurasport.com/product/pro-sl-jersey-e3132/',
        name: 'Pro SL Jersey'
      }
    }, {
      sku: 'WINTER-JERSEY-2018',
      title: 'Long Sleeved Winter Jersey',
      slug: 'long-sleeved-jersey',
      section: SECTIONS.JERSEYS,
      details: [
        'Long Sleeved Winter Jersey in black.',
        'Made from a high performing Hydrophilic and Hydrophobic fabric and has three large rear pockets.',
        'It comes with a full-length YKK zip, silicone grippers on the cuffs &amp; waist and is handmade in Scotland.',
        'It is available in male and female specific versions and has an athletic fit.'
      ],
      price: 9200,
      sizes: JERSEY_SIZES,
      genders: GENDERS,
      fs260: {
        link: 'https://www.endurasport.com/product/pro-sl-ls-jersey/',
        name: 'Pro SL L/S Jersey'
      }
    }, {
      sku: 'WINTER-JACKET-2018',
      title: 'Winter Jacket',
      slug: 'winter-jacket',
      section: SECTIONS.OUTERWEAR,
      details: [
        'Club Winter Jacket in black',
        'Made from an Italian Roubaix high stretch fabric (e.g. nylon/lycra construction with a brushed inner to retain heat), the Winter Jacket has windproof front, sides &amp; yoke.',
        'It comes with a full-length YKK zip, three large pockets on the back and is handmade in Scotland.',
        'It is available in male and female specific versions and has an athletic fit.'
      ],
      price: 10000,
      sizes: JERSEY_SIZES,
      genders: GENDERS
    }, {
      sku: 'RAIN-JACKET-2018',
      title: 'Rain Jacket',
      slug: 'rain-jacket',
      section: SECTIONS.OUTERWEAR,
      details: [
        'Club Rain Jacket in black',
        'Waterproof jacket featuring a 2.5L bonded outer/inner with a waterproof layer between and full taped seams for complete protection from the elements.',
        'It comes with a fleece collar, a full-length YKK zip, three large pockets on the back and is hand made in Scotland.',
        'It is available in male and female specific versions and has an athletic fit.'
      ],
      price: 12200,
      sizes: JERSEY_SIZES,
      genders: GENDERS,
      fs260: {
        link: 'https://www.endurasport.com/product/pro-sl-shell-jacket/',
        name: 'Pro SL Shell Jacket'
      }
    }, {
      sku: 'GILET-2018',
      title: 'Gilet',
      slug: 'gilet',
      section: SECTIONS.OUTERWEAR,
      details: [
        'Lightweight packable Club Gilet in black',
        'The Club Gilet has a windproof front &amp; shoulders and is made of a high stretch fine denier material.',
        'It has a deep neck for increased wind protection, comes with a full-length YKK zip, three rear pockets and packs down to easily fit in a jersey pocket.',
        'It is available in male and female specific versions and has an athletic fit.'
      ],
      price: 6400,
      sizes: JERSEY_SIZES,
      genders: GENDERS,
      fs260: {
        link: 'https://www.endurasport.com/product/pro-sl-lite-gilet/',
        name: 'Pro SL Lite Gilet'
      }
    }, {
      sku: 'BIB-SHORTS-2018',
      title: 'Bib shorts',
      slug: 'bib-shorts',
      section: SECTIONS.SHORTS,
      details: [
        'Club Bib Shorts in black',
        'Made from Italian Power Lycra fabric with Coldblack Technology, our Club Bibshort has a wicking upper mesh and flat-lock stitching and overlocked seams throughout for comfort.',
        'There\'s a discrete rear pocket for your valuables and raw edge silicone hem grips to make sure the legs stay put.',
        'Handmade in Scotland, it is available in male and female specific versions and there are options for varying leg lengths.'
      ],
      price: 10500,
      sizes: JERSEY_SIZES,
      variants: {
        leg: {
          description: 'Custom leg length',
          options: VARIANTS_LEG
        },
        pad: {
          description: 'Custom pad width (based on saddle width)',
          options: VARIANTS_PAD
        }
      },
      genders: GENDERS,
      fs260: {
        link: 'https://www.endurasport.com/product/pro-sl-bibshort-ii-medium-pad/',
        name: 'Pro SL Bib Short II'
      }
    }, {
      sku: 'WINTER-TIGHTS-2018',
      title: 'Winter tights',
      slug: 'winter-tights',
      section: SECTIONS.SHORTS,
      details: [
        'Winter Tights in black',
        'Thermal winter tights made from Roubaix high stretch insulation (e.g. nylon/lycra construction with a brushed inner to retain heat).',
        'Handmade in Scotland, it is available in male and female specific versions and has an athletic fit.'
      ],
      price: 12100,
      sizes: JERSEY_SIZES,
      variants: {
        pad: {
          description: 'Custom pad width (based on saddle width)',
          options: VARIANTS_PAD
        }
      },
      genders: GENDERS,
      fs260: {
        link: 'https://www.endurasport.com/product/pro-sl-biblong-medium-pad/',
        name: 'Pro SL Bib Long'
      }
    }, {
      sku: 'ARM-WARMERS-2018',
      title: 'Arm warmers',
      slug: 'arm-warmers',
      section: SECTIONS.ACCESSORIES,
      details: [
        'Jazzy Arm Warmers',
        'Our Thermal Arm Warmers are made from Roubaix high stretch insulation (e.g. nylon/lycra construction with a brushed inner to retain heat).',
        'They have minimal seams for comfort and have silicone grippers at the bicep to ensure they stay in place.',
        'Handmade in Scotland, this is a unisex item.'
      ],
      price: 2300,
      sizes: ARM_WARMER_SIZES,
      fs260: {
        link: 'https://www.endurasport.com/product/thermolite-arm-warmer/',
        name: 'Thermo Arm Warmer'
      }
    },
    */ {
        sku: 'CAP-2018',
        title: 'Cap',
        slug: 'cap',
        section: SECTIONS.ACCESSORIES,
        details: [
          'Black cotton cap with stitched ribbon and white screen print.',
          'Cycling caps keep the sun out of your eyes when it\'s sunny and the rain out of your eyes when it\'s wet.',
          'An essential piece of kit, don\'t leave home without one. Unless you are going to the pub, in which case observe <a href="http://www.velominati.com/the-rules/#22">rule #22</a> and leave it at home.',
          'Our caps are made in Italy from black cotton with a stiff peak and the Peckham logos are screen printed in white. A stitched ribbon in club colours runs over the top.',
          'Hand wash only. We mean it.',
          'N.b. there is stock of this item available to buy at <a href="https://ratracecycles.com/">Rat Race Cycles</a>'
        ],
        price: 1500
      },
      /* {
      sku: 'NECK-WARMER-2018',
      title: 'Neck warmer',
      slug: 'neck-warmer',
      section: SECTIONS.ACCESSORIES,
      details: [
        'Club Neck Warmer',
        'Versatile fabric tube that can be worn as a neck tube, mask, bandana, skull cap etc.',
        'Handmade in Scotland, this is a unisex item.'
      ],
      price: 1400,
      fs260: {
        link: 'https://www.endurasport.com/product/fs260-pro-multitube/',
        name: 'FS260-Pro Multitube'
      }
    }, {
      sku: 'GLOVES-2018',
      title: 'Gloves',
      slug: 'gloves',
      section: SECTIONS.ACCESSORIES,
      details: [
        'Club Gloves in black',
        'Four-way stretch fabric with gel padding &amp; ventilation for your palms, our Club Gloves have an aerodynamic streamlined design with a strapless cuff that will save you at least half a watt.',
        'Handmade in Scotland, this is a unisex item.'
      ],
      sizes: GLOVE_SIZES,
      price: 2800,
      fs260: {
        link: 'https://www.endurasport.com/product/fs260-pro-print-mitt/',
        name: 'FS260 Pro Print Mitt'
      }
    }, */
      {
        sku: 'SOCKS-WINTER-2019',
        title: 'Winter Club Socks',
        slug: 'winter-socks',
        section: SECTIONS.ACCESSORIES,
        details: [
          'Black Club Socks with a merino foot & nylon leg culminating in the club stripes at the top.',
          'Cuff size is a Rule #27 friendly 7.5-inches for large, 6.5-inches for medium.',
          'The Instagram-friendly orientation of the club motto on the top of the socks will remind you we roll united!'
        ],
        sizes: SOCK_SIZES,
        price: 1300
      }, {
        sku: 'SOCKS-SUMMER-2019',
        title: 'Summer Club Socks',
        slug: 'summer-socks',
        section: SECTIONS.ACCESSORIES,
        details: [
          'White Club Socks in CoolMax foot & nylon leg culminating in the club stripes at the top.',
          'Cuff size is a Rule #27 friendly 7.5-inches for large, 6.5-inches for medium.',
          'The Instagram-friendly orientation of the club motto on the top of the socks will remind you we roll united!'
        ],
        sizes: SOCK_SIZES,
        price: 900
      }, {
        sku: 'HEADSET-CAP-2018',
        title: 'Headset Cap',
        slug: 'headset-cap',
        section: SECTIONS.ACCESSORIES,
        details: [
          'Laser etched headset cap',
          '1 1/8th" (32mm) diameter aluminium headset cap with the club logo, should fit all modern bikes.'
        ],
        price: 2500
      }, {
        sku: 'CLUB-BIDON-2018',
        title: 'Club Bidon',
        slug: 'club-bidon-2018',
        section: SECTIONS.ACCESSORIES,
        details: [
          'The club bidon has a <a href="http://www.velominati.com/the-rules/#52">500ml capacity</a>, features a lockable lid with a leak-proof membrane cap and is dishwasher safe.',
          'It\'s made from 20% post-industrial recycled plastics and is recyclable and biodegradable itself so once retired should not murder anything in the ocean.',
          'N.b. there is stock of this item available to buy at <a href="https://ratracecycles.com/">Rat Race Cycles</a>'
        ],
        price: 800
      },
      {
        sku: 'MUSETTE-2019',
        title: 'Musette',
        slug: 'musette',
        section: SECTIONS.ACCESSORIES,
        details: [
          'Black cotton musette with screen printed club logo.',
          'N.b. there is stock of this item available to buy at <a href="https://ratracecycles.com/">Rat Race Cycles</a>'
        ],
        price: 1000
      },
      {
        sku: 'CLUB-TSHIRT-2019',
        title: 'Club t-shirt',
        slug: 'club-tshirt-2019',
        section: SECTIONS.CASUAL,
        details: [
          'N.b. £5 pre-production discount!',
          'We are doing a run of printed shirts/hoodies hopefully in time for the Christmas party',
          'Club t-shirt printed on 100% cotton Fruit of the Loom shirt in black'
        ],
        price: 1500,
        sizes: TSHIRT_SIZES,
        genders: GENDERS
      },
      {
        sku: 'CLUB-LS-TSHIRT-2019',
        title: 'Club long sleeved t-shirt',
        slug: 'club-ls-tshirt-2019',
        section: SECTIONS.CASUAL,
        details: [
          'N.b. £5 pre-production discount!',
          'We are doing a run of printed shirts/hoodies hopefully in time for the Christmas party',
          'Club long sleeved t-shirt printed on 100% cotton Fruit of the Loom shirt in black'
        ],
        price: 2000,
        sizes: TSHIRT_SIZES,
        genders: GENDERS
      },
      {
        sku: 'CLUB-HOODIE-2019',
        title: 'Club hoodie',
        slug: 'club-hoodie-2019',
        section: SECTIONS.CASUAL,
        details: [
          'N.b. £5 pre-production discount!',
          'We are doing a run of printed shirts/hoodies hopefully in time for the Christmas party',
          'Club hoodie printed on black Fruit of the Loom hoodie'
        ],
        price: 3000,
        sizes: TSHIRT_SIZES,
        genders: GENDERS
      },
      {
        sku: 'CLUB-ZIP-HOODIE-2019',
        title: 'Club zip hoodie',
        slug: 'club-zip-hoodie-2019',
        section: SECTIONS.CASUAL,
        details: [
          'N.b. £5 pre-production discount!',
          'We are doing a run of printed shirts/hoodies hopefully in time for the Christmas party',
          'Club hoodie printed on black Fruit of the Loom hoodie with zip'
        ],
        price: 3500,
        sizes: TSHIRT_SIZES,
        genders: GENDERS
      }]
  }
}

if (process.env.NODE_ENV !== 'development') {
  config.lambda.sendPayment = 'https://2vgzz1azxk.execute-api.eu-west-2.amazonaws.com/prod/send-payment'
  config.lambda.sendContactFormEmail = 'https://2vgzz1azxk.execute-api.eu-west-2.amazonaws.com/prod/contact'
}

module.exports = {
  config,
  SECTIONS,
  JERSEY_SIZES,
  GENDERS,
  UNITS
}
