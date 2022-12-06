const sexValues = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
}

const sexes = [
  {
    value: sexValues.MALE,
    weight: 49,
  },
  {
    value: sexValues.FEMALE,
    weight: 50,
  },
  {
    value: sexValues.other,
    weight: 1, // More wild guessing at statistics
  },
]

module.exports = { sexes, sexValues }
