const rangeMap = require('range-map')

module.exports = function createProfile (stage) {
  let minAltitude = Infinity
  let maxAltitude = -Infinity
  let maxDistance

  if (!stage.elevation) {
    console.error('stage', stage.name, 'had no elevation data')
    return ''
  }

  stage.elevation.forEach(({ altitude, distance }) => {
    maxDistance = distance

    if (altitude > maxAltitude) {
      maxAltitude = altitude
    }

    if (altitude < minAltitude) {
      minAltitude = altitude
    }
  })

  if (maxAltitude < 350) {
    maxAltitude = 350
  }

  const datapoints = 100
  const chunks = Math.round(stage.elevation.length / datapoints)
  const elevation = chunks === 0 ? stage.elevation : []

  if (chunks > 0) {
    for (let i = 0; i < stage.elevation.length; i += chunks) {
      let altitude = 0
      let distance = 0

      for (let k = 0; k < chunks; k++) {
        if (!stage.elevation[i + k]) {
          break
        }

        altitude += stage.elevation[i + k].altitude
        distance += stage.elevation[i + k].distance
      }

      elevation.push({
        altitude: Math.round(altitude / chunks),
        distance: Math.round(distance / chunks)
      })
    }
  }

  elevation[elevation.length - 1].distance = maxDistance

  const margin = 5
  const minX = 0
  const minY = 0
  const maxX = 1000
  const maxY = 100
  const points = elevation.map(({ altitude, distance }) => `${rangeMap(distance, 0, maxDistance, minX + margin, maxX - margin)},${rangeMap(altitude, minAltitude, maxAltitude, maxY - margin, minY + margin)}`).join(' ')

  const sprintBlocks = []
  const climbBlocks = []

  stage.sprints.forEach(sprint => {
    sprint.segments.forEach(segment => {
      if (segment.start_index > stage.elevation.length || segment.end_index > stage.elevation.length) {
        return
      }

      sprintBlocks.push({
        start: stage.elevation[segment.start_index].distance,
        end: stage.elevation[segment.end_index].distance
      })
    })
  })

  stage.climbs.forEach(climb => {
    climb.segments.forEach(segment => {
      if (segment.start_index > stage.elevation.length || segment.end_index > stage.elevation.length) {
        return
      }

      climbBlocks.push({
        start: stage.elevation[segment.start_index].distance,
        end: stage.elevation[segment.end_index].distance
      })
    })
  })

  return `
<svg viewBox='0 0 ${maxX} ${maxY}' xmlns='http://www.w3.org/2000/svg'>
  ${
    sprintBlocks.map(({ start, end }) => {
      const x1 = rangeMap(start, 0, maxDistance, minX + margin, maxX - margin)
      const x2 = rangeMap(end, 0, maxDistance, minX + margin, maxX - margin)

      return `<polygon points='${x1},0 ${x2},0 ${x2},100 ${x1},100' fill='#29942a' />`
    }).join('\n  ')
  }
  ${
    climbBlocks.map(({ start, end }) => {
      const x1 = rangeMap(start, 0, maxDistance, minX + margin, maxX - margin)
      const x2 = rangeMap(end, 0, maxDistance, minX + margin, maxX - margin)

      return `<polygon points='${x1},0 ${x2},0 ${x2},100 ${x1},100' fill='#ff4e50' />`
    }).join('\n  ')
  }
  <polyline points='${points}' fill='none' stroke='#333' strokeWidth='5' />
  <path d='M${points} 995,100 5,100' fill='#9ea1ad' />
</svg>
`
}