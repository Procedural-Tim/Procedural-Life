const fs = require("fs")
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

function start() {
  console.log("starting")

  types.forEach(initType)

  // Processing loop
  Object.entries(getAll()).forEach(([type, data]) => {
    console.log(`Processing ${type}`)
    data.forEach((instance) => {
      const specification = Object.values(
        require(`${configPath}/Types/${type}`)
      )[0]
      const setProps = Object.keys(instance)
      const unsetProps = Object.keys(specification).filter(
        (specProp) => !setProps.includes(specProp)
      )

      procInstance(specification, instance, unsetProps, configPath, type)
    })
  })

  Object.entries(getAll()).forEach(([type, data]) => generateFile(data, type))

  return new Promise((resolve) => {
    resolve(getAll())
  })
}

function generateFile(data, type) {
  console.log("writing to file")
  const writeData = JSON.stringify(data, null, 2)
  const currentDateTime = new Date().toISOString().split(":", 2).join("-")
  const dir = useDateForWrite
    ? `./Generated/${currentDateTime}`
    : "./Generated/"

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // TODO: This is using where the bash console is, fix this
  fs.writeFile(`${dir}/${type}.json`, writeData, function (err) {
    if (err) throw err
    console.log(`File ${type} is created successfully.`)
  })
}

module.exports = { start }
