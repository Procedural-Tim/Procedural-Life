import { Section } from "./section.js";
function Filter(props) {
  const {
    name,
    values
  } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  return /*#__PURE__*/React.createElement("div", {
    className: "facet",
    key: name,
    onClick: toggleOpen
  }, /*#__PURE__*/React.createElement("span", null, name), isOpen && values.map(value => /*#__PURE__*/React.createElement("button", {
    key: value
  }, value)));
}
function Filters(props) {
  const {
    file = [{}]
  } = props;
  const attributes = file.reduce((acc, inst) => {
    Object.entries(inst).forEach(([attr, value]) => {
      if (typeof value === "object") {
        return acc;
      }
      if (!acc[attr]) {
        acc[attr] = new Set();
      }
      acc[attr].add(value);
    });
    return acc;
  }, {});
  return /*#__PURE__*/React.createElement(Section, {
    heading: "Filters"
  }, Object.entries(attributes).map(([name, values]) => /*#__PURE__*/React.createElement(Filter, {
    name: name,
    values: Array.from(values),
    key: name
  })));
}
export { Filters };