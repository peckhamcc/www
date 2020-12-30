
const OPTIONS = {
  gender: {
    M: 'Male',
    F: 'Female'
  },
  pockets: {
    N: 'No pockets',
    Y: 'With pockets'
  },
  sleeves: {
    S: 'Short sleeves',
    L: 'Long sleeves'
  },
  size: {
    'arm-warmers': {
      S: {
        name: 'Small',
        measurements: {
          bicep: {
            unisex: {
              min: 25,
              max: 30
            }
          }
        }
      },
      M: {
        name: 'Medium',
        measurements: {
          bicep: {
            unisex: {
              min: 30,
              max: 35
            }
          }
        }
      },
      L: {
        name: 'Large',
        measurements: {
          bicep: {
            unisex: {
              min: 35,
              max: 40
            }
          }
        }
      }
    },

    jerseys: {
      XXS: {
        name: 'Extra extra small',
        measurements: {
          chest: {
            male: {
              min: 85,
              max: 88
            },
            female: {
              min: 82,
              max: 85
            }
          },
          waist: {
            male: {
              min: 73,
              max: 76
            },
            female: {
              min: 66,
              max: 69
            }
          }
        }
      },
      XS: {
        name: 'Extra small',
        measurements: {
          chest: {
            male: {
              min: 88,
              max: 92
            },
            female: {
              min: 85,
              max: 88
            }
          },
          waist: {
            male: {
              min: 76,
              max: 80
            },
            female: {
              min: 69,
              max: 72
            }
          }
        }
      },
      S: {
        name: 'Small',
        measurements: {
          chest: {
            male: {
              min: 92,
              max: 96
            },
            female: {
              min: 88,
              max: 92
            }
          },
          waist: {
            male: {
              min: 80,
              max: 84
            },
            female: {
              min: 72,
              max: 76
            }
          }
        }
      },
      M: {
        name: 'Medium',
        measurements: {
          chest: {
            male: {
              min: 96,
              max: 100
            },
            female: {
              min: 92,
              max: 96
            }
          },
          waist: {
            male: {
              min: 84,
              max: 88
            },
            female: {
              min: 76,
              max: 80
            }
          }
        }
      },
      L: {
        name: 'Large',
        measurements: {
          chest: {
            male: {
              min: 100,
              max: 104
            },
            female: {
              min: 96,
              max: 100
            }
          },
          waist: {
            male: {
              min: 88,
              max: 92
            },
            female: {
              min: 80,
              max: 84
            }
          }
        }
      },
      XL: {
        name: 'Extra large',
        measurements: {
          chest: {
            male: {
              min: 104,
              max: 110
            },
            female: {
              min: 100,
              max: 106
            }
          },
          waist: {
            male: {
              min: 92,
              max: 98
            },
            female: {
              min: 84,
              max: 90
            }
          }
        }
      },
      '2XL': {
        name: 'XX Large',
        measurements: {
          chest: {
            male: {
              min: 110,
              max: 116
            },
            female: {
              min: 106,
              max: 114
            }
          },
          waist: {
            male: {
              min: 98,
              max: 104
            },
            female: {
              min: 90,
              max: 98
            }
          }
        }
      },
      '3XL': {
        name: 'XXX Large',
        measurements: {
          chest: {
            male: {
              min: 116,
              max: 122
            },
            female: {
              min: 114,
              max: 122
            }
          },
          waist: {
            male: {
              min: 104,
              max: 110
            },
            female: {
              min: 98,
              max: 116
            }
          }
        }
      }
    },

    socks: {
      'S/M': {
        name: 'Small/Medium',
        measurements: {
          shoe: {
            unisex: 'UK 3-6'
          }
        }
      },
      'L/XL': {
        name: 'Large/Extra Large',
        measurements: {
          shoe: {
            unisex: 'UK 7-11+'
          }
        }
      }
    },

    gloves: {
      XS: {
        name: 'Extra small',
        measurements: {
          palm: {
            unisex: {
              metric: '7cm',
              imperial: '2.7"'
            }
          }
        }
      },
      S: {
        name: 'Small',
        measurements: {
          palm: {
            unisex: {
              metric: '8cm',
              imperial: '3.1"'
            }
          }
        }
      },
      M: {
        name: 'Medium',
        measurements: {
          palm: {
            unisex: {
              metric: '9cm',
              imperial: '3.5"'
            }
          }
        }
      },
      L: {
        name: 'Large',
        measurements: {
          palm: {
            unisex: {
              metric: '10cm',
              imperial: '3.9"'
            }
          }
        }
      },
      XL: {
        name: 'Extra large',
        measurements: {
          palm: {
            unisex: {
              metric: '11cm',
              imperial: '4.3"'
            }
          }
        }
      },
      XXL: {
        name: 'XX Large',
        measurements: {
          palm: {
            unisex: {
              metric: '12cm',
              imperial: '5.1"'
            }
          }
        }
      }
    },

    't-shirts': {
      S: {
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
      },
      M: {
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
      },
      L: {
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
      },
      XL: {
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
      },
      XXL: {
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
      }
    }
  }
}

const config = {
  aws: {
    ses: {
      region: 'eu-west-1',
      version: '2010-12-01'
    },
    dynamodb: {
      region: 'eu-west-2'
    },
    lambda: {
      region: 'eu-west-2'
    }
  },
  lambda: {
    sendPayment: '/lambda/send-payment',
    sendContactFormEmail: '/lambda/send-contact-form-email',
    rideRoulettePreferencesSet: '/lambda/ride-roulette-preferences-set',
    rideRouletteRidesGet: '/lambda/ride-roulette-rides-get',
    accountTokenGenerate: '/lambda/account-token-create',
    accountUserGet: '/lambda/account-user-get',
    accountUserUpdate: '/lambda/account-user-update',
    shopProductsGet: '/lambda/shop-products-get',
    shopOrdersCreate: '/lambda/shop-orders-create',
    shopOrdersGet: '/lambda/shop-orders-get',
    fopccJoin: '/lambda/fopcc-join',
    fopccLeave: '/lambda/fopcc-leave'
  },
  flags: {
    shop: true,
    email: true,
    payments: true
  },
  email: {
    to: 'peckhamcc@gmail.com',
    from: 'peckhamcc@gmail.com'
  },
  square: {
    environment: 'sandbox',
    accessToken: 'EAAAEDclhYJquUZNfyBK8G6x1acrazt7EzUNRf5AHAIOJGeOxe1_WFB26ZTW3-DP',
    applicationId: 'sandbox-sq0idb-J3q1SN1H7--5mkRr16_yPg',
    locationId: 'LR4HXJWWC8747'
  },
  stripe: {
    publishableKey: 'pk_test_rmrtd0D68Bhyua67OuSctFir',
    secretKey: 'sk_test_DhQgzX3EJlaiDQPhbsju94dc',
    checkoutSuccess: 'http://localhost:9000/checkout/success',
    checkoutCancel: 'http://localhost:9000/basket',
    webhookSecret: 'whsec_3KbRZmxQdQtJrkE6H929x8de2Vg6trY2',
    fopccSuccess: 'http://localhost:9000/profile/fopcc',
    fopccCancel: 'http://localhost:9000/profile/fopcc',
    fopccId: 'price_1I2XUx2cnIK2AWWQ8Y5xgq4I'
  }
}

if (process.env.NODE_ENV !== 'development') {
  config.lambda.sendPayment = 'https://api.peckham.cc/send-payment'
  config.lambda.sendContactFormEmail = 'https://api.peckham.cc/contact'
  config.lambda.rideRoulettePreferencesSet = 'https://api.peckham.cc/ride-roulette/preferences'
  config.lambda.rideRouletteRidesGet = 'https://api.peckham.cc/ride-roulette/rides'
  config.lambda.accountTokenGenerate = 'https://api.peckham.cc/token'
  config.lambda.accountUserGet = 'https://api.peckham.cc/user'
  config.lambda.accountUserUpdate = 'https://api.peckham.cc/user'
  config.lambda.shopProductsGet = 'https://api.peckham.cc/shop/products'
  config.lambda.shopOrdersCreate = 'https://api.peckham.cc/user/orders'
  config.lambda.shopOrdersGet = 'https://api.peckham.cc/user/orders'
  config.lambda.fopccJoin = 'https://api.peckham.cc/fopcc'
  config.lambda.fopccLeave = 'https://api.peckham.cc/fopcc'

  config.stripe.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY
  config.stripe.secretKey = process.env.STRIPE_SECRET_KEY
  config.stripe.checkoutSuccess = 'https://peckham.cc/checkout/success'
  config.stripe.checkoutCancel = 'https://peckham.cc/basket'
  config.stripe.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  config.stripe.fopccSuccess = 'https://peckham.cc/profile/fopcc'
  config.stripe.fopccCancel = 'https://peckham.cc/profile/fopcc'
  config.stripe.fopccId = process.env.STRIPE_FOPCC_ID
}

module.exports = {
  config,
  OPTIONS
}
