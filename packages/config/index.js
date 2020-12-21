
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
    accountTokenGenerate: '/lambda/account-token-generate',
    accountUserGet: '/lambda/account-user-get',
    accountUserUpdate: '/lambda/account-user-update',
    shopProductsGet: '/lambda/shop-products-get',
    shopPaymentsCreate: '/lambda/shop-payments-create',
    shopOrdersCreate: '/lambda/shop-orders-create',
    shopOrdersGet: '/lambda/shop-orders-get'
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
  }
}

if (process.env.NODE_ENV !== 'development') {
  config.lambda.sendPayment = 'https://api.peckham.cc/send-payment'
  config.lambda.sendContactFormEmail = 'https://api.peckham.cc/contact'
  config.lambda.rideRoulettePreferencesSet = 'https://api.peckham.cc/ride-roulette/preferences'
  config.lambda.rideRouletteRidesGet = 'https://api.peckham.cc/ride-roulette/rides'
  config.lambda.accountTokenGenerate = 'https://api.peckham.cc/account/token'
  config.lambda.accountUserGet = 'https://api.peckham.cc/account/user'
  config.lambda.accountUserUpdate = 'https://api.peckham.cc/account/user'
  config.lambda.shopProductsGet = 'https://api.peckham.cc/shop/products'
  config.lambda.shopOrdersCreate = 'https://api.peckham.cc/shop/orders'
  config.lambda.shopOrdersGet = 'https://api.peckham.cc/shop/orders'
  config.lambda.shopPaymentsCreate = 'https://api.peckham.cc/shop/payments'

  config.square.environment = process.env.SQUARE_ENV
  config.square.accessToken = process.env.SQUARE_ACCESS_TOKEN
  config.square.applicationId = process.env.SQUARE_APPLICATION_ID
  config.square.locationId = process.env.SQUARE_LOCATION_ID
}

module.exports = {
  config
}
