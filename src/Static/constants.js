const propTypes = {
  // default not included
  EXTERNAL: "external", // TODO: Need a better name
  BIDIRECTIONAL: "bi",
  PROVIDED: "provided",
}

const paramTypes = {
  DEP: "dependencies",
  DATA: "dataSource",
  LITERAL: "literal",
}

module.exports = { propTypes, paramTypes }
