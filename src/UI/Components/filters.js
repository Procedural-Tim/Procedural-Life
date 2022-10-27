import { Section } from "./section.js";
function Filter(props) {
  const {
    name,
    values,
    addFilter
  } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const filterClasses = ["filter"];
  if (isOpen) {
    filterClasses.push("filter-open");
  }
  const addPositiveFilter = value => {
    addFilter({
      attr: name,
      value,
      type: "positive"
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: filterClasses.join(" "),
    key: name,
    onClick: toggleOpen
  }, /*#__PURE__*/React.createElement("div", null, name), /*#__PURE__*/React.createElement("div", {
    className: "facets"
  }, isOpen && Object.entries(values).map(([value, count]) => {
    const onClick = () => addPositiveFilter(value);
    return /*#__PURE__*/React.createElement("button", {
      key: value,
      onClick: onClick
    }, value, " (", count, ")");
  })));
}
function Filters(props) {
  const {
    file = [{}],
    addFilter,
    removeFilter
  } = props;

  // Loop through all instances, extracting out each attribute, each attributes possibly values, and how many times said value occures
  const attributes = file.reduce((acc, inst) => {
    Object.entries(inst).forEach(([attr, value]) => {
      if (typeof value === "object") {
        return acc;
      }
      if (!acc[attr]) {
        acc[attr] = [];
      }
      if (!acc[attr][value]) {
        acc[attr][value] = 0;
      }
      acc[attr][value]++;
    });
    return acc;
  }, {});
  return /*#__PURE__*/React.createElement(Section, {
    heading: "Filters"
  }, Object.entries(attributes).map(([name, valueSet]) => /*#__PURE__*/React.createElement(Filter, {
    name: name,
    values: valueSet,
    key: name,
    addFilter: addFilter,
    removeFilter: removeFilter
  })));
}
export { Filters };