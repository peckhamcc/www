const calculate = require('azimuth')
const format = require('format-duration')

const { haversine } = require('earth-distance-js')
const distFrom = require('distance-from')
const haversineDistance = require('haversine-distance')
const haversineFunc = require('haversine')

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
      keys: 'distance,altitude,time,latlng',
      key_by_type: true
    }
  })

  if (!stream.latlng.data.length) {
    console.error('  ❓ No data for', stage.name)
    return
  }

  if (!details.segment_efforts.length) {
    console.error('  ❓ No segments for', stage.name)
    return
  }

  const targetDistance = stage.distance

  if (!stream.distance || !stream.distance.data || stream.distance.data[stream.distance.data.length] < targetDistance) {
    console.error('  ❌ Did not finish', stage.name)
    return 'DNF'
  }
/*
  let distance = parseFloat(stream.distance.data[0].toFixed(1))
  let distanceWithAltitude = parseFloat(stream.distance.data[0].toFixed(1))
  let distanceWithAz = parseFloat(stream.distance.data[0].toFixed(1))
  let index = 0
  let time = 0
  let distanceFromStart = 0

  if (stage.elevation) {
    let res = calculate.azimuth({
      lat: stream.latlng.data[0][0],
      lng: stream.latlng.data[0][1],
      elv: stream.altitude.data[0]
    }, {
      lat: stage.elevation[0].latlng[0],
      lng: stage.elevation[0].latlng[1],
      elv: stage.elevation[0].altitude
    })

    distanceFromStart = res.distance
  }

  const targetDistance = stage.distance - distanceFromStart
  let timeToStart = 0

  let lastPoint = {
    lat: stream.latlng.data[0][0],
    lng: stream.latlng.data[0][1],
    elv: stream.altitude.data[0] + 500
  }

  let lastDistance = stream.distance.data[index]

  while (distance < targetDistance) {
    if (index >= stream.time.data.length) {
      break
    }

    time = stream.time.data[index]

    const point = {
      lat: stream.latlng.data[index][0],
      lng: stream.latlng.data[index][1],
      elv: stream.altitude.data[index] + 500
    }

    const res = calculate.azimuth(lastPoint, point)

    lastDistance = stream.distance.data[index] - lastDistance

    const delta = distanceBetween(lastPoint.lat, lastPoint.lng, point.lat, point.lng)
    //const distance = parseFloat((distance + parseFloat(res.distance.toFixed(1))).toFixed(1))
    const withAltitude = Math.sqrt(Math.pow(delta, 2) + Math.pow(lastPoint.elv - point.elv, 2))
    distanceWithAz += res.distance

    distance += delta
    distanceWithAltitude += withAltitude

    console.error('position', point.lat, point.lng, stream.altitude.data[index])
    console.error('delta', delta, 'withAltitude', withAltitude, 'az', res.distance, 'expected', lastDistance, 'acc', distance, 'accWithElevation', distanceWithAltitude, 'azDistance', distanceWithAz, 'stream', stream.distance.data[index])

    if (!timeToStart && distanceFromStart && distance >= distanceFromStart) {
      timeToStart = time
    }

    lastPoint = point
    index++
  }
*/

  const streamTime = calculateTime(targetDistance, stream, (a, b, c, last) => stream.distance.data[c] - last)
  const haversineDistanceTime = calculateTime(targetDistance, stream, (a, b, c) => {
    return distanceBetween(a.lat, a.lng, b.lat, b.lng)
  })
  const haversineDistanceParensTime = calculateTime(targetDistance, stream, (a, b, c) => {
    return distanceBetweenParens(a.lat, a.lng, b.lat, b.lng)
  })
  const haversineDistanceTimeWithAltitude = calculateTime(targetDistance, stream, (a, b, c) => {
    const delta = distanceBetween(a.lat, a.lng, b.lat, b.lng)

    return Math.sqrt(Math.pow(delta, 2) + Math.pow(a.elv - b.elv, 2))
  })
  const azimuthTime = calculateTime(targetDistance, stream, (a, b, c) => {
    const res = calculate.azimuth(a, b)

    return res.distance
  })
  const azimuthTimeWithoutAltitude = calculateTime(targetDistance, stream, (a, b, c) => {
    const res = calculate.azimuth({
      ...a,
      elv: -50
    }, {
      ...b,
      elv: -50
    })

    return res.distance
  })
  const distanceFrom = calculateTime(targetDistance, stream, (a, b, c) => {
    return distFrom([a.lat, a.lng]).to([b.lat, b.lng]).in('m')
  })
  const earthDistanceJs = calculateTime(targetDistance, stream, (a, b, c) => {
    return haversine({ lat: a.lat, lon: a.lng }, { lat: b.lat, lon: b.lng })
  })
  const haversineDistancea = calculateTime(targetDistance, stream, (a, b, c) => {
    return haversineDistance({ latitude: a.lat, longitude: a.lng }, { latitude: b.lat, longitude: b.lng })
  })
  const haversineFuncD = calculateTime(targetDistance, stream, (a, b, c) => {
    return haversineFunc({ latitude: a.lat, longitude: a.lng }, { latitude: b.lat, longitude: b.lng }, { unit: 'meter' })
  })

  const time = haversineDistanceTime

  details.stage_time = time * 1000

  console.error('stream time', format(streamTime * 1000))
  console.error('haversine distance time', format(haversineDistanceTime * 1000))
  console.error('haversine distance parens time', format(haversineDistanceParensTime * 1000))

  console.error('haversine distance with altitude time', format(haversineDistanceTimeWithAltitude * 1000))
  console.error('azimuth time', format(azimuthTime * 1000))
  console.error('azimuth without altitude', format(azimuthTimeWithoutAltitude * 1000))
  console.error('distanceFrom', format(distanceFrom * 1000))
  console.error('earthDistanceJs', format(earthDistanceJs * 1000))
  console.error('haversineDistance', format(haversineDistancea * 1000))
  console.error('haversineFunc', format(haversineFuncD * 1000))

  console.error('  ✅ Completed', stage.name, `${targetDistance}m`, 'in', format(details.stage_time))
  return details
}

function distanceBetween(lat1, lon1, lat2, lon2) {
  const p = Math.PI / 180    // Math.PI / 180

  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
}

function distanceBetweenParens(lat1, lon1, lat2, lon2) {
  const p = Math.PI / 180    // Math.PI / 180

  var c = Math.cos;
  var a = (0.5 - (c((lat2 - lat1) * p)/2)) +
          ((c(lat1 * p) * c(lat2 * p)) * ((1 - c((lon2 - lon1) * p)))/2);

  return (12742 * Math.asin(Math.sqrt(a))) * 1000; // 2 * R; R = 6371 km
}

function calculateTime (targetDistance, stream, calculate) {
  let time = 0
  let index = 0
  let distance = stream.distance.data[0]
  let lastPoint = {
    lat: stream.latlng.data[0][0],
    lng: stream.latlng.data[0][1],
    elv: stream.altitude.data[0] + 500
  }

  while (distance < targetDistance) {
    if (index >= stream.time.data.length) {
      break
    }

    const point = {
      lat: stream.latlng.data[index][0],
      lng: stream.latlng.data[index][1],
      elv: stream.altitude.data[index] + 500
    }

    distance += calculate(lastPoint, point, index, distance)

    time = stream.time.data[index]
    lastPoint = point
    index++
  }

  return time
}