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
  build: function build(buildName) {
    return ipcRenderer.invoke("view:build", buildName)
  },
  instances: function file(buildName, type) {
    return ipcRenderer.invoke("view:instances", buildName, type)
  },
})
