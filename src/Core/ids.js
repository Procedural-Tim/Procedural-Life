const ids = {}

function getNewId(type) {
  if (!ids[type]) {
    ids[type] = 0
  }
  return ids[type]++
}

module.exports = { getNewId }
