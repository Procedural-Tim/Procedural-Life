// Singleton that holds all instances for each type
const types = {}

function initType(type) {
  if (!types[type]) {
    types[type] = []
  }
}

function addTypeInstance(type, instance) {
  initType(type)
  types[type].push(instance)
}

// TODO: Consider giving in and getting a library for deep clone and preventing accidental mutation.
function getTypeInstances(type) {
  initType(type)
  // The props in the instance are still mutable and still point back to the values in the registry.
  return [...types[type]]
}

function updateInstance(type, update) {
  types[type][
    types[type].findIndex((instance) => instance._id === update._id)
  ] = update
}

// Mutable, so be careful
function getAll() {
  return { ...types }
}

module.exports = { addTypeInstance, getTypeInstances, updateInstance, getAll }
