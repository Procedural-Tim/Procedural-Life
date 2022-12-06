const { propTypes, paramTypes } = require("../../../../Static/constants.js")
const { getWeightedRandomValue, getRandomInt } = require("../../../../Static/functions")
const { sexes } = require("../../Data/sexes.js")
const { sexualOrientations } = require("../../Data/sexualOrientations.js")
const { races } = require("../../Data/races.js")
const { goodOrEvil, lawOrChaos } = require ("../../Data/alignments")
const { mapRelationship, filterRelationship } = require("../../Relationships/index")

const {
  getFirstName,
  getAge,
  getProfession,
  adjStr,
  adjDex,
  adjCon,
  adjCha,
  adjWis,
  adjInt,
  getTraits,
  getGender,
  getRelationshipStatus,
} = require("../../Functions/functions")

const { roll3D6 } = require("../../Functions/dice")

// Our first type, it is meant to represent an npc
const person = {
  // It has no dependencies but we do need to give it a parameter to generate from, in this case its the sex data set.
  sex: {
    method: getWeightedRandomValue,
    params: [{ type: paramTypes.DATA, value: sexes }],
  },
  firstName: {
    method: getFirstName,
    // Can not be executed till these properties have been Generated
    // Depreciated: In the absence of a param prop, dependencies are passed as the first parameter to functions
    dependencies: ["gender", "race", "age"],
  },
  gender: {
    method: getGender,
    dependencies: ["sex"],
  },
  sexualOrientation: {
    method: getWeightedRandomValue,
    params: [{ type: paramTypes.DATA, value: sexualOrientations}]
  },
  goodOrEvil: {
    method: getWeightedRandomValue,
    params: [{ type: paramTypes.DATA, value: goodOrEvil}]
  },
  lawOrChaos: {
    method: getWeightedRandomValue,
    params: [{ type: paramTypes.DATA, value: lawOrChaos}]
  },
  age: {
    method: getAge,
    dependencies: ["race"],
  },
  relationshipStatus: {
    method: getRelationshipStatus,
    dependencies: ["age"],
  },
  partner: {
    type: propTypes.BIDIRECTIONAL,
    dependencies: ["gender", "age", "sexualOrientation", "goodOrEvil", "lawOrChaos", "race", "relationshipStatus"],
    externalType: "Person",
    externalProp: "partner",
    method: mapRelationship,
    filter: filterRelationship,
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
    method: getWeightedRandomValue,
    params: [{ type: paramTypes.DATA, value: races }],
  },
  adjStr: {
    method: adjStr,
    dependencies: ["str", "age", "race"],
  },
  adjDex: {
    method: adjDex,
    dependencies: ["dex", "age", "race"],
  },
  adjCon: {
    method: adjCon,
    dependencies: ["con", "age", "race"],
  },
  adjCha: {
    method: adjCha,
    dependencies: ["cha", "age", "race"],
  },
  adjWis: {
    method: adjWis,
    dependencies: ["wis", "age", "race"],
  },
  adjInt: {
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
