
const ONE_DAY = ((60 * 60) * 24) * 1000

function nextDate (now, dayIndex) {
  var day = new Date(now.getTime())
  day.setDate(day.getDate() + (dayIndex - 1 - day.getDay() + 7) % 7 + 1)

  return `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
}

function getNextRidingDays () {
  let now = new Date()

  if (now.getDay() === 0 || now.getDay() === 6) {
    // it's a weekend already, move the date back a little so to
    // always return this weekend
    now = new Date(now.getTime() - (3 * ONE_DAY))
  }

  const ridingDays = [
    nextDate(now, 6),
    nextDate(now, 7)
  ]

  return ridingDays
}

module.exports = {
  getNextRidingDays
}
