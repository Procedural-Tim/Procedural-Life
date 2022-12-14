const { getWeightedRandomValue } = require("../../../Static/functions")
const { topLevelValues } = require("../Types/Association/Methods/focus")
const { goodOrEvilValues, lawOrChaosValues, good, evil, lawful, chaotic} = require("../Data/alignments")

function politicsCheck(goodOrEvil, lawOrChaos, focus) {
    let polScore = 0;
    const focusSubGoodEvil = focus.subLevel[0]
    const focusSubLawOrChaos = focus.subLevel[1]

    if (focusSubGoodEvil === goodOrEvilValues.G2) {
        if (good.includes(goodOrEvil)) {
            polScore += 4
        } else if (goodOrEvil === goodOrEvilValues.NEUTRAL) {
            polScore += 2
        }
    }

    if (focusSubGoodEvil === goodOrEvilValues.NEUTRAL) {
        if (goodOrEvil === goodOrEvilValues.NEUTRAL) {
            polScore += 4
        } else {
            polScore +=2
        }
    }

    if (focusSubGoodEvil === goodOrEvilValues.E2) {
        if (evil.includes(goodOrEvil)) {
            polScore += 4
        } else if (goodOrEvil === goodOrEvilValues.NEUTRAL) {
            polScore += 2
        }
    }

    if (focusSubLawOrChaos === lawOrChaos.L2) {
        if (lawful.includes(lawOrChaos)) {
            polScore += 4
        } else if (lawOrChaos === lawOrChaosValues.NEUTRAL) {
            polScore += 2
        }
    }

    if (focusSubLawOrChaos === lawOrChaosValues.NEUTRAL) {
        if (lawOrChaos === lawOrChaosValues.NEUTRAL) {
            polScore += 4
        } else {
            polScore +=2
        }
    }

    if (focusSubLawOrChaos === lawOrChaosValues.E2) {
        if (chaotic.includes(lawOrChaos)) {
            polScore += 4
        } else if (goodOrEvil === lawOrChaosValues.NEUTRAL) {
            polScore += 2
        }
    }

    return getWeightedRandomValue([{value: false, weight: 8 - polScore}, {value: true, weight: polScore}])
}

function filterRelationship(srcDep, extDep, assocMembers = []) {
    const [goodOrEvil, lawOrChaos] = srcDep
    const [focus, maxSize] = extDep

    if (assocMembers.length >= maxSize) {
        return false
    }

    if (focus.topLevel === topLevelValues.POLITICS) {
        if (!politicsCheck(goodOrEvil, lawOrChaos, focus)) {
            return false
        }
    }
    
    return true
}

function mapRelationship(srcId, extId, srcDep, extDep, assocMembers = []) {
    return [extId, [...assocMembers, srcId]]
}

module.exports = { filterRelationship, mapRelationship }
