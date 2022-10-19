const { app, Menu, BrowserWindow } = require("electron")
const path = require("path")

const isMac = process.platform === "darwin"

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      //   ...(isMac ? [
      //     { role: 'pasteAndMatchStyle' },
      //     { role: 'delete' },
      //     { role: 'selectAll' },
      //     { type: 'separator' },
      //     {
      //       label: 'Speech',
      //       submenu: [
      //         { role: 'startSpeaking' },
      //         { role: 'stopSpeaking' }
      //       ]
      //     }
      //   ] : [
      //     { role: 'delete' },
      //     { type: 'separator' },
      //     { role: 'selectAll' }
      //   ])
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  // { role: 'windowMenu' }
  //   {
  //     label: 'Window',
  //     submenu: [
  //       { role: 'minimize' },
  //       { role: 'zoom' },
  //       ...(isMac ? [
  //         { type: 'separator' },
  //         { role: 'front' },
  //         { type: 'separator' },
  //         { role: 'window' }
  //       ] : [
  //         { role: 'close' }
  //       ])
  //     ]
  //   },
  {
    role: "help",
    submenu: [
      {
        label: "About",
        click: async () => {
          const win = new BrowserWindow({
            width: 600,
            height: 400,
            webPreferences: {
              nodeIntegration: true,
              contextIsolation: false,
              preload: path.join(__dirname, "./UI/About/preload.js"),
            },
            frame: false,
          })
          win.webContents.openDevTools()

          win.loadFile("./src/UI/About/index.html")
        },
      },
    ],
  },
]

function setCustomMenu() {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

module.exports = { setCustomMenu }
