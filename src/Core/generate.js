const fs = require("fs")
const { copyFile } = require("fs/promises")
const { initType, procInstance } = require("./instance")
const { getAll } = require("./typeRegistry")
const coreManifest = require("./manifest")
const configName = coreManifest.config

const configPath = `../Configs/${configName}`
const configManifest = require(`${configPath}/manifest`)
const { types } = configManifest

// Turn this to true to generate the content into timestamped folders to prevent overriding
// TODO: Once we have a GUI make this a flag that users can set.
const useDateForWrite = true

function getSpecification(type) {
  return Object.values(
    require(`${configPath}/Types/${type}/config.js`)
  )[0]
}

function processTypes(typesAndData) {
  // Processing loop
  // For each type
  typesAndData.forEach(([type, data]) => {
    processType(type, data)
  })

  const partialTypesAndData = Object.entries(getAll()).reduce((acc, entry) => {
    const [ type, data ] = entry
    const specification = getSpecification(type)

    const reducedData = data.filter(instance => {
      const setProps = Object.keys(instance)
      // Only include data with specification props that are not set, 
      // we can't use length do to private props like _id throwing the count off.
      return Object.keys(specification).filter(
        (specProp) => !setProps.includes(specProp)
      ).length
    })

    if (reducedData.length) {
      acc.push([type, reducedData])
    }

    return acc
  },[])


  if (partialTypesAndData.length) {
    processTypes(partialTypesAndData)
  }
}
  

function processType(type, data) {
  console.log(`Processing ${type}`)

  // For each instance do a deep build
  data.forEach((instance) => {
    const specification = getSpecification(type)
    const setProps = Object.keys(instance)
    const unsetProps = Object.keys(specification).filter(
      (specProp) => !setProps.includes(specProp)
    )

    procInstance(specification, instance, unsetProps, configPath, type)
  })
}

function start() {
  console.log("starting")

  types.forEach(initType)
  processTypes(Object.entries(getAll()))

  writeBuild()

  return new Promise((resolve) => {
    // TODO: This is now not needed, change to a simple success?
    return resolve(getAll())
  })
}

/**
 * Saves the build to generated
 */
function writeBuild() {
  const currentDateTime = new Date().toISOString().split(":", 2).join("-")
  const dir = useDateForWrite
    ? `./Generated/${currentDateTime}`
    : "./Generated/"

  if (fs.existsSync(dir)) {
    fs.rmdir(dir, { recursive: true }, (err) => {
      if (err) {
        throw err
      }

      console.log(`${dir} deleted`)
    })
  }

  fs.mkdirSync(dir, { recursive: true })
  console.log(`${dir} created`)

  Object.entries(getAll()).forEach(([type, data]) => {
    const typeFolder = `${dir}/${type}`
    console.log("type folder", typeFolder)
    fs.mkdirSync(typeFolder)

    generateInstanceFile(typeFolder, data, type)
    copyFile(
      `./src/Configs/${configName}/Types/${type}/template.js`,
      `${typeFolder}/template.js`
    ).catch(console.warn)
    copyFile(
      `./src/Configs/${configName}/Types/${type}/config.js`,
      `${typeFolder}/config.js`
    ).catch(console.warn)
  })
}

/**
 *  Writes all the instances as json to the directory
 */
function generateInstanceFile(dir, data, type) {
  const writeData = JSON.stringify(data, null, 2)

  fs.writeFile(`${dir}/instances.json`, writeData, function (err) {
    if (err) throw err
    console.log(`File ${type} is created successfully.`)
  })
}

module.exports = { start }
