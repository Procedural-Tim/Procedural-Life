const fs = require("fs")
const path = require('node:path');
const coreManifest = require("./manifest")
const configPath = `../Configs/${coreManifest.config}`

const configManifest = require(`${configPath}/manifest`)
const { types } = configManifest
// TODO: Make a passed prop
const isDebug = false
const debugLogger = isDebug ? console.log : () => {}

// Takes in the type definition from the config manifest and spits out a full set of instances
function generateType(typeConfig) {
  const { type, instanceCount } = typeConfig
  debugLogger("generating type ", type)

  // Only the type should be exported, so we can safely grab the 0 entry
  const specification = Object.values(require(`${configPath}/Types/${type}`))[0]
  const props = Object.keys(specification)
  const instances = new Array(instanceCount)
  // Both fill and map were producing the exact same result for updateProps each
  // iteration.
  for (let i = 0; i < instanceCount; i++) {
    debugLogger("Creating instance ", i)
    instances[i] = generateProps(specification, {
      _id: i,
    }, props)
  }

  generateFile(instances, type)
}

// Recursive function that mutates instance untill it reaches the end then
// returns the instance
function generateProps(specification, instance, oldUnsetProps) {
  const newUnsetProps = [...oldUnsetProps]
  debugLogger("Attempting to set props", newUnsetProps)

  oldUnsetProps.forEach((prop) => {
    const { dependencies = [] } = specification[prop]
    debugLogger("Attempting to set prop", prop)

    // If our updated list of unset props contains the prop then we fail
    // dependenciesMet
    const dependenciesMet = dependencies.reduce((acc, depend) => {
      return acc && !newUnsetProps.includes(depend)
    }, true)

    if (dependenciesMet) {
      debugLogger("Dependencies met")
      // Grab the instances value for that dependency
      const dependencyValues = dependencies.map((dep) => {
        return instance[dep]
      })
      // Mutates
      instance[prop] = specification[prop].method(dependencyValues)
      debugLogger("Value set to", instance[prop])
      // Mutates
      newUnsetProps.splice(newUnsetProps.indexOf(prop), 1)
    }
  })

  // Infinite loop prevention
  if (newUnsetProps.length > 0 && newUnsetProps.length < oldUnsetProps.length) {
    return generateProps(specification, instance, newUnsetProps)
  }

  if (newUnsetProps.length > 0) {
    console.warn("Infinite loop detected with remaining props", newUnsetProps)
  }

  return instance
}

function start() {
  debugLogger("starting")
  types.map(generateType)
}

function generateFile(data, type) {
  debugLogger("Writing to file")
  const writeData = JSON.stringify(data, null, 2)
  const currentDateTime = new Date().toISOString().split(":",2).join("-");
  const dir = `./Generated/${currentDateTime}`;

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  // TODO: This is using where the bash console is, fix this
  fs.writeFile(`${dir}/${type}.json`, writeData, function (err) {
    if (err) throw err
    console.log(`File ${type} is created successfully.`)
  })
}

module.exports = { start }
