
var stripe = require("stripe")(process.env.STRIPE_KEY)

exports.handler = (event, context, callback) => {  
  stripe.charges.create({
    amount: event.amount,
    currency: event.currency,
    description: event.description,
    source: event.token,
  }, callback)
}
