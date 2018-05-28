
const validCcv = () => {
  return '123'
}

const validExpirationDate = () => {
  const now = new Date()
  return `${now.getMonth()}/${now.getFullYear() - 1999}`
}

const validPostCode = () => {
  return 'SE15 4YT'
}

module.exports = {
  CREDIT_CARDS: {
    SUCCESS: [{
      type: 'AMERICAN_EXPRESS',
      number: '378282246310005',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'AMERICAN_EXPRESS',
      number: '371449635398431',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'DINERS_CLUB',
      number: '36259600000004',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'DISCOVER',
      number: '6011111111111117',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'JCB',
      number: '3530111333300000',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'MAESTRO',
      number: '6304000000000000',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'MASTERCARD',
      number: '5555555555554444',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'MASTERCARD',
      number: '2223000048400011',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'VISA',
      number: '4111111111111111',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'VISA',
      number: '4005519200000004',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'VISA',
      number: '4009348888881881',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'VISA',
      number: '4012000033330026',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'VISA',
      number: '4012000077777777',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'VISA',
      number: '4012888888881881',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'VISA',
      number: '4217651111111119',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }, {
      type: 'VISA',
      number: '4500600000000061',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode()
    }],
    FAILURE: [{
      type: 'VISA',
      number: '4000111111111115',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode(),
      response: 'processor declined'
    }, {
      type: 'MASTERCARD',
      number: '5105105105105100',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode(),
      response: 'processor declined'
    }, {
      type: 'AMERICAN_EXPRESS',
      number: '378734493671000',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode(),
      response: 'processor declined'
    }, {
      type: 'DISCOVER',
      number: '6011000990139424',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode(),
      response: 'processor declined'
    }, {
      type: 'DINERS_CLUB',
      number: '38520000009814',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode(),
      response: 'processor declined'
    }, {
      type: 'JCB',
      number: '3566002020360505',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode(),
      response: 'failed (3000)'
    }],
    INTERNATIONAL: [{
      number: '4012000033330620',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode(),
      country: 'USA'
    }, {
      number: '4012000033330729',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode(),
      country: 'CAN'
    }, {
      number: '4012000033330521',
      ccv: validCcv(),
      expiry: validExpirationDate(),
      postCode: validPostCode(),
      country: 'NETWORK_ONLY'
    }]
  },
  TYPES: [{
    type: 'PREPAID',
    number: '4500600000000061',
    ccv: validCcv(),
    expiry: validExpirationDate(),
    postCode: validPostCode()
  }, {
    type: 'COMMERCIAL',
    number: '4009040000000009',
    ccv: validCcv(),
    expiry: validExpirationDate(),
    postCode: validPostCode()
  }, {
    type: 'DURBIN_REGULATED',
    number: '4005519200000004',
    ccv: validCcv(),
    expiry: validExpirationDate(),
    postCode: validPostCode()
  }, {
    type: 'HEALTHCARE',
    number: '4012000033330026',
    ccv: validCcv(),
    expiry: validExpirationDate(),
    postCode: validPostCode()
  }, {
    type: 'DEBIT',
    number: '4012000033330125',
    ccv: validCcv(),
    expiry: validExpirationDate(),
    postCode: validPostCode()
  }, {
    type: 'PAYROLL',
    number: '4012000033330224',
    ccv: validCcv(),
    expiry: validExpirationDate(),
    postCode: validPostCode()
  }, {
    type: 'NONE',
    number: '4012000033330422',
    ccv: validCcv(),
    expiry: validExpirationDate(),
    postCode: validPostCode()
  }, {
    type: 'UNKNOWN',
    number: '4012000033330323',
    ccv: validCcv(),
    expiry: validExpirationDate(),
    postCode: validPostCode()
  }],
  DISPUTES: {
    number: '4023898493988028',
    ccv: validCcv(),
    expiry: validExpirationDate(),
    postCode: validPostCode(),
    AMOUNTS: [{
      amount: '8300',
      code: 83,
      description: 'VISA_FRAUD'
    }, {
      amount: '1040',
      code: 1040,
      description: 'VISA_FRAUD'
    }, {
      amount: '1310',
      code: 1310,
      description: 'VISA_FRAUD'
    }, {
      amount: '7030',
      code: 7030,
      description: 'DISCOVER_FRAUD'
    }]
  }
}
