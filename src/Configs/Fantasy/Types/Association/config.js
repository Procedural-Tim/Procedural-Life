const { associationNames } = require("../../Data/thing-names/associations")
const { getWeightedRandomValue } = require("../../../../Static/functions")
const { propTypes, paramTypes } = require("../../../../Static/constants.js")
const { sizes } = require("./Data/sizes")
const { getTraditions } = require("./Methods/traditions")
const { isSecret } = require("./Methods/secret.js")
const { getFocus } = require("./Methods/focus")

const association = {
  name: {
    method: getWeightedRandomValue,
    params: [{ type: paramTypes.DATA, value: associationNames }],
  },
  focus: {
    method: getFocus,
  },
  members: {
    type: propTypes.PROVIDED,
    dependencies: ["focus", "maxSize"],
  },
  secret: {
    method: isSecret,
    dependencies: ["focus"],
  },
  maxSize: {
    method: getWeightedRandomValue,
    params: [{ type: paramTypes.DATA, value: sizes }],
  },
  traditions: 
    {
      method: getTraditions,
      dependencies: ["focus"],
    },
}

module.exports = { association }
