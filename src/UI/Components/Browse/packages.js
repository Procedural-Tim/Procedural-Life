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
  return /*#__PURE__*/ React.createElement(
    Section,
    {
      heading: "Built Packages",
    },
    builds.map((build) => {
      const getBuild = async () => {
        setBuild(build)
        setTypeFolders(await window.view.build(build))
        setTypeName()
        setInstances()
        setFilters([])
      }
      return /*#__PURE__*/ React.createElement(
        "button",
        {
          key: build,
          onClick: getBuild,
        },
        build
      )
    })
  )
}
export { Packages }
