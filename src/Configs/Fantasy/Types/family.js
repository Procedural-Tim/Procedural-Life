const { getStatus, getWealth } = require("../Functions/family")

const family = {
  status: {
    method: getStatus,
  },
  wealth: {
    method: getWealth,
  },
}

// Only export the type, and only one type per file
module.exports = { family }
