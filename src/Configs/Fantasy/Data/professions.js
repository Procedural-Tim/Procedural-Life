// More complicated static data since each value may have a set of stat requirements.

function getStatScore(stat) {
  switch (stat) {
    case 0:
    case 1:
      return -4
    case 2:
    case 3:
      return -3
    case 4:
    case 5:
      return -2
    case 6:
    case 7:
      return -1
    case 8:
    case 9:
      return 0
    case 10:
    case 11:
      return 1
    case 12:
    case 13:
      return 2
    case 14:
    case 15:
      return 3
    case 16:
    case 17:
      return 4
    case 18:
    case 19:
      return 5
    default:
      return 0
  }
}

// getQualificationLevel always takes (age, str, dex, con , cha, wis, int)
// Note: I have made some very rough guesses at the difficulty of getting
// certain jobs in the traditional medival period, but I am no historian and
// this is very subjective.
// +0 for hard, +1 per stat for normal, +2 per stat for easy.
const professions = [
  {
    title: "Butcher",
    getQualificationLevel: (age, str, dex) => {
      return getStatScore(str) + getStatScore(dex) + 2
    },
  },
  {
    title: "Miner",
    getQualificationLevel: (age, str, dex) => {
      return getStatScore(dex) + 2
    },
  },
  {
    title: "Farmer",
    getQualificationLevel: (age, str, dex, con, cha, wis, int) => {
      return (
        getStatScore(str) +
        getStatScore(dex) +
        getStatScore(con) +
        getStatScore(cha) +
        getStatScore(wis) +
        getStatScore(int) +
        12
      )
    },
  },
  {
    title: "Stone Carver",
    getQualificationLevel: (age, str, dex, con, cha, wis) => {
      return getStatScore(str) + getStatScore(dex) + getStatScore(wis) + 3
    },
  },
  {
    title: "Carpenter",
    getQualificationLevel: (age, str, dex, con, cha, wis) => {
      return getStatScore(dex) + getStatScore(wis) + 2
    },
  },
  {
    title: "Baker",
    getQualificationLevel: (age, str, dex, con) => {
      return getStatScore(con) + 2
    },
  },
  {
    title: "Stable Hand",
    getQualificationLevel: (age, str, dex, con, cha, wis) => {
      return getStatScore(cha) + getStatScore(wis) + 2
    },
  },
  {
    title: "Stable Master",
    getQualificationLevel: (age, str, dex, con, cha, wis) => {
      return age < 18 ? -4 : 0 + getStatScore(cha) + getStatScore(wis)
    },
  },
  {
    title: "Cook",
    getQualificationLevel: (age, str, dex, con, cha, wis) => {
      return getStatScore(dex) + getStatScore(wis) + 4
    },
  },
  {
    title: "Servant",
    getQualificationLevel: (age, str, dex, con, cha, wis) => {
      return getStatScore(cha) + getStatScore(wis) + 2
    },
  },
  {
    title: "Messenger",
    getQualificationLevel: (age, str, dex, con, cha) => {
      return age < 18 ? -2 : 0 + getStatScore(cha) + getStatScore(con)
    },
  },
  {
    title: "Fletcher",
    getQualificationLevel: (age, str, dex) => {
      return getStatScore(dex) + 1
    },
  },
  {
    title: "Bowyer",
    getQualificationLevel: (age, str, dex) => {
      return getStatScore(str) + getStatScore(dex) + 2
    },
  },
  {
    title: "Constable",
    getQualificationLevel: (age, str, dex, con, cha, wis, int) => {
      return age < 18
        ? -4
        : 0 + getStatScore(cha) + getStatScore(wis) + getStatScore(int) + 2
    },
  },
  {
    title: "Guard",
    getQualificationLevel: (age, str, dex) => {
      return age < 18 ? -1 : 0 + getStatScore(str) + getStatScore(dex) + 4
    },
  },
  {
    title: "Knight",
    getQualificationLevel: (age, str, dex, con, cha) => {
      return age < 18
        ? -4
        : 0 + getStatScore(str) + getStatScore(dex) + getStatScore(cha)
    },
  },
  {
    title: "Blacksmith",
    getQualificationLevel: (age, str, dex, con) => {
      return getStatScore(str) + getStatScore(dex) + getStatScore(con) + 3
    },
  },
  {
    title: "Innkeeper",
    getQualificationLevel: (age, str, dex, con, cha) => {
      return getStatScore(cha) + 1
    },
  },
  {
    title: "Merchant",
    getQualificationLevel: (age, str, dex, con, cha, wis, int) => {
      return getStatScore(cha) + getStatScore(int) + 2
    },
  },
  {
    title: "Scribe",
    getQualificationLevel: (age, str, dex, con, cha, wis, int) => {
      return getStatScore(int) + 1
    },
  },
  {
    title: "Apothecary",
    getQualificationLevel: (age, str, dex, con, cha, wis, int) => {
      return getStatScore(wis) + getStatScore(int) + 2
    },
  },
  {
    title: "Wheelwright",
    getQualificationLevel: (age, str, dex) => {
      return getStatScore(dex) + 2
    },
  },
  {
    title: "Shoemaker",
    getQualificationLevel: (age, str, dex) => {
      return getStatScore(dex) + 1
    },
  },
  {
    title: "Tanner",
    getQualificationLevel: (age, str, dex) => {
      return getStatScore(dex) + 1
    },
  },
  {
    title: "Clother",
    getQualificationLevel: (age, str, dex) => {
      return getStatScore(dex) + 1
    },
  },
  {
    title: "Laborer",
    getQualificationLevel: (age, str, dex, con) => {
      return getStatScore(str) + getStatScore(con)
    },
  },
  {
    title: "Candlemaker",
    getQualificationLevel: (age, str, dex) => {
      return getStatScore(dex) + 1
    },
  },
]

module.exports = { professions }
