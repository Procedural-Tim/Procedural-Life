import { Section } from "./section.js";
function Packages(props) {
  const {
    builds,
    setBuild,
    setBuildFiles,
    setFileName,
    setFile,
    setFilters
  } = props;
  return /*#__PURE__*/React.createElement(Section, {
    heading: "Built Packages"
  }, builds.map(build => {
    const getBuild = async () => {
      setBuild(build);
      setBuildFiles(await window.view.build(build));
      setFileName();
      setFile();
      setFilters([]);
    };
    return /*#__PURE__*/React.createElement("button", {
      key: build,
      onClick: getBuild
    }, build);
  }));
}
export { Packages };