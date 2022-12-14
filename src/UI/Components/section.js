function Section(props) {
  const { children, heading } = props
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "section",
    },
    /*#__PURE__*/ React.createElement("div", null, heading),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "section-content",
      },
      children
    )
  )
}
export { Section }
