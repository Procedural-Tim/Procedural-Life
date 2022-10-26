import { App } from "../Components/app.js"

var domContainer = document.getElementById("react-root")
var root = ReactDOM.createRoot(domContainer)
root.render(React.createElement(App, null))
