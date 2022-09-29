const fs = require('fs');
const { root, count } = require("./init");
const rootData = require(`../Nodes/${root}`);

function generate() {}

function start() {
  // Move all of this into a generate Node, then recurse on the nodes
  const rootNode = Object.values(rootData)[0]
  const rootNodeProps = Object.keys(rootNode)

  const data = new Array(count)
  const dataIsGenerated = new Array(count)

  for (i = 0; i < count; i++) {
    data[i] = {}
  }

  const initState = rootNodeProps.reduce((acc, prop) => {
    acc[prop] = false
    return acc
  }, {})

  for (i = 0; i < count; i++) {
    dataIsGenerated[i] = { ...initState }
  }

  data.forEach((instance, index) => {
    const instanceIsGenerated = dataIsGenerated[index]

    Object.entries(instanceIsGenerated).forEach(([key, isSet]) => {
      if (!isSet) {
        const { dependencies = [] } = rootNode[key]

        const dependenciesMet = dependencies.reduce((acc, depend) => {
          return acc && instanceIsGenerated[depend]
        }, true)

        if (dependenciesMet) {
          const dependencyValues = dependencies.map((dep) => {
            return instance[dep]
          })
          instance[key] = rootNode[key].method(dependencyValues)
          instanceIsGenerated[key] = true
        }
      }
    })
  })

  generateFile(data)
}

function generateFile(data) {
  const writeData = JSON.stringify(data, null, 2);

// TODO: is using where the console is, fix this
    fs.writeFile(`./Generated/${root}.json`, writeData, function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    });


}

module.exports = { start }
