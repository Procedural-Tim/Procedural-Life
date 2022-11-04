import { Build } from "./build.js"
import { BrowseTab } from "./browseTab.js"
import { ViewTab } from "./viewTab.js"

function TabBox() {
  const [activeTab, setActiveTab] = React.useState(0)
  const [builds, setBuilds] = React.useState([])
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
          <BrowseTab builds={builds} setInstance={setInstance} />
        )}
        {activeTab === 2 && <ViewTab instance={instance} />}
      </div>
    </div>
  )
}

export { TabBox }
