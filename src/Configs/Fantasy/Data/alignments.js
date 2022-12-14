const goodOrEvilValues = {
  G3: "Pure Good",
  G2: "Good",
  G1: "Slightly Good",
  NEUTRAL: "Neutral",
  E1: "Slightly Evil",
  E2: "Evil",
  E3: "Pure Evil",
}

const lawOrChaosValues = {
  L3: "Pure Lawful",
  L2: "Lawful",
  L1: "Slightly Lawful",
  NEUTRAL: "Neutral",
  C1: "Slightly Chaotic",
  C2: "Chaotic",
  C3: "Pure Chaotic",
}

const goodOrEvil = [
  {
    value: goodOrEvilValues.G3,
    weight: 1,
    tags: [],
  },
  {
    value: goodOrEvilValues.G2,
    weight: 2,
    tags: [],
  },
  {
    value: goodOrEvilValues.G1,
    weight: 4,
    tags: [],
  },
  {
    value: goodOrEvilValues.NEUTRAL,
    weight: 20,
    tags: [],
  },
  {
    value: goodOrEvilValues.E1,
    weight: 4,
    tags: [],
  },
  {
    value: goodOrEvilValues.E2,
    weight: 2,
    tags: [],
  },
  {
    value: goodOrEvilValues.E3,
    weight: 1,
    tags: [],
  },
]

const lawOrChaos = [
  {
    value: lawOrChaosValues.L3,
    weight: 1,
    tags: [],
  },
  {
    value: lawOrChaosValues.L2,
    weight: 2,
    tags: [],
  },
  {
    value: lawOrChaosValues.L1,
    weight: 4,
    tags: [],
  },
  {
    value: lawOrChaosValues.NEUTRAL,
    weight: 20,
    tags: [],
  },
  {
    value: lawOrChaosValues.C1,
    weight: 4,
    tags: [],
  },
  {
    value: lawOrChaosValues.C2,
    weight: 2,
    tags: [],
  },
  {
    value: lawOrChaosValues.C3,
    weight: 1,
    tags: [],
  },
]

const good = [goodOrEvilValues.G3, goodOrEvilValues.G2, goodOrEvilValues.G1]
const evil = [goodOrEvilValues.E3, goodOrEvilValues.E2, goodOrEvilValues.E1]
const lawful = [lawOrChaosValues.L3, lawOrChaosValues.L2, lawOrChaosValues.L1]
const chaotic = [
  lawOrChaosValues.C3,
  lawOrChaosValues.C2,
  lawOrChaosValues.C1,
]

module.exports = { goodOrEvil, lawOrChaos, lawOrChaosValues, goodOrEvilValues, good, evil, lawful, chaotic }
