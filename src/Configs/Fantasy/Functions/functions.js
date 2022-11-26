const {
  getRandomValue,
  getRandomInt,
  getRandomValueWithArray,
  getWeightedRandomValue,
} = require("../../../Static/functions")
const {
  maleHumanNames,
  femaleHumanNames,
  lastNames,
  childDragonBornNames,
  maleDragonBornNames,
  femaleDragonBornNames,
  dwarfMaleNames,
  dwarfFemaleNames,
  elfChildNames,
  elfMaleNames,
  elfFemaleNames,
  maleTieflingNames,
  femaleTieflingNames,
  maleKoboldNames,
  femaleKoboldNames,
  gnomeMaleNames,
  gnomeFemaleNames,
  femaleOrkNames,
  maleOrkNames,
  halflingMaleNames,
  halflingFemaleNames,
} = require("../Data/names")
const { professions } = require("../Data/professions")
const { races, raceKeys } = require("../Data/races")
const { traits, adultTraits } = require("../Data/traits")

// Needs cleanup so were not using literals that could be typos
function getFirstName(dependencies) {
  const [gender, race, age] = dependencies

  switch (race) {
    case raceKeys.DRAGON_BORN:
      if (age < 16) {
        return getWeightedRandomValue(childDragonBornNames)
      }

      if (gender === "male") {
        return getWeightedRandomValue(maleDragonBornNames)
      }

      if (gender === "female") {
        return getWeightedRandomValue(femaleDragonBornNames)
      }

      if (gender === "other") {
        // This patern gives us a 50/50 split instead of the number of names causing a distortion
        return getWeightedRandomValue(
          getRandomValue([maleDragonBornNames, femaleDragonBornNames])
        )
      }
      return
    case raceKeys.DWARF:
      if (gender === "male") {
        return getWeightedRandomValue(dwarfMaleNames)
      }

      if (gender === "female") {
        return getWeightedRandomValue(dwarfFemaleNames)
      }

      if (gender === "other") {
        return getWeightedRandomValue(
          getRandomValue([dwarfFemaleNames, dwarfMaleNames])
        )
      }
      return
    case raceKeys.ELF:
      if (age < 100) {
        return getWeightedRandomValue(elfChildNames)
      }

      if (gender === "male") {
        return getWeightedRandomValue(elfMaleNames)
      }

      if (gender === "female") {
        return getWeightedRandomValue(elfFemaleNames)
      }

      if (gender === "other") {
        return getWeightedRandomValue(
          getRandomValue([elfMaleNames, elfFemaleNames])
        )
      }
      return
    case raceKeys.GNOME:
      if (gender === "male") {
        return getWeightedRandomValue(gnomeMaleNames)
      }

      if (gender === "female") {
        return getWeightedRandomValue(gnomeFemaleNames)
      }

      if (gender === "other") {
        return getWeightedRandomValue(
          getRandomValue([gnomeMaleNames, gnomeFemaleNames])
        )
      }
      return
    case raceKeys.HALFLING:
      if (gender === "male") {
        return getWeightedRandomValue(halflingMaleNames)
      }

      if (gender === "female") {
        return getWeightedRandomValue(halflingFemaleNames)
      }

      if (gender === "other") {
        return getWeightedRandomValue(
          getRandomValue([halflingFemaleNames, halflingMaleNames])
        )
      }
      return
    case raceKeys.HALF_ELF:
      if (gender === "male") {
        return getWeightedRandomValue(
          getRandomValue([elfMaleNames, maleHumanNames])
        )
      }

      if (gender === "female") {
        return getWeightedRandomValue(
          getRandomValue([elfFemaleNames, femaleHumanNames])
        )
      }

      if (gender === "other") {
        return getWeightedRandomValue(
          getRandomValue([
            elfMaleNames,
            maleHumanNames,
            elfFemaleNames,
            femaleHumanNames,
          ])
        )
      }
      return
    case raceKeys.HALF_ORK:
      if (gender === "male") {
        return getWeightedRandomValue(
          getRandomValue([maleHumanNames, maleOrkNames])
        )
      }

      if (gender === "female") {
        return getWeightedRandomValue(
          getRandomValue([femaleHumanNames, femaleOrkNames])
        )
      }

      if (gender === "other") {
        return getWeightedRandomValue(
          getRandomValue([
            maleHumanNames,
            femaleHumanNames,
            maleOrkNames,
            femaleOrkNames,
          ])
        )
      }
      return
    case raceKeys.HUMAN:
      if (gender === "male") {
        return getWeightedRandomValue(maleHumanNames)
      }

      if (gender === "female") {
        return getWeightedRandomValue(femaleHumanNames)
      }

      if (gender === "other") {
        return getWeightedRandomValue(
          getRandomValue([maleHumanNames, femaleHumanNames])
        )
      }
      return
    case raceKeys.KOBOLD:
      if (gender === "male") {
        return getWeightedRandomValue(maleKoboldNames)
      }

      if (gender === "female") {
        return getWeightedRandomValue(femaleKoboldNames)
      }

      if (gender === "other") {
        return getWeightedRandomValue(
          getRandomValue([maleKoboldNames, femaleKoboldNames])
        )
      }
      return
    case raceKeys.TIEFLING:
      if (gender === "male") {
        return getWeightedRandomValue(maleTieflingNames)
      }

      if (gender === "female") {
        return getWeightedRandomValue(femaleTieflingNames)
      }

      if (gender === "other") {
        return getWeightedRandomValue(
          getRandomValue([maleTieflingNames, femaleTieflingNames])
        )
      }
      return
    default:
      console.warn("Invalid race: ", race)
      return getWeightedRandomValue(maleHumanNames)
  }
}

// TODO: Allow a unique fetch
function getLastName() {
  return getRandomValue(lastNames)
}

function getAge(dependencies) {
  const [race] = dependencies
  
  const getNormalizedAge = (max) => {
    return getWeightedRandomValue([{
      value: getRandomInt(max - Math.ceil(max*.95), max),
      weight: 1
    },
    {
      value: getRandomInt(max - Math.floor(max*.90), Math.floor(max*.95)),
      weight: 2
    },
    {
      value: getRandomInt(max - Math.floor(max*.85), Math.floor(max*.90)),
      weight: 4
    },
    {
      value: getRandomInt(max - Math.floor(max*.80), Math.floor(max*.85)),
      weight: 8
    },
    {
      value: getRandomInt(max - Math.floor(max*.80), Math.floor(max*.85)),
      weight: 12
    },
    {
      value: getRandomInt(max - Math.floor(max*.75), Math.floor(max*.80)),
      weight: 16
    },
    {
      value: getRandomInt(max - Math.floor(max*.70), Math.floor(max*.75)),
      weight: 24
    },
    {
      value: getRandomInt(0, Math.floor(max*.70)),
      weight: 433
    },
  ])
  }

  switch (race) {
    case raceKeys.DRAGON_BORN:
      return getNormalizedAge(90)
    case raceKeys.DWARF:
      return getNormalizedAge(500)
    case raceKeys.ELF:
      return getNormalizedAge(800)
    case raceKeys.GNOME:
      return getNormalizedAge(500)
    case raceKeys.HALFLING:
      return getNormalizedAge(200)
    case raceKeys.HALF_ELF:
      return getNormalizedAge(260)
    case raceKeys.HALF_ORK:
      return getNormalizedAge(80)
    case raceKeys.HUMAN:
      return getNormalizedAge(100)
    case raceKeys.KOBOLD:
      return getNormalizedAge(120)
    case raceKeys.TIEFLING:
      return getNormalizedAge(120)
    default:
      console.warn("Invalid race: ", race)
      return getNormalizedAge(100)  
    }  
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
  return stat + (race === raceKeys.HALF_ORK ? 2 : 0)
}

function adjDex(dep) {
  const [stat, , race] = dep
  return stat + (race === raceKeys.ELF ? 2 : 0)
}

function adjCon(dep) {
  const [stat, , race] = dep
  return stat + (race === raceKeys.DWARF ? 2 : 0)
}

function adjCha(dep) {
  const [stat, , race] = dep
  return stat + (race === raceKeys.HALFLING ? 2 : 0)
}

function adjWis(dep) {
  const [stat, , race] = dep
  return stat + (race === raceKeys.KOBOLD ? 2 : 0)
}

function adjInt(dep) {
  const [stat, , race] = dep
  return stat + (race === raceKeys.GNOME ? 2 : 0)
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

function getGender(dependencies) {
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
}

module.exports = {
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
  getGender,
}
