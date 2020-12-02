const {
  getNextRidingDays,
  generateRides
} = require('./lib')
const {
  getAllPreferences,
  setRides
} = require('./db')
const {
  sendEmail
} = require('./email')
const { config } = require('./config')

async function generateRidesHandler () {
  const ridingDays = getNextRidingDays()
  const riderPrefs = await getAllPreferences()

  const rides = generateRides(ridingDays, riderPrefs)

  for (let i = 0; i < ridingDays.length; i++) {
    const date = ridingDays[i]

    if (rides[date]) {
      await setRides(date, rides[date])
    }
  }

  await sendEmail(config.email.to, config.email.from, 'PCC Ride Roulette Weekend Rides', htmlTemplate(rides), textTemplate(rides))

  return rides
}

const htmlTemplate = (rides) => `
<html>
  <head>
    <style type="text/css">

div {
  max-width: 800px;
  padding: 20px;
}

    </style>
  </head>
  <body>
    <p>Rides for this weekend:</p>
    ${
      Object.keys(rides).map(date => {
        let output = `
    <h1>${date}</h1>`

        output += rides[date].map(ride => (`
    <p>
      Name: ${ride.name}<br/>
      Type: ${ride.type}<br/>
      Distance: ${ride.distance}<br/>
      Speed: ${ride.speed}<br/>
      Riders:<br/>${
        ride.riders.map(rider => (`
        ${rider.name} ${rider.email} ${rider.hasRoute ? '- has route' : ''}`
        )).join('<br/>')
      }
    </p>`)).join('')

        return output
      })
    }
  </body>
</html>
`

const textTemplate = (rides) => `
Rides for this weekend:

${
  Object.keys(rides).map(date => {
    let output = `
${date}`

    output += rides[date].map(ride => (`

Name: ${ride.name}
Type: ${ride.type}
Distance: ${ride.distance}
Speed: ${ride.speed}
Riders: ${ride.riders.map(rider => (`
  ${rider.name} ${rider.email} ${rider.hasRoute ? '- has route' : ''}
`))}`)).join('')

    return output
  })
}`

module.exports = {
  handler: generateRidesHandler
}
