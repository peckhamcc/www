const format = require('format-duration')
const rangeMap = require('range-map')
const createProfile = require('./profile')

const SPRINT_TYPES = {
  flat: [50, 30, 20, 18, 16, 14, 12, 10, 8, 7, 6, 5, 6, 3, 2],
  medium: [30, 25, 22, 19, 17, 15, 13, 11, 9, 7, 6, 5, 6, 3, 2],
  other: [20, 17, 15, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
}
const CLIMBING_CATEGORIES = {
  hhc: [40, 30, 24, 20, 16, 12, 8], // over 2000m
  hc: [20, 15, 12, 10, 8, 6, 4],
  '1': [10, 8, 6, 4, 32, 1],
  '2': [5, 3, 2, 1],
  '3': [2, 1],
  '4': [1]
}

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

function calculateScoredPositions (times, riders, filterRiders, scores) {
  const positions = calculatePositions(times, filterRiders)
  const output = []

  positions.forEach(({ value, group }, index) => {
    group.forEach(id => {
      const rider = riders[id]
      const score = scores[index] || '-'

      let avatar = `'${rider.profile_medium}'`

      if (!avatar.startsWith('\'http')) {
        avatar = '{pccAvatar}'
      }

      output.push([
        index + 1,
        `<a href='https://www.strava.com/athletes/${rider.id}'><ResultAvatar src=${avatar} /></a><ResultRiderName>${rider.firstname} ${rider.lastname}</ResultRiderName>`,
        format(value),
        score
      ])
    })
  })

  return output
}

function calculateTourPoints (comps, riders, filterRiders, points) {
  const scores = {}

  comps.forEach(comp =>{
    const positions = calculatePositions(comp.times, filterRiders)

    positions.forEach(({ group }, index) => {
      group.forEach(id => {
        scores[id] = (scores[id] || 0) + (points(comp)[index] || 0)
      })
    })
  })

  const positions = calculatePositions(scores, filterRiders, (a, b) => b - a)
  const output = []

  positions.forEach(({ value, group }, index) => {
    group.forEach(id => {
      const rider = riders[id]

      let avatar = `'${rider.profile_medium}'`

      if (!avatar.startsWith('\'http')) {
        avatar = '{pccAvatar}'
      }

      output.push([
        index + 1,
        `<a href='https://www.strava.com/athletes/${rider.id}'><ResultAvatar src=${avatar} /></a><ResultRiderName>${rider.firstname} ${rider.lastname}</ResultRiderName>`,
        value
      ])
    })
  })

  return output
}

function calculateGC (race, riders, filterRiders) {
  const gcRiders = {}

  for (const stage of race.stages) {
    Object.keys(stage.times)
      .filter(filterRiders)
      .sort((a, b) => {
        return stage.times[a] - stage.times[b]
      })
      .forEach(id => {
        gcRiders[id] = gcRiders[id] || {
          total: 0,
          stages: 0
        }

        if (stage.times[id] === 'DNF') {
          return
        }

        gcRiders[id].total += stage.times[id]
        gcRiders[id].stages++
      })
  }

  // print the gc riders
  const positions = Object
      .keys(gcRiders)
      // filter people who missed a stage
      .filter(id => {
        if (gcRiders[id].stages === race.stages.length) {
          return true
        }

        if (gcRiders[id].stages) {
          gcRiders[id].dnf = true
          gcRiders[id].total = Infinity

          return true
        }

        return false
      })
      // sort by total time
      .sort((a, b) => gcRiders[a].total - gcRiders[b].total)

  const output = []
  let fastest
  let lastTime

  if (positions && !positions[0].dnf) {
    fastest = gcRiders[positions[0]].total
  }

  let position = 1

  positions.forEach(id => {
    const rider = riders[id]
    const gc = gcRiders[id]

    if (lastTime && gc.total === lastTime) {
      position--
    }

    let avatar = `'${rider.profile_medium}'`

    if (!avatar.startsWith('\'http')) {
      avatar = '{pccAvatar}'
    }

    output.push([
      gc.dnf ? '-' : position,
      `<a href='https://www.strava.com/athletes/${rider.id}'><ResultAvatar src=${avatar} /></a><ResultRiderName>${rider.firstname} ${rider.lastname}</ResultRiderName>`,
      gc.dnf ? 'DNF' : position === 1 ? format(gc.total) : `+${format(gc.total - fastest)}`
    ])

    position++
    lastTime = gc.total
  })

  return output
}

function calculatePoints (race, riders, filterRiders) {
  return calculateTourPoints(
    race.stages.reduce((acc, curr) => acc.concat(curr.sprints), []),
    riders,
    filterRiders,
    (sprint) => SPRINT_TYPES[sprint.type] || SPRINT_TYPES.other
  )
}

function calculateClimbs (race, riders, filterRiders) {
  return calculateTourPoints(
    race.stages.reduce((acc, curr) => acc.concat(curr.climbs), []),
    riders,
    filterRiders,
    (climb) => CLIMBING_CATEGORIES[climb.category]
  )
}

function calculateStageTime (stage, riders, filterRiders) {
  const positions = calculatePositions(stage.times, filterRiders)
  const output = []

  if (!positions.length) {
    return output
  }

  if (positions[0].value === 'DNF') {
    positions.push(positions.shift())
  }

  let fastest = positions[0].value

  positions.forEach(({ value, group }, index) => {
    group.forEach(id => {
      const rider = riders[id]
      const position = index + 1
      let formatted = value

      if (value !== 'DNF') {
        if (position === 1) {
          formatted = format(value)
        } else {
          formatted = `+${format(value - fastest)}`
        }
      }

      let avatar = `'${rider.profile_medium}'`

      if (!avatar.startsWith('\'http')) {
        avatar = '{pccAvatar}'
      }

      output.push([
        position,
        `<a href='https://www.strava.com/athletes/${rider.id}'><ResultAvatar src=${avatar} /></a><ResultRiderName>${rider.firstname} ${rider.lastname}</ResultRiderName>`,
        formatted
      ])
    })
  })

  return output
}

function calculateStagePoints (sprint, riders, filterRiders) {
  return calculateScoredPositions(sprint.times, riders, filterRiders, SPRINT_TYPES[sprint.type] || SPRINT_TYPES.other)
}

function calculateStageClimbs (climb, riders, filterRiders) {
  return calculateScoredPositions(climb.times, riders, filterRiders, CLIMBING_CATEGORIES[climb.category])
}

module.exports = function grandTour (race, riders) {
  // Multiple stage race
  // GC for overall
  // Points for sprints
  // Mountain points for climbs
  const men = id => riders[id].sex === 'M'
  const women = id => riders[id].sex === 'F'

  const output = {
    name: race.name,
    description: race.description,
    results: [{
      name: 'General Classification (Men)',
      headers: ['Position', 'Name', 'Time'],
      rows: calculateGC(race, riders, men)
    }, {
      name: 'General Classification (Women)',
      headers: ['Position', 'Name', 'Time'],
      rows: calculateGC(race, riders, women)
    }, {
      name: 'Points (Men)',
      headers: ['Position', 'Name', 'Points'],
      rows: calculatePoints(race, riders, men)
    }, {
      name: 'Points (Women)',
      headers: ['Position', 'Name', 'Points'],
      rows: calculatePoints(race, riders, women)
    }, {
      name: 'Climbs (Men)',
      headers: ['Position', 'Name', 'Points'],
      rows: calculateClimbs(race, riders, men)
    }, {
      name: 'Climbs (Women)',
      headers: ['Position', 'Name', 'Points'],
      rows: calculateClimbs(race, riders, women)
    }],
    stages: []
  }

  race.stages.forEach(stage => {
    const results = [{
      name: '⏱️ General Classification (Men)',
      headers: ['Position', 'Name', 'Time'],
      rows: calculateStageTime(stage, riders, men)
    }, {
      name: '⏱️ General Classification (Women)',
      headers: ['Position', 'Name', 'Time'],
      rows: calculateStageTime(stage, riders, women)
    }]

    stage.sprints.forEach(sprint => {
      results.push({
        name: `⚡ "${sprint.name}" (Men)`,
        description: sprint.description,
        headers: ['Position', 'Name', 'Time', 'Points'],
        rows: calculateStagePoints(sprint, riders, men)
      })
      results.push({
        name: `⚡ "${sprint.name}" (Women)`,
        description: sprint.description,
        headers: ['Position', 'Name', 'Time', 'Points'],
        rows: calculateStagePoints(sprint, riders, women)
      })
    })

    stage.climbs.forEach(climb => {
      results.push({
        name: `⛰️ "${climb.name}" (Men)`,
        description: climb.description,
        headers: ['Position', 'Name', 'Time', 'Points'],
        rows: calculateStageClimbs(climb, riders, men)
      })
      results.push({
        name: `⛰️ "${climb.name}" (Women)`,
        description: climb.description,
        headers: ['Position', 'Name', 'Time', 'Points'],
        rows: calculateStageClimbs(climb, riders, women)
      })
    })

    output.stages.push({
      name: stage.name,
      profile: createProfile(stage),
      description: stage.description,
      results
    })
  })

  return output
}