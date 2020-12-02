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
const {
  generateLogInLink
} = require('./token')
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

  await sendEmail(config.email.to, config.email.from, 'PCC Ride Roulette Weekend Rides', pccHtmlTemplate(rides), pccTextTemplate(rides))

  for (let i = 0; i < ridingDays.length; i++) {
    const date = ridingDays[i]

    if (rides[date]) {
      for (let j = 0; j < rides[date].length; j++) {
        const ride = rides[date][j]

        await Promise.all(
          ride.riders.map(async rider => {
            const link = await generateLogInLink(rider.email)

            return sendEmail(rider.email, config.email.from, 'PCC Ride Roulette Weekend Rides', riderHtmlTemplate(link), riderTextTemplate(link))
          })
        )
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(rides, null, 2)
  }
}

const pccHtmlTemplate = (rides) => `
<html>
  <head>
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
        .join('')
    }
  </body>
</html>
`

const pccTextTemplate = (rides) => `
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
    .join('')
}`

const riderHtmlTemplate = (link) => `
<html>
  <head>
  </head>
  <body>
    <p>The PCC Ride Roulette wheel has spun and you've been matched up with ride buddies for the weekend!</p>
    <p>Log in to Ride Roulette to see the results: <a href="${link}">${link}</a><p>
  </body>
</html>
`

const riderTextTemplate = (link) => `
The PCC Ride Roulette wheel has spun and you've been matched up with ride buddies for the weekend!

Log in to Ride Roulette to see the results: ${link}
`

module.exports = {
  handler: generateRidesHandler
}
