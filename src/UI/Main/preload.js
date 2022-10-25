const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("build", {
  run: function run() {
    return ipcRenderer.invoke("build:run");
  }
});