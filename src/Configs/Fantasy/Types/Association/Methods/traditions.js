const { getWeightedRandomValue } = require("../../../../../Static/functions")
const { traditions } = require("../Data/traditions")

function getTraditions() {
  return getWeightedRandomValue(traditions)
}

module.exports = { getTraditions }
