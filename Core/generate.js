const fs = require("fs")
const { root, count } = require("./init")
const rootData = require(`../Nodes/${root}`)

function generate() {}

/**
 * For a single instance, update it's props. Mutates instance.
 * TODO: Look into not mutating the instance.
 *
 * rootNode: The original configure
 * instance: the node instance we are currently working on
 * unsetProps: An array of the keys for each unset prop
 */
function updateProps(rootNode, instance, oldUnsetProps) {
  const newUnsetProps = [...oldUnsetProps];

  oldUnsetProps.forEach((prop) => {
      const { dependencies = [] } = rootNode[prop]

      const dependenciesMet = dependencies.reduce((acc, depend) => {
        return acc && !newUnsetProps.includes(depend);
      }, true)

      if (dependenciesMet) {
        const dependencyValues = dependencies.map((dep) => {
          return instance[dep];
        });
        instance[prop] = rootNode[prop].method(dependencyValues);
        // mutates
        newUnsetProps.splice(newUnsetProps.indexOf(prop), 1);
      }
  });

  if (newUnsetProps.length > 0 && newUnsetProps.length < oldUnsetProps.length) {
    return updateProps(rootNode, instance, newUnsetProps);
  }
}

function start() {
  // TODO: Break this into single purpose functions
  // The original config
  const rootNode = Object.values(rootData)[0];
  // All of the nodes possible props
  const rootNodeProps = Object.keys(rootNode)

  // Holds all the instances and their generated data
  const data = new Array(count)

  for (i = 0; i < count; i++) {
    data[i] = {}
  }

  data.forEach((instance, index) => {
    updateProps(rootNode, instance, rootNodeProps);
  })

  generateFile(data)
}

function generateFile(data) {
  const writeData = JSON.stringify(data, null, 2)

  // TODO: is using where the console is, fix this
  fs.writeFile(`./Generated/${root}.json`, writeData, function (err) {
    if (err) throw err
    console.log("File is created successfully.")
  })
}

module.exports = { start }
