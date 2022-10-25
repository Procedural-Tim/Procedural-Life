var _require = require("electron"),
    contextBridge = _require.contextBridge,
    ipcRenderer = _require.ipcRenderer;

contextBridge.exposeInMainWorld("build", {
  run: function run() {
    return ipcRenderer.invoke("build:run");
  }
});