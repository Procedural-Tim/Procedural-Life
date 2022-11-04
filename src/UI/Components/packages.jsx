import { Section } from "./section.js"

function Packages(props) {
  const { builds, setBuild, setBuildFiles, setFileName, setFile, setFilters } =
    props

  return (
    <Section heading="Built Packages">
      {builds.map((build) => {
        const getBuild = async () => {
          setBuild(build)
          setBuildFiles(await window.view.build(build))
          setFileName()
          setFile()
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
