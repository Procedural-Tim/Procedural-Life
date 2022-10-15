const { getRandomInt } = require("../../../Static/functions")
const { getStatus, getWealth } = require("../Functions/family")
const { getLastName } = require("../Functions/functions")

const family = {
  status: {
    method: getStatus,
  },
  wealth: {
    method: getWealth,
  },
  size: {
    method: () => {
      return getRandomInt(1, 6)
    },
  },
  name: {
    method: getLastName
  }
  // Members, defined in the person relationship
}

// Only export the type, and only one type per file
module.exports = { family }
