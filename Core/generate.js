const fs = require("fs")
const coreManifest = require("./manifest")
const configPath = `../Configs/${coreManifest.config}`

const configManifest = require(`${configPath}/manifest`)
const { types } = configManifest
// const rootData = require(`../Nodes/${root}`)

// Takes in the type definition from the config manifest and spits out a full set of instances
function generateType(typeConfig) {
  const { type, instanceCount } = typeConfig

  // Only the type should be exported, so we can safely grab the 0 entry
  const specification = Object.values(require(`${configPath}/Types/${type}`))[0]
  const props = Object.keys(specification)
  const instances = new Array(instanceCount);
  // Both fill and map were producing the exact same result for updateProps each
  // iteration.
  for (i=0; i<instanceCount; i++) {
    instances[i] = updateProps(specification, {}, props);
  }

  generateFile(
    instances,
    type
  )
}

// Recursive function that mutates instance untill it reaches the end then
// returns the instance
function updateProps(specification, instance, oldUnsetProps) {
  const newUnsetProps = [...oldUnsetProps]

  oldUnsetProps.forEach((prop) => {
    const { dependencies = [] } = specification[prop]

    // If our updated list of unset props contains the prop then we fail
    // dependenciesMet
    const dependenciesMet = dependencies.reduce((acc, depend) => {
      return acc && !newUnsetProps.includes(depend)
    }, true)

    if (dependenciesMet) {
      // Grab the instances value for that dependency
      const dependencyValues = dependencies.map((dep) => {
        return instance[dep]
      })
      // Mutates
      instance[prop] = specification[prop].method(dependencyValues)
      // Mutates
      newUnsetProps.splice(newUnsetProps.indexOf(prop), 1)
    }
  })

  // Infinite loop prevention
  if (newUnsetProps.length > 0 && newUnsetProps.length < oldUnsetProps.length) {
    return updateProps(specification, instance, newUnsetProps)
  }

  if (newUnsetProps.length > 0) {
    console.warn("Infinite loop detected with remaining props", newUnsetProps)
  }

  return instance
}

function start() {
  types.map(generateType)
}

function generateFile(data, type) {
  const writeData = JSON.stringify(data, null, 2)

  // TODO: is using where the console is, fix this
  fs.writeFile(`./Generated/${type}.json`, writeData, function (err) {
    if (err) throw err
    console.log(`File ${type} is created successfully.`)
  })
}

module.exports = { start }
