import { Section } from "../section.js";
export function TypeList(props) {
  const {
    typeFolders,
    setTypeName,
    setInstances,
    build,
    setFilters
  } = props;
  return /*#__PURE__*/React.createElement(Section, {
    heading: "Types"
  }, typeFolders.map(folderName => {
    const getFile = async () => {
      setTypeName(folderName);
      setInstances(await window.view.instances(build, folderName));
      setFilters([]);
    };
    return /*#__PURE__*/React.createElement("button", {
      key: folderName,
      onClick: getFile
    }, folderName);
  }));
}