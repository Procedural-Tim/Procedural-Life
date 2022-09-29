// The maximum is inclusive and the minimum is inclusive
function getRandomInt(min, max) {
  const minLoc = Math.ceil(min)
  const maxLoc = Math.floor(max)

  return Math.floor(Math.random() * (maxLoc - minLoc + 1) + minLoc)
}

function getRandomValue(values) {
  return values[getRandomInt(0, values.length - 1)]
}

module.exports = { getRandomInt, getRandomValue }
