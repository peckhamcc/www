
module.exports = (funcs, cb) => {
  let index = 0
  let results = []

  const execute = () => {
    funcs[index](results[index - 1], (error, result) => {
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
  }
}
