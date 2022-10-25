var _require = require("electron"),
    shell = _require.shell;

var _require2 = require("node:child_process"),
    execSync = _require2.execSync;

/* eslint-disable-next-line */

document.getElementById("close-button").addEventListener("click", function () {
  /* eslint-disable-next-line */
  window.close();
});

/* eslint-disable-next-line */
document.getElementById("git-link").addEventListener("click", function () {
  shell.openExternal("https://github.com/Procedural-Tim/Procedural-Life");
});

/* eslint-disable-next-line */
document.getElementById("git-sha").innerText = execSync("git rev-parse HEAD").toString().slice(0, 7);