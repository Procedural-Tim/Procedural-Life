function TabBox() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [isCreating, setIsCreating] = React.useState(false);
  const [builds, setBuilds] = React.useState([]);
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
  }, activeTab === 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: createBuild,
    disabled: isCreating
  }, "Build")), activeTab === 1 && /*#__PURE__*/React.createElement("div", null, builds.map(build => /*#__PURE__*/React.createElement("button", null, build)))));
}
export { TabBox };