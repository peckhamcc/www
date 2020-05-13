
module.exports = async function findActivity (stage, api) {
  const activities = await api.get(`/activities`, {
    query: {
      after: (stage.start.getTime() / 1000) - 60,  // 1 minute before the first stage
      before: (stage.start.getTime() / 1000) + 60, // 1 minute after the last stage
    }
  })

  // find the activity in their stream
  const activity = activities.find(a => {
    const start = new Date(a.start_date)

    if (Math.abs(stage.start.getTime() - start.getTime()) <= 60000) { // within a mintue of the start time
      return a
    }
  })

  // did not race
  if (!activity) {
    console.error('  ❓ Did not race in', stage.name)
    return
  }

  const details = await api.get(`/activities/${activity.id}`, {
    query: {
      include_all_efforts: true
    }
  })

  // get detailed activity data
  const stream = await api.get(`/activities/${activity.id}/streams`, {
    query: {
      keys: 'distance,time',
      key_by_type: true
    }
  })

  let distance = 0
  let index = 0
  let time = 0

  while (distance < stage.distance) {
    distance = stream.distance.data[index]
    time = stream.time.data[index]
    index++
  }

  if (!distance || distance < stage.distance) {
    console.error('  ❌ Did not finish', stage.name)
    return 'DNF'
  }

  if (!details.segment_efforts.length) {
    console.error('  ❓ No segments for', stage.name)
    return
  }

  details.stage_time = time * 1000

  console.error('  ✅ Completed', stage.name)
  return details
}
