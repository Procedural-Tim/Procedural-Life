import { Packages } from "./packages.js"
import { TypeList } from "./typeList.js"
import { Filters } from "./filters.js"
import { InstanceList } from "./instanceList.js"

export function BrowseTab(props) {
  const {
    builds,
    build,
    setBuild,
    setInstance,
    typeFolders,
    setTypeFolders,
    typeName,
    setTypeName,
    instances,
    setInstances,
    filters,
    setFilters,
  } = props

  const addFilter = (newFilter) => {
    setFilters([...filters, newFilter])
  }

  const removeFilter = (filter) => {
    const newFilters = [...filters]

    const filterIndex = newFilters.findIndex((f) => {
      return f.attr === filter.attr && f.value === filter.value
    })

    if (filterIndex > -1) {
      newFilters.splice(filterIndex, 1)
      setFilters(newFilters)
    }
  }

  const filteredInstances = instances
    ? instances.filter((inst) => {
        // When you have multiple filters on the same attribute
        const groupedFilters = filters.reduce((acc, filter) => {
          if (!acc[filter.attr]) {
            acc[filter.attr] = []
          }

          acc[filter.attr].push(filter.value)
          return acc
        }, {})

        return Object.entries(groupedFilters).reduce((acc, [attr, values]) => {
          return (
            acc &&
            values.some((value) => {
              // Deliberate use of ==
              return value == inst[attr]
            })
          )
        }, true)
      })
    : []

  return (
    <>
      <div>
        <Packages
          builds={builds}
          setBuild={setBuild}
          setTypeFolders={setTypeFolders}
          setTypeName={setTypeName}
          setInstances={setInstances}
          setFilters={setFilters}
        />
        <TypeList
          typeFolders={typeFolders}
          setTypeName={setTypeName}
          setInstances={setInstances}
          build={build}
          setFilters={setFilters}
        />
        <Filters
          data={instances}
          addFilter={addFilter}
          removeFilter={removeFilter}
          filters={filters}
        />
        <InstanceList
          instances={filteredInstances}
          typeName={typeName}
          setInstance={setInstance}
        />
      </div>
    </>
  )
}
