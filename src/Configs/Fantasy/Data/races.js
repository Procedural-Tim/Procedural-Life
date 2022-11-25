const raceKeys = {
  HUMAN: "human",
  ELF: "elf",
  DWARF: "dwarf",
  HALFLING: "halfling",
  GNOME: "gnome",
  HALF_ORK: "half-ork",
  KOBOLD: "mighty dragons",
  DRAGON_BORN: "dragon born",
  TIEFLING: "tiefling",
  HALF_ELF: "half-elf",
}

const races = [
  {
    value: raceKeys.HUMAN,
    weight: 8,
  },
  {
    value: raceKeys.ELF,
    weight: 2,
  },
  {
    value: raceKeys.DWARF,
    weight: 2,
  },
  {
    value: raceKeys.HALFLING,
    weight: 2,
  },
  {
    value: raceKeys.GNOME,
    weight: 2,
  },
  {
    value: raceKeys.HALF_ORK,
    weight: 2,
  },
  {
    value: raceKeys.KOBOLD,
    weight: 2,
  },
  {
    value: raceKeys.DRAGON_BORN,
    weight: 2,
  },
  {
    value: raceKeys.TIEFLING,
    weight: 2,
  },
  {
    value: raceKeys.HALF_ELF,
    weight: 2,
  },
]

module.exports = { races, raceKeys }
