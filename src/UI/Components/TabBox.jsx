import { Build } from "./build.js"
import { BrowseTab } from "./Browse/browseTab.js"
import { ViewTab } from "./viewTab.js"

function TabBox() {
  const [activeTab, setActiveTab] = React.useState(0)
  // All the generated builds
  const [builds, setBuilds] = React.useState([])
  // The selected build
  const [build, setBuild] = React.useState()
  // List of all types
  const [typeFolders, setTypeFolders] = React.useState([])
  // The selected type
  const [typeName, setTypeName] = React.useState()
  // Filters applied to the instances
  const [filters, setFilters] = React.useState([])
  // All the instances for type
  const [instances, setInstances] = React.useState()

  // The selected instance
  const [instance, setInstance] = React.useState()

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
  const viewInstanceClasses = ["tb-tab", activeTab === 2 && "active"]
    .filter(Boolean)
    .join(" ")

  const setBuildActive = () => {
    setActiveTab(0)
  }

  const setViewActive = () => {
    setActiveTab(1)
  }

  const setInstanceActive = () => {
    setActiveTab(2)
  }

  return (
    <div>
      <div className="tb-tabs">
        <div className={buildTabClasses} onClick={setBuildActive}>
          Build
        </div>
        <div className={viewTabClasses} onClick={setViewActive}>
          Browse
        </div>
        <div className={viewInstanceClasses} onClick={setInstanceActive}>
          View
        </div>
      </div>
      <div className="tb-panel">
        {activeTab === 0 && <Build setBuilds={setBuilds} />}
        {activeTab === 1 && (
          <BrowseTab
            builds={builds}
            build={build}
            setBuild={setBuild}
            setInstance={setInstance}
            typeFolders={typeFolders}
            setTypeFolders={setTypeFolders}
            typeName={typeName}
            setTypeName={setTypeName}
            instances={instances}
            setInstances={setInstances}
            filters={filters}
            setFilters={setFilters}
          />
        )}
        {activeTab === 2 && <ViewTab instance={instance} />}
      </div>
    </div>
  )
}

export { TabBox }
