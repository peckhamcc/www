
module.exports = async function addStageMetadata (activity, stage, api) {
  // get detailed activity data
  const stream = await api.get(`/activities/${activity.id}/streams`, {
    query: {
      keys: 'distance,time,altitude',
      key_by_type: true
    }
  })

  const elevationData = []
  let distance = 0
  let index = 0

  while (distance < stage.distance) {
    elevationData.push({
      altitude: stream.altitude.data[index],
      distance: stream.distance.data[index]
    })

    distance = stream.distance.data[index]
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
