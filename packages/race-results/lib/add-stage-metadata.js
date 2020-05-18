const calculate = require('azimuth')

module.exports = async function addStageMetadata (activity, stage, api) {
  // get detailed activity data
  const stream = await api.get(`/activities/${activity.id}/streams`, {
    query: {
      keys: 'distance,altitude,time,latlng',
      key_by_type: true
    }
  })

  const elevationData = []
  let distance = 0
  let index = 0

  let lastPoint = {
    lat: stream.latlng.data[0][0],
    lng: stream.latlng.data[0][1],
    elv: stream.altitude.data[0]
  }

  while (distance < stage.distance) {
    elevationData.push({
      altitude: stream.altitude.data[index],
      distance: stream.distance.data[index],
      latlng: stream.latlng.data[index],
    })

    const point = {
      lat: stream.latlng.data[index][0],
      lng: stream.latlng.data[index][1],
      elv: stream.altitude.data[index]
    }

    const res = calculate.azimuth(lastPoint, point)
    distance += res.distance

    lastPoint = point

    //distance = stream.distance.data[index]
    index++
  }

  stage.elevation = elevationData

  stage.sprints.forEach(sprint => {
    activity.segment_efforts.forEach(effort => {
      if (effort.segment.name === sprint.name) {
        sprint.segments = sprint.segments || []
        sprint.segments.push(effort)
      }
    })
  })

  stage.climbs.forEach(climb => {
    activity.segment_efforts.forEach(effort => {
      if (effort.segment.name === climb.name) {
        climb.segments = climb.segments || []
        climb.segments.push(effort)
      }
    })
  })
}
