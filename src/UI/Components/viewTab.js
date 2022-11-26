function TestIt2() {
  return /*#__PURE__*/React.createElement("div", null, "Hello Template");
}
export function ViewTab(props) {
  const {
    instance,
    typeName,
    build
  } = props;
  const [Template, setTemplate] = React.useState();
  React.useEffect(() => {
    import(`../../../Generated/${build}/${typeName}/template.js`).then(imp => {
      const {
        Base
      } = imp;
      // https://medium.com/swlh/how-to-store-a-function-with-the-usestate-hook-in-react-8a88dd4eede1
      setTemplate(() => Base);
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", null, Template && /*#__PURE__*/React.createElement(Template, {
    instance: instance,
    typeName: typeName,
    build: build
  }));
}