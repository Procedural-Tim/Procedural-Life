import { Section } from "./section.js"

function Filter(props) {
  const { name, values, addFilter, removeFilter, filters } = props
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  const addPositiveFilter = (value) => {
    addFilter({
      attr: name,
      value,
      type: "positive",
    })
  }

  const remFilter = (value) => {
    removeFilter({
      attr: name,
      value,
    })
  }

  const filterIsActive = Object.entries(values).some(([value, count]) => {
    return filters.some((filter) => {
      return filter.attr === name && filter.value === value
    })
  })

  const filterClasses = ["filter"]
  if (isOpen) {
    filterClasses.push("filter-open")
  }
  if (filterIsActive) {
    filterClasses.push("filter-active")
  }

  return (
    <div className={filterClasses.join(" ")} key={name} onClick={toggleOpen}>
      <div>{name}</div>
      <div className="facets">
        {isOpen &&
          Object.entries(values).map(([value, count]) => {
            const isActive = filters.some((filter) => {
              return filter.attr === name && filter.value === value
            })

            const facetClasses = []
            if (isActive) {
              facetClasses.push("facet-active")
            }

            const onClick = (evt) => {
              evt.stopPropagation()
              isActive ? remFilter(value) : addPositiveFilter(value)
            }

            return (
              <button
                key={value}
                onClick={onClick}
                className={facetClasses.join(" ")}
              >
                {value} ({count})
              </button>
            )
          })}
      </div>
    </div>
  )
}

function Filters(props) {
  const { data = [{}], addFilter, removeFilter, filters } = props

  // Loop through all instances, extracting out each attribute, each attributes possibly values, and how many times said value occures
  const attributes = data.reduce((acc, inst) => {
    Object.entries(inst).forEach(([attr, value]) => {
      if (typeof value === "object") {
        return acc
      }

      if (!acc[attr]) {
        acc[attr] = []
      }

      if (!acc[attr][value]) {
        acc[attr][value] = 0
      }

      acc[attr][value]++
    })

    return acc
  }, {})

  return (
    <Section heading="Filters">
      {Object.entries(attributes).map(([name, valueSet]) => (
        <Filter
          name={name}
          values={valueSet}
          key={name}
          addFilter={addFilter}
          removeFilter={removeFilter}
          filters={filters}
        />
      ))}
    </Section>
  )
}

export { Filters }
