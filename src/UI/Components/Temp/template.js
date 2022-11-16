export function Base(props) {
  const {
    instance,
    typeName,
    build
  } = props;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", null, instance.firstName), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, instance.gender), /*#__PURE__*/React.createElement("span", null, instance.race)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, instance.alignment), /*#__PURE__*/React.createElement("span", null, instance.profession))))));
}