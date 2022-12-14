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
  propSpec,
  configPath,
  srcProp,
  validExtInstances
) {
  const { externalType, externalProp, method, filter } = propSpec

  const externalSpec = Object.values(
    require(`${configPath}/Types/${externalType}/config.js`)
  )[0]

  const externalDependencies = externalSpec[externalProp].dependencies

  const filteredExternalInstances = filter
    ? validExtInstances.filter((extInstance) => {
        const extDependencyValues = externalDependencies.map(
          (dep) => extInstance[dep]
        )
        // Check the filter, also if this is a type referencing it's self then don't let the instance point back at its self.
        // IE the partner attribute
        return (
          filter(srcDependencyValues, extDependencyValues, extInstance[externalProp]) &&
          (srcType !== externalType || extInstance._id !== srcId)
        )
      })
    : validExtInstances

  if (filteredExternalInstances.length) {
    const targetInstance = getRandomValue(filteredExternalInstances)
    const extDependencyValues = externalDependencies.map(
      (dep) => targetInstance[dep]
    )
    const [srcValue, extValue] = method(
      srcId,
      targetInstance._id,
      srcDependencyValues,
      extDependencyValues,
      targetInstance[externalProp]
    )

    // If the external was a valid match, but for some reason the mapping function still doesn't use it.
    // This happens when choosing partners, since if the src is a child it can never have a partner even
    // if the filter rules say there are valid partners.
    if (extValue !== undefined) {
      targetInstance[externalProp] = extValue
      updateInstance(externalType, targetInstance)
    }

    return srcValue
  }

  const newExternalInstance = {
    _id: getNewId(externalType),
  }

  const setProps = Object.keys(newExternalInstance)
  // Special case where we have two instances of the same type referencing each other and we don't want infinite creation
  // IE person.partner
  if (srcType === externalType && srcProp === externalProp) {
    setProps.push(srcProp)
  }

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

  const updatedExtInstance = getTypeInstance(
    externalType,
    newExternalInstance._id
  )
  const extDependencyValues = externalDependencies.map(
    (dep) => updatedExtInstance[dep]
  )

  const [srcValue, extValue] = method(
    srcId,
    updatedExtInstance._id,
    srcDependencyValues,
    extDependencyValues,
    updatedExtInstance[externalProp]
  )
  updateInstance(externalType, {
    ...updatedExtInstance,
    [externalProp]: extValue,
  })

  return srcValue
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
      if (type === propTypes.EXTERNAL || type === propTypes.BIDIRECTIONAL) {
        const { externalType, externalProp } = propSpec
        const externalSpec = Object.values(
          require(`${configPath}/Types/${externalType}/config.js`)
        )[0]

        const externalPropSpec = externalSpec[externalProp]
        const externalInstances = getTypeInstances(externalType)
        const externalInstancesFiltered = externalInstances.filter(
          (inst) => {
            return externalPropSpec.dependencies.reduce((acc, depend) => {
              return acc && inst[depend] !== undefined
            }, true)
          }
        )

        const extDependenciesMet = !!externalInstancesFiltered.length

        if (extDependenciesMet || !externalInstances.length) {
          instance[prop] = getExternalDependency(
            srcType,
            instance._id,
            dependencyValues,
            propSpec,
            configPath,
            prop,
            externalInstancesFiltered
          )
        }
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
