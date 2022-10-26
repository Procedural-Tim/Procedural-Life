import { Section } from "./section.js";
import { Filters } from "./filters.js";
import { InstanceList } from "./instanceList.js";
function TabBox() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [isCreating, setIsCreating] = React.useState(false);
  const [builds, setBuilds] = React.useState([]);
  const [build, setBuild] = React.useState();
  const [buildFiles, setBuildFiles] = React.useState([]);
  const [fileName, setFileName] = React.useState();
  const [file, setFile] = React.useState();
  React.useEffect(() => {
    async function fetchData() {
      setBuilds(await window.view.builds());
    }
    fetchData();
  }, []);
  const buildTabClasses = ["tb-tab", activeTab === 0 && "active"].filter(Boolean).join(" ");
  const viewTabClasses = ["tb-tab", activeTab === 1 && "active"].filter(Boolean).join(" ");
  const setBuildActive = () => {
    setActiveTab(0);
  };
  const setViewActive = () => {
    setActiveTab(1);
  };
  const createBuild = async () => {
    setIsCreating(true);
    await window.build.run();
    setIsCreating(false);
    const serverBuilds = await window.view.builds();
    setBuilds(serverBuilds);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "tb-tabs"
  }, /*#__PURE__*/React.createElement("div", {
    className: buildTabClasses,
    onClick: setBuildActive
  }, "Build"), /*#__PURE__*/React.createElement("div", {
    className: viewTabClasses,
    onClick: setViewActive
  }, "View")), /*#__PURE__*/React.createElement("div", {
    className: "tb-panel"
  }, activeTab === 0 && /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("button", {
    onClick: createBuild,
    disabled: isCreating
  }, "Build")), activeTab === 1 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    heading: "Built Packages"
  }, builds.map(build => {
    const getBuild = async () => {
      setBuild(build);
      setBuildFiles(await window.view.build(build));
      setFileName();
      setFile();
    };
    return /*#__PURE__*/React.createElement("button", {
      key: build,
      onClick: getBuild
    }, build);
  })), /*#__PURE__*/React.createElement(Section, {
    heading: "Types"
  }, buildFiles.map(fileName => {
    const name = fileName.split(".json")[0];
    const getFile = async () => {
      setFileName(fileName);
      setFile(await window.view.file(build, fileName));
    };
    return /*#__PURE__*/React.createElement("button", {
      key: name,
      onClick: getFile
    }, name);
  })), /*#__PURE__*/React.createElement(Filters, {
    file: file
  }), /*#__PURE__*/React.createElement(InstanceList, {
    instances: file,
    fileName: fileName
  }))));
}
export { TabBox };