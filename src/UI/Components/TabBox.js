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
  const [filters, setFilters] = React.useState([]);
  const addFilter = newFilter => {
    console.log(filters);
    setFilters([...filters, newFilter]);
  };
  const removeFilter = filter => {
    const newFilters = [...filters];
    const filterIndex = newFilters.findIndex(f => {
      return f.attr === filter.attr && f.value === filter.value;
    });
    if (filterIndex > -1) {
      newFilters.splice(filterIndex, 1);
      setFilters(newFilters);
    }
  };
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
  const filteredInstances = file ? file.filter(inst => {
    const groupedFilters = filters.reduce((acc, filter) => {
      if (!acc[filter.attr]) {
        acc[filter.attr] = [];
      }
      acc[filter.attr].push(filter.value);
      return acc;
    }, {});
    return Object.entries(groupedFilters).reduce((acc, [attr, values]) => {
      return acc && values.some(value => value === inst[attr]);
    }, true);
  }) : [];
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
      setFilters([]);
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
      setFilters([]);
    };
    return /*#__PURE__*/React.createElement("button", {
      key: name,
      onClick: getFile
    }, name);
  })), /*#__PURE__*/React.createElement(Filters, {
    file: file,
    addFilter: addFilter,
    removeFilter: removeFilter
  }), /*#__PURE__*/React.createElement(InstanceList, {
    instances: filteredInstances,
    fileName: fileName
  }))));
}
export { TabBox };