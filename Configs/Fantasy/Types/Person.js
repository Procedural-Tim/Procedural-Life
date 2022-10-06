const {
  getSex,
  getFirstName,
  getLastName,
  getAge,
  getProfession,
  getRace,
  adjStr,
  adjDex,
  adjCon,
  adjCha,
  adjWis,
  adjInt,
  getTraits,
} = require("../Functions/functions")

const { roll3D6 } = require("../Functions/dice")

// Our first type, it is meant to represent an npc
const person = {
  sex: {
    method: getSex,
  },
  firstName: {
    method: getFirstName,
    // Can not be excuted till this property has been Generated
    // Dependencies are passed as the first parameter to functions
    dependencies: ["sex"],
  },
  lastName: {
    method: getLastName,
  },
  age: {
    method: getAge,
  },
  profession: {
    method: getProfession,
    dependencies: [
      "age",
      "adjustedStr",
      "adjustedDex",
      "adjustedCon",
      "adjustedCha",
      "adjustedWis",
      "adjustedInt",
    ],
  },
  str: {
    method: roll3D6,
  },
  dex: {
    method: roll3D6,
  },
  con: {
    method: roll3D6,
  },
  cha: {
    method: roll3D6,
  },
  wis: {
    method: roll3D6,
  },
  int: {
    method: roll3D6,
  },
  race: {
    method: getRace,
  },
  adjustedStr: {
    method: adjStr,
    dependencies: ["str", "age", "race"],
  },
  adjustedDex: {
    method: adjDex,
    dependencies: ["dex", "age", "race"],
  },
  adjustedCon: {
    method: adjCon,
    dependencies: ["con", "age", "race"],
  },
  adjustedCha: {
    method: adjCha,
    dependencies: ["cha", "age", "race"],
  },
  adjustedWis: {
    method: adjWis,
    dependencies: ["wis", "age", "race"],
  },
  adjustedInt: {
    method: adjInt,
    dependencies: ["int", "age", "race"],
  },
  traits: {
    method: getTraits,
    dependencies: ["age"],
  },
}

// Only export the type, and only one type per file
module.exports = { person }
