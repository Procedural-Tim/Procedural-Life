const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("build", {
  run: function run() {
    return ipcRenderer.invoke("build:run")
  },
})

contextBridge.exposeInMainWorld("view", {
  builds: function builds() {
    return ipcRenderer.invoke("view:builds")
  },
})
