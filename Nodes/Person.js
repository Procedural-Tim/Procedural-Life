const { getRandomInt, getRandomValue } = require("../Static/functions")
const { maleNames, femaleNames } = require("../Static/names")

const Male = "M"
const Female = "F"
const sex = [Male, Female]

function getSex() {
  return getRandomValue(sex)
}

function getName(dependencies) {
  const [sex] = dependencies;
  if (sex === Male) {
    return getRandomValue(maleNames);
  }

  return getRandomValue(femaleNames);
}

function roleStat() {
  return getRandomInt(1,6)+getRandomInt(1,6)+getRandomInt(1,6);
}

// Our first type, it is meant to represent an npc
const person = {
  sex: {
    method: getSex,
  },
  name: {
    method: getName,
    // Can not be excuted till this property has been Generated
    // Dependencies are passed as the first parameter to functions
    dependencies: ["sex"],
  },
  str: {
    method: roleStat,
  },
  dex: {
    method: roleStat,
  },
  con: {
    method: roleStat,
  },
  cha: {
    method: roleStat,
  },
  wis: {
    method: roleStat,
  },
  int: {
    method: roleStat,
  },
}

module.exports = { person }
