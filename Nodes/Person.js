const {
  getRandomInt,
  getRandomValue,
  getRandomValueWithArray,
  getWeightedRandomValue,
} = require("../Static/functions")
const { maleNames, femaleNames, lastNames } = require("../Static/names")
const { professions } = require("../Static/professions")
const { races } = require("../Static/races")
const { traits, adultTraits } = require("../Static/traits")

const Male = "M"
const Female = "F"
const sex = [Male, Female]

function getSex() {
  return getRandomValue(sex)
}

function getFirstName(dependencies) {
  const [sex] = dependencies
  if (sex === Male) {
    return getRandomValue(maleNames)
  }

  return getRandomValue(femaleNames)
}

function roleStat() {
  return getRandomInt(1, 6) + getRandomInt(1, 6) + getRandomInt(1, 6)
}

function getAge() {
  const ages = new Array()
  // Crude way of favoring earlier ages
  for (i = 0; i < 100; i++) {
    if (i < 20) {
      ages.push({
        value: i,
        weight: 5,
      })
    } else if (i < 40) {
      ages.push({
        value: i,
        weight: 4,
      })
    } else if (i < 60) {
      ages.push({
        value: i,
        weight: 3,
      })
    } else if (i < 80) {
      ages.push({
        value: i,
        weight: 2,
      })
    } else {
      ages.push({
        value: i,
        weight: 1,
      })
    }
  }

  return getWeightedRandomValue(ages)
}

function getLastName() {
  return getRandomValue(lastNames)
}

function getProfession(deps) {
  const [age, str, dex, con, cha, wis, int] = deps
  const prof = getWeightedRandomValue(
    professions
      .map((prof) => ({
        title: prof.title,
        weight: prof.getQualificationLevel(...deps),
      }))
      .filter((prof) => prof.weight > 0)
  ) || { title: "Unemployed" }

  if (age < 13) {
    return "Child"
  }

  if (age < 18) {
    return `Apprentice ${prof.title}`
  }

  if (age > 80) {
    return "Retired"
  }

  return prof.title
}

function getRace() {
  return getWeightedRandomValue(
    Object.values(races).map((props) => {
      return {
        value: props.label,
        weight: props.weight,
      }
    })
  )
}

function adjStr(dep) {
  const [stat, age, race] = dep
  return stat + (race === races["Half-Ork"].label ? 2 : 0)
}

function adjDex(dep) {
  const [stat, age, race] = dep
  return stat + (race === races.Elf.label ? 2 : 0)
}

function adjCon(dep) {
  const [stat, age, race] = dep
  return stat + (race === races.Dwarf.label ? 2 : 0)
}

function adjCha(dep) {
  const [stat, age, race] = dep
  return stat + (race === races.Halfling.label ? 2 : 0)
}

function adjWis(dep) {
  const [stat, age, race] = dep
  return stat + (race === races.Kobold.label ? 2 : 0)
}

function adjInt(dep) {
  const [stat, age, race] = dep
  return stat + (race === races.Gnome.label ? 2 : 0)
}

function getTraits(dep) {
  const [age] = dep
  const traitCount = getWeightedRandomValue([
    { value: 1, weight: 5 },
    { value: 2, weight: 3 },
    { value: 3, weight: 2 },
  ])

  let localTraits = age < 18 ? [...traits] : [...traits, ...adultTraits]
  const generatedTraits = []

  for (i = 0; i < traitCount; i++) {
    const { value: newTrait, newValues: newTraits } = getRandomValueWithArray(
      localTraits,
      true
    )

    localTraits = newTraits
    generatedTraits.push(getRandomValue(newTrait))
  }

  return generatedTraits
}

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

module.exports = { person }
