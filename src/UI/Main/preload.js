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
  file: function file(buildName, fileName) {
    return ipcRenderer.invoke("view:file", buildName, fileName)
  },
})
