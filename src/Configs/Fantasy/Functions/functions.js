const {
  getRandomValue,
  getRandomValueWithArray,
  getWeightedRandomValue,
} = require("../../../Static/functions")
const { maleNames, femaleNames, lastNames } = require("../Data/names")
const { professions } = require("../Data/professions")
const { races } = require("../Data/races")
const { traits, adultTraits } = require("../Data/traits")

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

// TODO: Allow a unique fetch
function getLastName() {
  return getRandomValue(lastNames)
}

function getAge() {
  const ages = new Array()
  // Crude way of favoring earlier ages
  for (let i = 0; i < 100; i++) {
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

function getProfession(deps) {
  const [age] = deps
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
  const [stat, , race] = dep
  return stat + (race === races["Half-Ork"].label ? 2 : 0)
}

function adjDex(dep) {
  const [stat, , race] = dep
  return stat + (race === races.Elf.label ? 2 : 0)
}

function adjCon(dep) {
  const [stat, , race] = dep
  return stat + (race === races.Dwarf.label ? 2 : 0)
}

function adjCha(dep) {
  const [stat, , race] = dep
  return stat + (race === races.Halfling.label ? 2 : 0)
}

function adjWis(dep) {
  const [stat, , race] = dep
  return stat + (race === races.Kobold.label ? 2 : 0)
}

function adjInt(dep) {
  const [stat, , race] = dep
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

  for (let i = 0; i < traitCount; i++) {
    const { value: newTrait, newValues: newTraits } = getRandomValueWithArray(
      localTraits,
      true
    )

    localTraits = newTraits
    generatedTraits.push(getRandomValue(newTrait))
  }

  return generatedTraits
}

module.exports = {
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
  getLastName,
}
