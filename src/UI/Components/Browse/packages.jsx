import { Section } from "../section.js"

function Packages(props) {
  const {
    builds,
    setBuild,
    setTypeFolders,
    setTypeName,
    setInstances,
    setFilters,
  } = props

  return (
    <Section heading="Built Packages">
      {builds.map((build) => {
        const getBuild = async () => {
          setBuild(build)
          setTypeFolders(await window.view.build(build))
          setTypeName()
          setInstances()
          setFilters([])
        }
        return (
          <button key={build} onClick={getBuild}>
            {build}
          </button>
        )
      })}
    </Section>
  )
}

export { Packages }
