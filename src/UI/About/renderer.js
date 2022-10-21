const { shell } = require("electron")
const { execSync } = require("node:child_process")

/* eslint-disable-next-line */
document.getElementById("close-button").addEventListener("click", () => {
  /* eslint-disable-next-line */
  window.close()
})

/* eslint-disable-next-line */
document.getElementById("git-link").addEventListener("click", () => {
  shell.openExternal("https://github.com/Procedural-Tim/Procedural-Life")
})

/* eslint-disable-next-line */
document.getElementById("git-sha").innerText = execSync("git rev-parse HEAD")
  .toString()
  .slice(0, 7)
