import { Section } from "./section.js"
import { Filters } from "./filters.js"
import { InstanceList } from "./instanceList.js"

function TabBox() {
  const [activeTab, setActiveTab] = React.useState(0)
  const [isCreating, setIsCreating] = React.useState(false)
  const [builds, setBuilds] = React.useState([])
  const [build, setBuild] = React.useState()
  const [buildFiles, setBuildFiles] = React.useState([])
  const [fileName, setFileName] = React.useState()
  const [file, setFile] = React.useState()

  React.useEffect(() => {
    async function fetchData() {
      setBuilds(await window.view.builds())
    }
    fetchData()
  }, [])

  const buildTabClasses = ["tb-tab", activeTab === 0 && "active"]
    .filter(Boolean)
    .join(" ")
  const viewTabClasses = ["tb-tab", activeTab === 1 && "active"]
    .filter(Boolean)
    .join(" ")

  const setBuildActive = () => {
    setActiveTab(0)
  }

  const setViewActive = () => {
    setActiveTab(1)
  }

  const createBuild = async () => {
    setIsCreating(true)
    await window.build.run()
    setIsCreating(false)

    const serverBuilds = await window.view.builds()
    setBuilds(serverBuilds)
  }

  return (
    <div>
      <div className="tb-tabs">
        <div className={buildTabClasses} onClick={setBuildActive}>
          Build
        </div>
        <div className={viewTabClasses} onClick={setViewActive}>
          View
        </div>
      </div>
      <div className="tb-panel">
        {activeTab === 0 && (
          <Section>
            <button onClick={createBuild} disabled={isCreating}>
              Build
            </button>
          </Section>
        )}
        {activeTab === 1 && (
          <div>
            <Section heading="Built Packages">
              {builds.map((build) => {
                const getBuild = async () => {
                  setBuild(build)
                  setBuildFiles(await window.view.build(build))
                  setFileName()
                  setFile()
                }
                return (
                  <button key={build} onClick={getBuild}>
                    {build}
                  </button>
                )
              })}
            </Section>
            <Section heading="Types">
              {buildFiles.map((fileName) => {
                const name = fileName.split(".json")[0]
                const getFile = async () => {
                  setFileName(fileName)
                  setFile(await window.view.file(build, fileName))
                }

                return (
                  <button key={name} onClick={getFile}>
                    {name}
                  </button>
                )
              })}
            </Section>
            <Filters file={file} />
            <InstanceList instances={file} fileName={fileName} />
          </div>
        )}
      </div>
    </div>
  )
}

export { TabBox }
