const fs = require("fs")
const path = require("path")
const { readdir, readFile } = require("fs/promises")
const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron")
const { setCustomMenu } = require("./menu")
const { start } = require("./Core/generate")

setCustomMenu()

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "./UI/Main/preload.js"),
    },
  })
  win.webContents.openDevTools()

  win.loadFile("./src/UI/Main/index.html")

  ipcMain.handle("build:run", async () => {
    return start()
  })

  ipcMain.handle("view:builds", async () => {
    const dir = path.join(process.cwd(), "/Generated")

    return fs.existsSync(dir)
      ? readdir(dir).catch(console.warn)
      : new Promise(() => [])
  })

  ipcMain.handle("view:build", async (evt, buildName) => {
    const dir = path.join(process.cwd(), `/Generated/${buildName}`)

    return fs.existsSync(dir)
      ? readdir(dir).catch(console.warn)
      : new Promise(() => [])
  })

  ipcMain.handle("view:instances", async (evt, buildName, type) => {
    const file = path.join(
      process.cwd(),
      `/Generated/${buildName}/${type}/instances.json`
    )

    console.log(file)

    return fs.existsSync(file)
      ? readFile(file)
          .then((res) => JSON.parse(res))
          .catch(console.warn)
      : new Promise(() => {})
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
