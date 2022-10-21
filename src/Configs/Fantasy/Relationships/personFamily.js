const { getRandomInt } = require("../../../Static/functions")

function personToFamilyFilter(srcDependencyValues, refDepValues = []) {
  const [srcAge, srcRace] = srcDependencyValues

  const refAges = refDepValues.map((ref) => ref[0])
  const refRaces = refDepValues.map((ref) => ref[1])

  const inAgeBracketCount = refAges.filter(
    (refAge) => Math.abs(refAge - srcAge) < 20
  ).length

  const agePass =
    srcAge < 20 || inAgeBracketCount < 2 || getRandomInt(1, 10) > 8
  const racePass =
    refRaces.some((refRace) => refRace === srcRace) || getRandomInt(1, 10) > 5

  return agePass && racePass
}

module.exports = { personToFamilyFilter }
