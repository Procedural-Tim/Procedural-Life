const { getWeightedRandomValue } = require("../../../../../Static/functions")
const {
  goodOrEvilValues,
  lawOrChaosValues,
} = require("../../../Data/alignments")

const topLevelValues = {
    POLITICS: "politics",
    ART: "art",
    PHYSICAL: "physical",
    INTELLECTUAL: "intellectual",
    SPIRITUAL: "spiritual"
}

const topLevel = [
  {
    value: topLevelValues.POLITICS,
    weight: 4,
  },
  {
    value: topLevelValues.ART,
    weight: 4,
  },
  {
    value: topLevelValues.PHYSICAL,
    weight: 4,
  },
  {
    value: topLevelValues.INTELLECTUAL,
    weight: 4,
  },
  {
    value: topLevelValues.SPIRITUAL,
    weight: 4,
  }
]

const subLevels = {
    [topLevelValues.ART]: [
        "music",
        "dance",
        "singing",
        "painting",
        "sculpture",
        "writing",
        "tale telling",
      ],
      [topLevelValues.POLITICS]: [
        { value: [goodOrEvilValues.E2, lawOrChaosValues.C2] },
        { value: [goodOrEvilValues.E2, lawOrChaosValues.NEUTRAL] },
        { value: [goodOrEvilValues.E2, lawOrChaosValues.L2] },
        { value: [goodOrEvilValues.NEUTRAL, lawOrChaosValues.C2] },
        { value: [goodOrEvilValues.NEUTRAL, lawOrChaosValues.NEUTRAL] },
        { value: [goodOrEvilValues.NEUTRAL, lawOrChaosValues.L2] },
        { value: [goodOrEvilValues.G2, lawOrChaosValues.C2] },
        { value: [goodOrEvilValues.G2, lawOrChaosValues.NEUTRAL] },
        { value: [goodOrEvilValues.G2, lawOrChaosValues.L2] },
      ],
      [topLevelValues.PHYSICAL]: [
        "running",
        "weight lifting",
        "wrestling",
        "discus",
        "martial arts",
        "boxing",
        "horse racing",
        "hiking",
        "climbing",
      ],
      [topLevelValues.INTELLECTUAL]: [
        "reading",
        "debates",
        "philosophy",
        "history",
        "arcane research",
        "architecture",
        "nature",
        "nobility",
        "religion",
      ],
      [topLevelValues.SPIRITUAL]: [
        "gods",
        "nature",
        "non deity spirituality",
        "extra planar concept"
      ]
}

function getFocus() {
    const top = getWeightedRandomValue(topLevel)
    const sub = getWeightedRandomValue(subLevels[top])

    return {
        topLevel: top,
        subLevel: sub,
    }
}

module.exports = { getFocus, topLevelValues }
