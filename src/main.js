const path = require("path")
const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron")
const { setCustomMenu } = require("./menu")
const { start } = require("./Core/generate")

setCustomMenu()

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./UI/Main/preload.js"),
    },
  })
  win.webContents.openDevTools()

  win.loadFile("./src/UI/Main/index.html")

  ipcMain.handle("build:run", async () => {
    return start()
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})
