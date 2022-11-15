import { Section } from "../section.js";
function InstanceList(props) {
  const {
    instances,
    typeName,
    setInstance
  } = props;
  const heading = typeName && `${typeName}s`;
  if (!instances || !instances.length) {
    return /*#__PURE__*/React.createElement(Section, {
      heading: heading
    });
  }
  const attributes = Object.entries(instances[0]).filter(([key, value]) => {
    return typeof value !== "object";
  }).map(([key]) => key);
  const openInstance = () => {
    console.log("open instance");
  };
  return /*#__PURE__*/React.createElement(Section, {
    heading: heading
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    key: "heading"
  }, attributes.map(attr => /*#__PURE__*/React.createElement("td", {
    key: attr
  }, attr)))), /*#__PURE__*/React.createElement("tbody", null, instances.map(instance => {
    const onClick = () => {
      setInstance(instance._id);
    };
    return /*#__PURE__*/React.createElement("tr", {
      key: instance._id,
      onClick: onClick
    }, attributes.map(attr => /*#__PURE__*/React.createElement("td", {
      key: `${instance._id}-${attr}`
    }, instance[attr])));
  }))));
}
export { InstanceList };