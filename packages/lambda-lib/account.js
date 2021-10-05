const { nanoid } = require('nanoid')
const httpErrors = require('http-errors')
const {
  getOne,
  updateOne,
  removeOne,
  putOne
} = require('./db')

const FIFTEEN_MINUTES = (15 * 60) * 1000
const ONE_HOUR = FIFTEEN_MINUTES * 4
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

const REDIRECT_URLS = {
  '/profile': true,
  '/shop': true,
  '/ride-roulette': true,
  '/checkout': true,
  '/admin': true,
  '/admin/members': true,
  '/admin/kit': true,
  '/admin/rrc': true
}

function loginTokenExpiry () {
  return Math.round(new Date(Date.now() + FIFTEEN_MINUTES).getTime() / 1000)
}

function fullTokenExpiry () {
  return Math.round(new Date(Date.now() + ONE_WEEK).getTime() / 1000)
}

async function extendToken (token) {
  await updateOne(process.env.AWS_TOKENS_DB_TABLE, {
    token
  }, {
    UpdateExpression: 'set expires = :e',
    ExpressionAttributeValues: {
      ':e': fullTokenExpiry()
    },
    ReturnValues: 'UPDATED_NEW'
  })
}

async function generateLogInLink (email, redirect) {
  if (!REDIRECT_URLS[redirect]) {
    throw httpErrors.BadRequest('Invalid redirect')
  }

  // use AWS_USER_LOOKUP_DB_TABLE to turn email into id, maybe creating a new user
  const userLookup = await getOne(process.env.AWS_USER_LOOKUP_DB_TABLE, {
    email
  })

  let id

  if (userLookup) {
    id = userLookup.id
  } else {
    id = nanoid()

    // no user for that email, create a new user
    await updateOne(process.env.AWS_USERS_DB_TABLE, {
      id
    }, {
      UpdateExpression: 'set #e = :e',
      ExpressionAttributeNames: {
        '#e': 'email'
      },
      ExpressionAttributeValues: {
        ':e': email
      },
      ReturnValues: 'UPDATED_NEW'
    })

    // create lookup for next time
    await updateOne(process.env.AWS_USER_LOOKUP_DB_TABLE, {
      email
    }, {
      UpdateExpression: 'set #i = :i',
      ExpressionAttributeNames: {
        '#i': 'id'
      },
      ExpressionAttributeValues: {
        ':i': id
      },
      ReturnValues: 'UPDATED_NEW'
    })
  }

  const token = nanoid()

  await putOne(
    process.env.AWS_TOKENS_DB_TABLE, {
      token: `${token}`,
      user: `${id}`,
      type: 'login',
      // ttl is enabled on the DynamoDB table for the 'expires' field
      expires: loginTokenExpiry()
    }
  )

  return `https://peckham.cc${redirect}#token=${token}`
}

async function getUserIdForToken (token) {
  const existingToken = await getOne(process.env.AWS_TOKENS_DB_TABLE, {
    token
  })

  if (!existingToken) {
    console.info('Nothing in token table for', token)
    throw new httpErrors.Unauthorized('Missing or invalid credentials')
  }

  if (existingToken.type !== 'full') {
    console.info('Token', token, 'was', existingToken.type, 'token')
    throw new httpErrors.Unauthorized('Missing or invalid credentials')
  }

  // extend token TTL
  await extendToken(token)

  // return user id from token
  return existingToken.user
}

async function getUser (id) {
  return getOne(process.env.AWS_USERS_DB_TABLE, {
    id
  })
}

async function updateUser (id, details) {
  const user = await getUser(id)

  const fields = [
    'name',
    'phone',
    'email',
    'gender',
    'size',
    'stripeCustomerId',
    'fopcc',
    'lastLogin'
  ]

  const expression = []
  const attributeNames = {}
  const attributeValues = {}

  fields.forEach(field => {
    const shortName = field.substring(0, 2).toLowerCase()

    if (details[field] != null) {
      expression.push(`#${shortName} = :${shortName}`)
      attributeNames[`#${shortName}`] = field
      attributeValues[`:${shortName}`] = details[field]
    }
  })

  if (!expression.length) {
    // nothing to update here
    return
  }

  await updateOne(process.env.AWS_USERS_DB_TABLE, {
    id
  }, {
    UpdateExpression: `SET ${expression.join(', ')}`,
    ExpressionAttributeNames: attributeNames,
    ExpressionAttributeValues: attributeValues,
    ReturnValues: 'UPDATED_NEW'
  })

  if (details.email && user.email !== details.email) {
    // email changed, update the user lookup table
    await updateOne(process.env.AWS_USER_LOOKUP_DB_TABLE, {
      email: details.email
    }, {
      UpdateExpression: 'set #i = :i',
      ExpressionAttributeNames: {
        '#i': 'id'
      },
      ExpressionAttributeValues: {
        ':i': id
      },
      ReturnValues: 'UPDATED_NEW'
    })

    // remove old lookup
    await removeOne(process.env.AWS_USER_LOOKUP_DB_TABLE, {
      email: user.email
    })
  }

  if (details.stripeCustomerId && user.stripeCustomerId !== details.stripeCustomerId) {
    // add a stripe customer to user id lookup
    await updateOne(process.env.AWS_STRIPE_CUSTOMER_LOOKUP_DB_TABLE, {
      customerId: details.stripeCustomerId
    }, {
      UpdateExpression: 'set #i = :i',
      ExpressionAttributeNames: {
        '#i': 'id'
      },
      ExpressionAttributeValues: {
        ':i': id
      },
      ReturnValues: 'UPDATED_NEW'
    })
  }
}

async function getUserIdForCustomerId (customerId) {
  const userLookup = await getOne(process.env.AWS_STRIPE_CUSTOMER_LOOKUP_DB_TABLE, {
    customerId
  })

  return userLookup && userLookup.id
}

async function invalidateToken (token) {
  // remove old token
  await removeOne(process.env.AWS_TOKENS_DB_TABLE, {
    token
  })
}

async function exchangeToken (token) {
  const existingToken = await getOne(process.env.AWS_TOKENS_DB_TABLE, {
    token
  })

  if (!existingToken) {
    console.info('No token for', token)
    throw new httpErrors.Unauthorized('Missing or invalid credentials')
  }

  if (existingToken.type !== 'login') {
    console.info('Token', token, 'was', existingToken.type, 'token')
    throw new httpErrors.Unauthorized('Missing or invalid credentials')
  }

  // expire the old token
  await invalidateToken(token)

  token = nanoid()

  await putOne(process.env.AWS_TOKENS_DB_TABLE, {
    token: `${token}`,
    user: `${existingToken.user}`,
    type: 'full',
    // ttl is enabled on the DynamoDB table for the 'expires' field
    expires: fullTokenExpiry()
  })

  // update user login time
  await updateUser(`${existingToken.user}`, {
    lastLogin: Date.now()
  })

  return token
}

module.exports = {
  generateLogInLink,
  getUserIdForToken,
  updateUser,
  getUser,
  getUserIdForCustomerId,
  exchangeToken,
  invalidateToken
}
