const AWS = require('aws-sdk')
const { config } = require('./config')
const { nanoid } = require('nanoid')
const httpErrors = require('http-errors')

AWS.config.update({
  region: config.aws.dynamodb.region
})

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
  const client = new AWS.DynamoDB.DocumentClient()

  if (!process.env.AWS_TOKENS_DB_TABLE) {
    throw new Error('No AWS_TOKENS_DB_TABLE var found in environment')
  }

  await client.update({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Key: {
      token
    },
    UpdateExpression: 'set expires = :e',
    ExpressionAttributeValues: {
      ':e': fullTokenExpiry()
    },
    ReturnValues: 'UPDATED_NEW'
  }).promise()
}

async function generateLogInLink (email, redirect) {
  if (!REDIRECT_URLS[redirect]) {
    throw httpErrors.BadRequest('Invalid redirect')
  }

  const client = new AWS.DynamoDB.DocumentClient()

  if (!process.env.AWS_USER_LOOKUP_DB_TABLE) {
    throw new Error('No AWS_USER_LOOKUP_DB_TABLE var found in environment')
  }

  // use AWS_USER_LOOKUP_DB_TABLE to turn email into id, maybe creating a new user
  const userLookup = await client.get({
    TableName: process.env.AWS_USER_LOOKUP_DB_TABLE,
    Key: {
      email
    }
  }).promise()

  let id

  if (userLookup.Item) {
    id = userLookup.Item.id
  } else {
    id = nanoid()

    if (!process.env.AWS_USERS_DB_TABLE) {
      throw new Error('No AWS_USERS_DB_TABLE var found in environment')
    }

    // no user for that email, create a new user
    await client.update({
      TableName: process.env.AWS_USERS_DB_TABLE,
      Key: {
        id
      },
      UpdateExpression: 'set #e = :e',
      ExpressionAttributeNames: {
        '#e': 'email'
      },
      ExpressionAttributeValues: {
        ':e': email
      },
      ReturnValues: 'UPDATED_NEW'
    }).promise()

    if (!process.env.AWS_USER_LOOKUP_DB_TABLE) {
      throw new Error('No AWS_USER_LOOKUP_DB_TABLE var found in environment')
    }

    // create lookup for next time
    await client.update({
      TableName: process.env.AWS_USER_LOOKUP_DB_TABLE,
      Key: {
        email
      },
      UpdateExpression: 'set #i = :i',
      ExpressionAttributeNames: {
        '#i': 'id'
      },
      ExpressionAttributeValues: {
        ':i': id
      },
      ReturnValues: 'UPDATED_NEW'
    }).promise()
  }

  const token = nanoid()

  if (!process.env.AWS_TOKENS_DB_TABLE) {
    throw new Error('No AWS_TOKENS_DB_TABLE var found in environment')
  }

  await client.put({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Item: {
      token: `${token}`,
      user: `${id}`,
      type: 'login',
      // ttl is enabled on the DynamoDB table for the 'expires' field
      expires: loginTokenExpiry()
    }
  })
    .promise()

  return `https://peckham.cc${redirect}#token=${token}`
}

async function getUserIdForToken (token) {
  const client = new AWS.DynamoDB.DocumentClient()

  if (!process.env.AWS_TOKENS_DB_TABLE) {
    throw new Error('No AWS_TOKENS_DB_TABLE var found in environment')
  }

  const existingToken = await client.get({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Key: {
      token
    }
  }).promise()

  if (!existingToken || !existingToken.Item) {
    console.info('Nothing in token table for', token)
    throw new httpErrors.Unauthorized('Missing or invalid credentials')
  }

  if (existingToken.Item.type !== 'full') {
    console.info('Token', token, 'was', existingToken.Item.type, 'token')
    throw new httpErrors.Unauthorized('Missing or invalid credentials')
  }

  // extend token TTL
  await extendToken(token)

  // return user id from token
  return existingToken.Item.user
}

async function getUser (id) {
  const client = new AWS.DynamoDB.DocumentClient()

  if (!process.env.AWS_USERS_DB_TABLE) {
    throw new Error('No AWS_USERS_DB_TABLE var found in environment')
  }

  const result = await client.get({
    TableName: process.env.AWS_USERS_DB_TABLE,
    Key: {
      id
    }
  }).promise()

  return result.Item
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

  const client = new AWS.DynamoDB.DocumentClient()

  if (!process.env.AWS_USERS_DB_TABLE) {
    throw new Error('No AWS_USERS_DB_TABLE var found in environment')
  }

  await client.update({
    TableName: process.env.AWS_USERS_DB_TABLE,
    Key: {
      id
    },
    UpdateExpression: `SET ${expression.join(', ')}`,
    ExpressionAttributeNames: attributeNames,
    ExpressionAttributeValues: attributeValues,
    ReturnValues: 'UPDATED_NEW'
  }).promise()

  if (details.email && user.email !== details.email) {
    if (!process.env.AWS_USER_LOOKUP_DB_TABLE) {
      throw new Error('No AWS_USER_LOOKUP_DB_TABLE var found in environment')
    }

    // email changed, update the user lookup table
    await client.update({
      TableName: process.env.AWS_USER_LOOKUP_DB_TABLE,
      Key: {
        email: details.email
      },
      UpdateExpression: 'set #i = :i',
      ExpressionAttributeNames: {
        '#i': 'id'
      },
      ExpressionAttributeValues: {
        ':i': id
      },
      ReturnValues: 'UPDATED_NEW'
    }).promise()

    // remove old lookup
    await client.delete({
      TableName: process.env.AWS_USER_LOOKUP_DB_TABLE,
      Key: {
        email: user.email
      }
    }).promise()
  }

  if (details.stripeCustomerId && user.stripeCustomerId !== details.stripeCustomerId) {
    if (!process.env.AWS_STRIPE_CUSTOMER_LOOKUP_DB_TABLE) {
      throw new Error('No AWS_STRIPE_CUSTOMER_LOOKUP_DB_TABLE var found in environment')
    }

    // add a stripe customer to user id lookup
    await client.update({
      TableName: process.env.AWS_STRIPE_CUSTOMER_LOOKUP_DB_TABLE,
      Key: {
        customerId: details.stripeCustomerId
      },
      UpdateExpression: 'set #i = :i',
      ExpressionAttributeNames: {
        '#i': 'id'
      },
      ExpressionAttributeValues: {
        ':i': id
      },
      ReturnValues: 'UPDATED_NEW'
    }).promise()
  }
}

async function getUserIdForCustomerId (customerId) {
  if (!process.env.AWS_STRIPE_CUSTOMER_LOOKUP_DB_TABLE) {
    throw new Error('No AWS_STRIPE_CUSTOMER_LOOKUP_DB_TABLE var found in environment')
  }

  const client = new AWS.DynamoDB.DocumentClient()

  const userLookup = await client.get({
    TableName: process.env.AWS_STRIPE_CUSTOMER_LOOKUP_DB_TABLE,
    Key: {
      customerId
    }
  }).promise()

  return userLookup.Item && userLookup.Item.id
}

async function invalidateToken (token) {
  if (!process.env.AWS_TOKENS_DB_TABLE) {
    throw new Error('No AWS_TOKENS_DB_TABLE var found in environment')
  }

  const client = new AWS.DynamoDB.DocumentClient()

  // remove old token
  await client.delete({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Key: {
      token
    }
  }).promise()
}

async function exchangeToken (token) {
  if (!process.env.AWS_TOKENS_DB_TABLE) {
    throw new Error('No AWS_TOKENS_DB_TABLE var found in environment')
  }

  const client = new AWS.DynamoDB.DocumentClient()

  const existingToken = await client.get({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Key: {
      token
    }
  }).promise()

  if (!existingToken.Item) {
    console.info('No token for', token)
    throw new httpErrors.Unauthorized('Missing or invalid credentials')
  }

  if (existingToken.Item.type !== 'login') {
    console.info('Token', token, 'was', existingToken.Item.type, 'token')
    throw new httpErrors.Unauthorized('Missing or invalid credentials')
  }

  // expire the old token
  await invalidateToken(token)

  token = nanoid()

  if (!process.env.AWS_TOKENS_DB_TABLE) {
    throw new Error('No AWS_TOKENS_DB_TABLE var found in environment')
  }

  await client.put({
    TableName: process.env.AWS_TOKENS_DB_TABLE,
    Item: {
      token: `${token}`,
      user: `${existingToken.Item.user}`,
      type: 'full',
      // ttl is enabled on the DynamoDB table for the 'expires' field
      expires: fullTokenExpiry()
    }
  })
    .promise()

  // update user login time
  await updateUser(`${existingToken.Item.user}`, {
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
