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
  const setBrowseActive = () => {
    setActiveTab(1)
  }
  const setViewActive = () => {
    setActiveTab(2)
  }
  const goToInstance = (instance) => {
    setInstance(instance)
    setViewActive()
  }
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "tb-tabs",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: buildTabClasses,
          onClick: setBuildActive,
        },
        "Build"
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: viewTabClasses,
          onClick: setBrowseActive,
        },
        "Browse"
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: viewInstanceClasses,
          onClick: setViewActive,
        },
        "View"
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "tb-panel",
      },
      activeTab === 0 &&
        /*#__PURE__*/ React.createElement(Build, {
          setBuilds: setBuilds,
        }),
      activeTab === 1 &&
        /*#__PURE__*/ React.createElement(BrowseTab, {
          builds: builds,
          build: build,
          setBuild: setBuild,
          typeFolders: typeFolders,
          setTypeFolders: setTypeFolders,
          typeName: typeName,
          setTypeName: setTypeName,
          instances: instances,
          setInstances: setInstances,
          filters: filters,
          setFilters: setFilters,
          goToInstance: goToInstance,
        }),
      activeTab === 2 &&
        /*#__PURE__*/ React.createElement(ViewTab, {
          instance: instance,
          typeName: typeName,
          build: build,
        })
    )
  )
}
export { TabBox }
