const { propTypes, paramTypes } = require("../../../../Static/constants.js")
const { getWeightedRandomValue } = require("../../../../Static/functions")
const { sexes } = require("../../Data/sexes.js")
const { races } = require("../../Data/races.js")

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
} = require("../../Functions/functions")
const { personToFamilyFilter } = require("../../Relationships/personFamily")

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
  family: {
    // A special prop that defines a relationship between the instance and the instance of another type.
    // Currently only supports n -> 1, ie a person can belong to one family but said family may have multiple memembers
    // There is no method, instead the ids of each instance are assigned to the opposing instances prop
    type: propTypes.EXTERNAL,
    dependencies: ["age", "race"],
    externalType: "Family", // NOTE: CASE MATTERS, The type of the instance to link
    externalProp: "members", // The property to assign the persons id into
    filter: personToFamilyFilter,
  },
  // status: {
  //   method: ([familyStatus]) => {"TODO: " + familyStatus},
  //   // A special case, meant to be used when referncing an external dependencies props
  //   // In this case we are getting the linked family's status
  //   dependencies: [["family", "status"]],
  // },
  gender: {
    // TODO: Move to it's own function
    method: (dependencies) => {
      const [sex] = dependencies

      // TODO: Get some real numbers so I'm not taking a wild guess at these ratios.
      return getWeightedRandomValue([
        {
          weight: 94,
          value: sex,
        },
        {
          weight: 1,
          value: "male",
        },
        {
          weight: 1,
          value: "female",
        },
        {
          weight: 4,
          value: "other",
        },
      ])
    },
    dependencies: ["sex"],
  },
  // TODO: Move the function out
  alignment: {
    method: () =>
      getWeightedRandomValue([
        {
          weight: 1,
          value: "chaotic evil",
        },
        {
          weight: 2,
          value: "neutral evil",
        },
        {
          weight: 1,
          value: "lawful evil",
        },
        {
          weight: 2,
          value: "chaotic neutral",
        },
        {
          weight: 4,
          value: "neutral",
        },
        {
          weight: 2,
          value: "lawful neutral",
        },
        {
          weight: 1,
          value: "chaotic good",
        },
        {
          weight: 2,
          value: "neutral good",
        },
        {
          weight: 1,
          value: "lawful good",
        },
      ]),
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
