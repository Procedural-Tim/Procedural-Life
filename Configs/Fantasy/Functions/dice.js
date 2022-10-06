const { getRandomInt } = require("../../../Static/functions")

function roll3D6() {
  return getRandomInt(1, 6) + getRandomInt(1, 6) + getRandomInt(1, 6)
}

module.exports = { roll3D6 }
