const { getRandomInt, getRandomValue, getWeightedRandomValue } = require("../Static/functions")
const { maleNames, femaleNames, lastNames } = require("../Static/names")
const { town, castle } = require("../Static/professions")

const Male = "M"
const Female = "F"
const sex = [Male, Female]

function getSex() {
  return getRandomValue(sex)
}

function getFirstName(dependencies) {
  const [sex] = dependencies;
  if (sex === Male) {
    return getRandomValue(maleNames);
  }

  return getRandomValue(femaleNames);
}

function roleStat() {
  return getRandomInt(1,6)+getRandomInt(1,6)+getRandomInt(1,6);
}

function getAge() {
  const ages = new Array();
  // Crude way of favoring earlier ages
  for (i=0; i<100; i++) {
    if (i<20) {
      ages.push({
        value: i,
        weight: 5,
      })
    } else if (i<40) {
      ages.push({
        value: i,
        weight: 4,
      })
    } else if (i<60) {
      ages.push({
        value: i,
        weight: 3,
      })
    } else if (i<80) {
      ages.push({
        value: i,
        weight: 2,
      })
    } else {
      ages.push({
        value: i,
        weight: 1,
      })
    }
  }

  return getWeightedRandomValue(ages)
}

function getLastName() {
  return getRandomValue(lastNames);
}

function getProfession(deps) {
  const [age,str,dex,con,cha,wis,int] = deps;

  if (age < 13) {
    return "Child";
  }

  const prof = getRandomValue(town.concat(castle).filter(job => {
    return true;
  }));

  if (age < 18) {
    return `Apprentice ${prof.value}`
  }

  return prof.value;
}

// Our first type, it is meant to represent an npc
const person = {
  sex: {
    method: getSex,
  },
  firstName: {
    method: getFirstName,
    // Can not be excuted till this property has been Generated
    // Dependencies are passed as the first parameter to functions
    dependencies: ["sex"],
  },
  lastName: {
    method: getLastName,
  },
  age: {
    method: getAge,
  },
  profession: {
    method: getProfession,
    dependencies: ["age","str","dex","con","cha","wis","int"],
  },
  str: {
    method: roleStat,
  },
  dex: {
    method: roleStat,
  },
  con: {
    method: roleStat,
  },
  cha: {
    method: roleStat,
  },
  wis: {
    method: roleStat,
  },
  int: {
    method: roleStat,
  },
}

module.exports = { person }
