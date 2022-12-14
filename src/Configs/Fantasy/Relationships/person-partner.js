const { getWeightedRandomValue } = require("../../../Static/functions")
const { relationshipStatusValues } = require("../Data/relationship-statuses")
const { sexualOrientationValues } = require("../Data/sexualOrientations")
const { goodOrEvilValues, lawOrChaosValues, good, evil, lawful, chaotic } = require("../Data/alignments")
const { genderValues } = require("../Data/gender")

function mapRelationship(srcId, extId, srcDep, extDep) {
  const [, , , , , , srcRelationshipStatus] = srcDep

  if (
    [
      relationshipStatusValues.NA,
      relationshipStatusValues.SINGLE,
      relationshipStatusValues.WIDOWED,
    ].includes(srcRelationshipStatus)
  ) {
    return ["NA", undefined]
  }

  return [extId, srcId]
}

function agePasses(bigAge, smallAge) {
  if (smallAge > bigAge / 2 + 7) {
    return true
  }

  return getWeightedRandomValue([
    {
      value: false,
      weight: 3,
    },
    {
      value: true,
      weight: 1,
    },
  ])
}

function genderPasses(srcGender, extGender, srcOrientation, extOrientation) {
  if (srcOrientation === sexualOrientationValues.HETEROSEXUAL) {
    if (
      srcGender === genderValues.FEMALE &&
      extGender === genderValues.FEMALE
    ) {
      return false
    }

    if (srcGender === genderValues.MALE && extGender === genderValues.MALE) {
      return false
    }

    // Other takes both
  }

  if (srcOrientation === sexualOrientationValues.HOMOSEXUAL) {
    if (srcGender === genderValues.FEMALE && extGender === genderValues.MALE) {
      return false
    }

    if (srcGender === genderValues.MALE && extGender === genderValues.FEMALE) {
      return false
    }
  }

  // Other and bi take both

  if (extOrientation === sexualOrientationValues.HETEROSEXUAL) {
    if (
      extGender === genderValues.FEMALE &&
      srcGender === genderValues.FEMALE
    ) {
      return false
    }

    if (extGender === genderValues.MALE && srcGender === genderValues.MALE) {
      return false
    }

    // Other takes both
  }

  if (extOrientation === sexualOrientationValues.HOMOSEXUAL) {
    if (extGender === genderValues.FEMALE && srcGender === genderValues.MALE) {
      return false
    }

    if (extGender === genderValues.MALE && srcGender === genderValues.FEMALE) {
      return false
    }
  }

  // Other and bi take both

  return true
}

function alignmentPasses(srcGE, extGE, srcLC, extLC) {
  let matchScore = 0

  if (good.includes(srcGE)) {
    if (good.includes(extGE)) {
      matchScore += 4
    } else if (extGE === goodOrEvilValues.NEUTRAL) {
      matchScore += 2
    }
  } else if (srcGE === goodOrEvilValues.NEUTRAL) {
    if (extGE === goodOrEvilValues.NEUTRAL) {
      matchScore += 4
    } else {
      matchScore += 2
    }
  } else {
    if (evil.includes(extGE)) {
      matchScore += 4
    } else if (extGE === goodOrEvilValues.NEUTRAL) {
      matchScore += 2
    }
  }

  if (lawful.includes(srcLC)) {
    if (lawful.includes(extLC)) {
      matchScore += 4
    } else if (extLC === lawOrChaosValues.NEUTRAL) {
      matchScore += 2
    }
  } else if (srcLC === lawOrChaosValues.NEUTRAL) {
    if (extLC === lawOrChaosValues.NEUTRAL) {
      matchScore += 4
    } else {
      matchScore += 2
    }
  } else {
    if (chaotic.includes(extLC)) {
      matchScore += 4
    } else if (extLC === lawOrChaosValues.NEUTRAL) {
      matchScore += 2
    }
  }

  // Your more likely to match someone that shares your values
  return getWeightedRandomValue([
    { value: true, weight: matchScore },
    { value: false, weight: 8 - matchScore },
  ])
}

function filterRelationship(srcDependencyValues, extDependencyValues, extPartner) {
  const [srcGender, srcAge, srcOrientation, srcGE, srcLC, srcRace] =
    srcDependencyValues
  const [
    extGender,
    extAge,
    extOrientation,
    extGE,
    extLC,
    extRace,
    extRelationshipStatus,
  ] = extDependencyValues

  // Under 18 always has NA so we don't have to check it again
  if (
    [
      relationshipStatusValues.NA,
      relationshipStatusValues.SINGLE,
      relationshipStatusValues.WIDOWED,
    ].includes(extRelationshipStatus)
  ) {
    return false
  }

  if (extPartner) {
    return false
  }

  if (
    !agePasses(
      srcAge > extAge ? srcAge : extAge,
      srcAge > extAge ? extAge : srcAge
    )
  ) {
    return false
  }

  if (!genderPasses(srcGender, extGender, srcOrientation, extOrientation)) {
    return false
  }

  if (!alignmentPasses(srcGE, extGE, srcLC, extLC)) {
    return false
  }

  if (srcRace !== extRace) {
    // More likely to be with someone from your culture, needs some thought to make sure its appropriate
    if (
      !getWeightedRandomValue([
        { value: true, weight: 1 },
        { value: false, weight: 2 },
      ])
    ) {
      return false
    }
  }

  return true
}

module.exports = { filterRelationship, mapRelationship }
