const { positiveColors } = require("./colors")
const { descAdjectives } = require("./descriptive-adjectives")
const { moods } = require("./moods")
const { nouns } = require("./nouns")
const { associationTypes } = require("./association-type")

const adjs = positiveColors.concat(descAdjectives).concat(moods)
const adjAssocTypes = adjs.reduce((acc, adj) => {
  return acc.concat(
    associationTypes.map((type) => {
      return {
        value: `${adj.value} ${type.value}`,
      }
    })
  )
}, [])

const adjNouns = adjs.reduce((acc, adj) => {
  return acc.concat(
    nouns.map((noun) => {
      return {
        value: `${adj.value} ${noun.value}`,
      }
    })
  )
}, [])

const adjNounAssocTypes = adjNouns.reduce((acc, adjNoun) => {
  return acc.concat(
    associationTypes.map((type) => {
      return {
        value: `${adjNoun.value} ${type.value}`,
      }
    })
  )
}, [])

const associationNames = adjNounAssocTypes
  .concat(adjNouns)
  .concat(adjAssocTypes)

module.exports = { associationNames }
