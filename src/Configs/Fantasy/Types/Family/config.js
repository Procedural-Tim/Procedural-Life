const { getRandomInt } = require("../../../../Static/functions")
const { getStatus, getWealth } = require("../../Functions/family")
const { getLastName } = require("../../Functions/functions")
const { propTypes } = require("../../../../Static/constants.js")

const family = {
  status: {
    method: getStatus,
  },
  wealth: {
    method: getWealth,
  },
  name: {
    method: getLastName,
  },
  members: {
    // A placeholder that does not execute because it is provided by an external source, in this case see Person.family
    type: propTypes.PROVIDED,
    // Defines the n in the 1 -> n relationship
    size: () => getRandomInt(1, 6),
  },
}

// Only export the type, and only one type per file
module.exports = { family }
