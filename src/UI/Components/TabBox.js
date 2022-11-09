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
          onClick: setViewActive,
        },
        "Browse"
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: viewInstanceClasses,
          onClick: setInstanceActive,
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
          setInstance: setInstance,
        }),
      activeTab === 2 &&
        /*#__PURE__*/ React.createElement(ViewTab, {
          instance: instance,
        })
    )
  )
}
export { TabBox }
