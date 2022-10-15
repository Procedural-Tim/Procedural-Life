const { getRandomValue } = require("../Static/functions")
const { getNewId } = require("./ids")
const {
  getTypeInstances,
  addTypeInstance,
  updateInstance,
} = require("./typeRegistry")

// Takes in the type definition from the config manifest and spits out a full set of instances
function generateType(configName, typeConfig) {
  const configPath = `../Configs/${configName}`
  const { type, instanceCount } = typeConfig
  console.log(`Generating type ${type}`)

  // Only the type should be exported, so we can safely grab the 0 entry
  const specification = Object.values(require(`${configPath}/Types/${type}`))[0]
  const props = Object.keys(specification)

  // TODO subtract any existing instances from the instance count
  for (let i = 0; i < instanceCount; i++) {
    createInstance(
      specification,
      {
        _id: getNewId(type),
      },
      props,
      type,
      configPath
    )
  }
}

function getExternalInstance(
  srcId,
  dependencies,
  externalDependency,
  configPath
) {
  const { type, filter, externalProp } = externalDependency
  const instances = filter
    ? getTypeInstances(type).filter((instance) =>
        filter(dependencies, instance)
      )
    : getTypeInstances(type)

  if (instances.length > 0) {
    // Since we can have N to 1 relationships we have to randomize which external type gets assigned
    // IE if we have 10 families, because we built our families first, and we always pick the first available family
    // it will favor families that are full, or empty
    const instance = getRandomValue(instances)
    updateInstance(type, {
      ...instance,
      [externalProp]: [...instance[externalProp], srcId],
    })

    return instance
  }

  // TODO: Move this up and out of the loops,
  // will probaly mean a scan for external dependencies before we start to require everything we need once instead of instance times
  const specification = Object.values(require(`${configPath}/Types/${type}`))[0]
  const props = Object.keys(specification)

  // NOTE: This assumes a newly created instance passes the filter
  // TODO: loop till the filter passes
  const newExternal = createInstance(
    specification,
    {
      _id: getNewId(type),
      [externalProp]: [srcId],
    },
    props,
    type,
    configPath
  )

  // TODO: Switch to id
  return newExternal
}

// Recursive function that mutates instance untill it reaches the end then
// returns the instance
function createInstance(
  specification,
  instance,
  oldUnsetProps,
  type,
  configPath
) {
  const newUnsetProps = [...oldUnsetProps]

  oldUnsetProps.forEach((prop) => {
    const { dependencies = [], externalDependency } = specification[prop]

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
      if (externalDependency) {
        instance[prop] = getExternalInstance(
          instance._id,
          dependencies,
          externalDependency,
          configPath
        )._id
      } else {
        instance[prop] = specification[prop].method(dependencyValues)
      }

      // Mutates
      newUnsetProps.splice(newUnsetProps.indexOf(prop), 1)
    }
  })

  // Infinite loop prevention
  if (newUnsetProps.length > 0 && newUnsetProps.length < oldUnsetProps.length) {
    return createInstance(
      specification,
      instance,
      newUnsetProps,
      type,
      configPath
    )
  }

  if (newUnsetProps.length > 0) {
    console.warn("Infinite loop detected with remaining props", newUnsetProps)
  }

  addTypeInstance(type, instance)
  return instance
}

module.exports = { generateType, createInstance }
