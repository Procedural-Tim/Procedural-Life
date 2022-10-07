const { getWeightedRandomValue } = require("../../../Static/functions")
const { statuses } = require("../Data/statuses")
const { wealth } = require("../Data/wealth")

function getWealth() {
  return getWeightedRandomValue(wealth)
}
function getStatus() {
  return getWeightedRandomValue(statuses)
}

module.exports = { getStatus, getWealth }
