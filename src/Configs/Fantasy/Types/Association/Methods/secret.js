const { getWeightedRandomValue } = require("../../../../../Static/functions")

function isSecret(dep) {
  const [focus] = dep
  if (focus === "politics") {
    return getWeightedRandomValue([
      { value: true, weight: 4 },
      { value: false, weight: 1 },
    ])
  }

  return getWeightedRandomValue([
    { value: true, weight: 1 },
    { value: false, weight: 2 },
  ])
}
module.exports = { isSecret }
