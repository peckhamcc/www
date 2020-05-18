const strava = require('./lib/strava')
const users = require('./lib/users')
const log = require('debug')('race')
const findActivity = require('./lib/find-activity')
const addStageMetadata = require('./lib/add-stage-metadata')
const findFastestSegmentTime = require('./lib/find-fastest-segment-time')

const race = require(process.argv[2])
const processor = require(`./lib/style/${race.style}`)
const formatter = require('./lib/style/formatter')
const riders = {}

async function main () {
  for await (const user of users.load()) {
    const api = strava({
      athleteId: user.id,
      accessToken: user.access_token,
      refreshToken: user.refresh_token
    })

    const athlete = await api.get('/athlete')

    riders[athlete.id] = athlete

    console.error('Processing', athlete.firstname, athlete.lastname)

    for (const stage of race.stages) {
      stage.activities = stage.activities || {}
      stage.times = stage.times || {}
      stage.sprints = stage.sprints || []
      stage.climbs = stage.climbs || []

      // find the activity in their stream
      const activity = await findActivity(stage, api)

      // did not race
      if (!activity) {
        continue
      }

      if (activity === 'DNF') {
        stage.times[athlete.id] = 'DNF'
        continue
      }

      if (!stage.elevation) {
        await addStageMetadata(activity, stage, api)
      }

      stage.sprints.forEach(sprint => {
        sprint.times = sprint.times || {}
        sprint.times[athlete.id] = findFastestSegmentTime(activity, sprint.name)
      })

      stage.climbs.forEach(climb => {
        climb.times = climb.times || {}
        climb.times[athlete.id] = findFastestSegmentTime(activity, climb.name)
      })

      stage.times[athlete.id] = activity.stage_time
      stage.activities[athlete.id] = activity
    }
  }

  console.info(formatter(processor(race, riders)))
}

main()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
