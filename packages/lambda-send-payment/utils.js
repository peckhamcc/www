
const capitalise = (string) => {
  return string.substring(0, 1).toUpperCase() + string.substring(1)
}

const waterfall = (funcs, cb) => {
  let index = 0
  const results = []

  const execute = () => {
    const args = []

    if (index > 0) {
      args.push(results[index - 1])
    }

    args.push((error, result) => {
      if (error) {
        return cb(error)
      }

      results[index] = result

      index++

      if (index === funcs.length) {
        return cb(null, results)
      }

      execute()
    })

    funcs[index].apply(null, args)
  }

  execute()
}

module.exports = {
  capitalise,
  waterfall
}
