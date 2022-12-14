const positivePrimaryColors = [
  {
    value: "red",
  },
  {
    value: "green",
  },
  {
    value: "blue",
  },
]

const positiveSecondaryColors = [
  {
    value: "magenta",
  },
  {
    value: "yellow",
  },
  {
    value: "cyan",
  },
]

const positiveTertiaryColors = [
  {
    value: "orange",
  },
  {
    value: "chartreuse",
  },
  {
    value: "spring green",
  },
  {
    value: "azure",
  },
  {
    value: "violet",
  },
  {
    value: "rose",
  },
]

const positiveColors = positivePrimaryColors
  .concat(positiveSecondaryColors)
  .concat(positiveTertiaryColors)

module.exports = { positiveColors }
