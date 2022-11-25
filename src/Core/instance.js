const { getRandomValue } = require("../Static/functions.js")
const { propTypes, paramTypes } = require("../Static/constants.js")
const { getNewId } = require("./ids")
const {
  getTypeInstances,
  getTypeInstance,
  addTypeInstance,
  updateInstance,
} = require("./typeRegistry")

/**
 * Builds the initial empty types
 */
function initType(typeConfig) {
  const { type, instanceCount } = typeConfig
  console.log(`Initing type ${type}`)

  for (let i = 0; i < instanceCount; i++) {
    addTypeInstance(type, {
      _id: getNewId(type),
    })
  }
}

/**
 * Either add the src to an existing external dependency or get a new dependency add at it to the new one
 */
function getExternalDependency(
  srcType,
  srcId,
  srcDependencyValues,
  dependencies,
  propSpec,
  configPath
) {
  const { filter, externalType, externalProp } = propSpec
  const externalSpec = Object.values(
    require(`${configPath}/Types/${externalType}/config.js`)
  )[0]
  const externalPropSpec = externalSpec[externalProp]
  const externalInstances = getTypeInstances(externalType).filter(
    (instance) => {
      const currentSize = instance[externalProp]?.length ?? 0
      const maxSize =
        externalPropSpec.size instanceof Function
          ? externalPropSpec.size()
          : externalPropSpec.size

      return currentSize < maxSize
    }
  )

  const extInstances = filter
    ? externalInstances.filter((extInstance) => {
        const refInstances = (extInstance[externalProp] || []).map((id) =>
          getTypeInstance(srcType, id)
        )

        const refDepValues = refInstances.map((refInstance) =>
          dependencies.map((dep) => refInstance[dep])
        )

        return filter(srcDependencyValues, refDepValues)
      })
    : externalInstances

  if (extInstances.length) {
    const targetInstance = getRandomValue(extInstances)
    targetInstance[externalProp]
      ? targetInstance[externalProp].push(srcId)
      : (targetInstance[externalProp] = [srcId])
    updateInstance(externalType, targetInstance)
    return targetInstance._id
  }

  const newExternalInstance = {
    _id: getNewId(externalType),
    [externalProp]: [srcId],
  }

  const setProps = Object.keys(newExternalInstance)
  const unsetProps = Object.keys(externalSpec).filter(
    (specProp) => !setProps.includes(specProp)
  )

  addTypeInstance(externalType, newExternalInstance)
  procInstance(
    externalSpec,
    newExternalInstance,
    unsetProps,
    configPath,
    externalType
  )

  return newExternalInstance._id
}

/**
 * Recusrively runs through all of an instances props and attempts to populate them
 */
function procInstance(
  specification,
  instance,
  oldUnsetProps,
  configPath,
  srcType
) {
  const newUnsetProps = [...oldUnsetProps]

  oldUnsetProps.forEach((prop) => {
    const propSpec = specification[prop]
    const { dependencies = [], type } = propSpec

    // Provided props are never self determined
    if (type === propTypes.PROVIDED) {
      return
    }

    // If our updated list of unset props contains the prop then we fail
    // dependenciesMet and try the next prop
    const dependenciesMet = dependencies.reduce((acc, depend) => {
      return acc && !newUnsetProps.includes(depend)
    }, true)

    // Grab the instances value for that dependency
    const dependencyValues = dependencies.map((dep) => {
      return instance[dep]
    })

    if (dependenciesMet) {
      if (type === propTypes.EXTERNAL) {
        instance[prop] = getExternalDependency(
          srcType,
          instance._id,
          dependencyValues,
          dependencies,
          propSpec,
          configPath
        )
      } else {
        // While we check for specific types it only really matters for dependencies, the other types are to be
        // explicit so we know intent
        if (specification[prop].params) {
          const paramValues = specification[prop].params.map((param) => {
            if (param.type === paramTypes.DEP) {
              return dependencyValues
            }

            return param.value
          })

          instance[prop] = specification[prop].method(...paramValues)
        } else {
          // Handles the legacy case of defaulting to dependencies as the first parameter every time
          instance[prop] = specification[prop].method(dependencyValues)
        }
      }

      // Mutates
      newUnsetProps.splice(newUnsetProps.indexOf(prop), 1)
    }
  })

  // Infinite loop prevention
  if (newUnsetProps.length > 0 && newUnsetProps.length < oldUnsetProps.length) {
    return procInstance(
      specification,
      instance,
      newUnsetProps,
      configPath,
      srcType
    )
  }

  // TODO: Consider moving out so the function serves a single purpose and is more reusable
  updateInstance(srcType, {
    ...instance,
  })
}

module.exports = { initType, procInstance }
