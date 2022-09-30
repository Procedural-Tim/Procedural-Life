// More complicated static data since each value may have a set of stat requirements.
const town = [
  {
    value: "Butcher",
    requires: {
        str: 8,
        dex: 8,
        int: 8,
      }
  },
  {
    value: "Miner",
    requires: {
        str: 8,
      }
  },
  {
    value: "Farmer",
  },
  {
    value: "Stone Carver",
    requires: {
        str: 8,
        dex: 8,
        int: 8,
      }
  },
  {
    value: "Carpenter",
    requires: {
        dex: 10,
        int: 8,
      }
  },
  {
    value: "Baker"
  }
];

const castle = [
  {
    value: "Stable Master",
    requires: {
      wis: 8,
      cha: 8,
    }
  },
  {
    value: "Cook",
    requires: {
      wis: 8,
      dex: 8,
    }
  },
  {
    value: "Servant",
    requires: {
      wis: 8,
      cha: 8,
    }
  },
  {
    value: "Messenger",
    requires: {
      cha: 12,
    }
  }
]

module.exports = { town, castle };
