import { Section } from "./section.js"
import { Packages } from "./packages.js"
import { Filters } from "./filters.js"
import { InstanceList } from "./instanceList.js"

export function BrowseTab(props) {
  const { builds, setInstance } = props

  const [buildFiles, setBuildFiles] = React.useState([])
  const [build, setBuild] = React.useState()
  const [fileName, setFileName] = React.useState()
  const [file, setFile] = React.useState()
  const [filters, setFilters] = React.useState([])

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

  const filteredInstances = file
    ? file.filter((inst) => {
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
          setBuildFiles={setBuildFiles}
          setFileName={setFileName}
          setFile={setFile}
          setFilters={setFilters}
        />
        <Section heading="Types">
          {buildFiles.map((fileName) => {
            const name = fileName.split(".json")[0]
            const getFile = async () => {
              setFileName(fileName)
              setFile(await window.view.file(build, fileName))
              setFilters([])
            }

            return (
              <button key={name} onClick={getFile}>
                {name}
              </button>
            )
          })}
        </Section>
        <Filters
          data={file}
          addFilter={addFilter}
          removeFilter={removeFilter}
          filters={filters}
        />
        <InstanceList
          instances={filteredInstances}
          fileName={fileName}
          setInstance={setInstance}
        />
      </div>
    </>
  )
}