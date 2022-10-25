const { propTypes } = require("../../../Static/constants.js")
const { getWeightedRandomValue } = require("../../../Static/functions")
const {
  getSex,
  getFirstName,
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
const { personToFamilyFilter } = require("../Relationships/personFamily")

const { roll3D6 } = require("../Functions/dice")

// Our first type, it is meant to represent an npc
const person = {
  // The most basic of attributes, it takes only a method.
  sex: {
    method: getSex,
  },
  firstName: {
    method: getFirstName,
    // Can not be excuted till this property has been Generated
    // Dependencies are passed as the first parameter to functions
    dependencies: ["sex"],
  },
  family: {
    // A special prop that defines a relationship between the instance and the instance of another type.
    // Currently only supports n -> 1, ie a person can belong to one family but said family may have multiple memembers
    // There is no method, instead the ids of each instance are assigned to the opposing instances prop
    type: propTypes.EXTERNAL,
    dependencies: ["age", "race"],
    externalType: "family", // The type of the instance to link
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
          value: "Male",
        },
        {
          weight: 1,
          value: "Female",
        },
        {
          weight: 4,
          value: "Other",
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
