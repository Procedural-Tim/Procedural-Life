import { TabBox } from "../Components/TabBox.js";

function App() {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            "Fantasy Procedural Generator"
        ),
        React.createElement(TabBox, null)
    );
}

export { App };