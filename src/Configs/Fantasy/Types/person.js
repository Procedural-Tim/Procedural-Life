const { getRandomInt, getWeightedRandomValue } = require("../../../Static/functions")

const {
  getTypeInstances,
} = require("../../../Core/typeRegistry")

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
  // A property with an eternal dependcy.
  // External dependencies will attempt to find an instance that matches the filters,
  // and if it can't find one it will create one.
  // There is an invisible build relationship method here that will asign to family the the generated family type
  // Like all property methods it takes in the value of dependencies as an array of values as the first parameter.
  family: {
    // Like any other property d
    dependencies: ["age", "race"],
    // TODO: Whole thing needs work to make it more consistant and abstract.
    // Also remove the inline filter
    externalDependency: {
      // The type name of the external dependency
      type: "family",
      // Allows reducing of the existing possible family list based on a filter function
      // If this reduces the list to 0 a new family will be created.
      // The assumption is a new family will meet the filter
      // TODO: Move the filter into the relationship section (Does not currently exist)
      filter: (dependencies, externalInstance) => {
        const [ age, race ] = dependencies;
        const currentInstances = getTypeInstances("person");

        const currentMembers = externalInstance.members.map(personId => {
          // TODO: look into using the index as a starting point to make more performant
          return currentInstances.find(person => person._id === personId)
        });

        const matchesFamilyRaces = currentMembers.some(member => member.race === race);
        const ageBracketOpen = age < 20 || currentMembers.filter(member => Math.abs(member.age - age) > 20).length < 3;

        // Even if the race doesn't match any of the families current races their is a 20% chance to add them anyway
        const racePasses = matchesFamilyRaces || getRandomInt(1,10) > 8;
        // Even if they are an adult, and two adults in the age band exist their is a 40% chance to add them anyway
        const agePasses = ageBracketOpen || getRandomInt(1,10) > 6;

        return (racePasses && agePasses && (
          externalInstance?.members === undefined ||
          externalInstance.size > externalInstance.members.length)
        )
      },
      // TODO: Need to define the other half of this bidirectional relationship better, but I need sleep so doing it tomorrow.
      externalProp: "members",
    },
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
      const [sex] = dependencies;

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
        }
      ])      
    },
    dependencies: ["sex"],
  },
  // TODO: Move the function out
  alignment: {
    method: () => getWeightedRandomValue([{
      weight: 1,
      value: "chaotic evil",
    },{
      weight: 2,
      value: "neutral evil",
    },{
      weight: 1,
      value: "lawful evil",
    },{
      weight: 2,
      value: "chaotic neutral",
    },{
      weight: 4,
      value: "neutral",
    },{
      weight: 2,
      value: "lawful neutral",
    },{
      weight: 1,
      value: "chaotic good",
    },{
      weight: 2,
      value: "neutral good",
    },{
      weight: 1,
      value: "lawful good",
    },])
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
