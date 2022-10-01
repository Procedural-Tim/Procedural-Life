// The maximum is inclusive and the minimum is inclusive
function getRandomInt(min, max) {
  const minLoc = Math.ceil(min)
  const maxLoc = Math.floor(max)

  return Math.floor(Math.random() * (maxLoc - minLoc + 1) + minLoc)
}

function getRandomValue(values) {
  return values[getRandomInt(0, values.length - 1)]
}

function getWeightedRandomValue(values = []) {
  return getRandomValue(
    values.reduce((acc, val) => {
      const value = val.value ?? val
      const weight = val.weight ?? 1

      for (i = 0; i < weight; i++) {
        acc.push(value)
      }

      return acc
    }, [])
  )
}

module.exports = { getRandomInt, getRandomValue, getWeightedRandomValue }
