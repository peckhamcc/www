const format = require('format-duration')
const createProfile = require('./profile')

function calculatePositions (times, filterRiders, sort = (a, b) => a - b) {
  const positions = []
  const sorted = Object.keys(times)
    .filter(filterRiders)
    .sort((a, b) => {
      return sort(times[a], times[b])
    })

  sorted.forEach(id => {
    const added = positions.some(position => {
      if (position.value === times[id]) {
        position.group.push(id)
        return true
      }
    })

    if (added) {
      positions.push({
        group: []
      })
    } else {
      positions.push({
        value: times[id],
        group: [id]
      })
    }
  })

  return positions
}

function calculateStageTime (stage, riders, filterRiders) {
  const positions = calculatePositions(stage.times, filterRiders)
  const output = []

  if (!positions.length) {
    return output
  }

  let fastest = positions[0].value

  positions.forEach(({ value, group }, index) => {
    group.forEach(id => {
      const rider = riders[id]
      const position = index + 1

      if (position === 1) {
        value = format(value)
      } else if (value !== 'DNF') {
        value = `+${format(value - fastest)}`
      }

      let avatar = `'${rider.profile_medium}'`

      if (!avatar.startsWith('\'http')) {
        avatar = '{pccAvatar}'
      }

      output.push([
        position,
        `<a href='https://www.strava.com/athletes/${rider.id}'><ResultAvatar src=${avatar} /></a><ResultRiderName>${rider.firstname} ${rider.lastname}</ResultRiderName>`,
        value
      ])
    })
  })

  return output
}

module.exports = function critSeries (race, riders) {
  // Multiple stage race
  // GC for overall
  // Points for sprints
  // Mountain points for climbs
  const men = id => riders[id].sex === 'M'
  const women = id => riders[id].sex === 'F'

  const output = {
    name: race.name,
    description: race.description,
    stages: []
  }

  race.stages.forEach(stage => {
    const results = [{
      name: '⏱️ Men',
      headers: ['Position', 'Name', 'Time'],
      rows: calculateStageTime(stage, riders, men)
    }, {
      name: '⏱️ Women',
      headers: ['Position', 'Name', 'Time'],
      rows: calculateStageTime(stage, riders, women)
    }]

    output.stages.push({
      name: stage.name,
      profile: createProfile(stage),
      description: stage.description,
      results
    })
  })

  return output
}