
module.exports = function findFastestSegmentTime (activity, segment) {
  return activity.segment_efforts
    .filter(effort => effort.name === segment)
    .map(effort => effort.elapsed_time)
    .sort()
    .shift() * 1000
}
