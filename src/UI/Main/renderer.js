import { App } from "../Components/app.js";

var domContainer = document.getElementById("react-root");
var root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(App, null));

// (() => {
// /* eslint-disable-next-line */
// document.getElementById("generate").addEventListener("click", async () => {
//   /* eslint-disable-next-line */
//   const button = document.getElementById("generate")
//   button.disabled = true
//   /* eslint-disable-next-line */
//   await window.generation.generate()
//   button.disabled = false
// })
// })()