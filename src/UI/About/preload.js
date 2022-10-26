/* eslint-disable-next-line */
window.addEventListener("DOMContentLoaded", function () {
  var replaceText = function replaceText(selector, text) {
    /* eslint-disable-next-line */
    var element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  var _arr = ["chrome", "node", "electron"]
  for (var _i = 0; _i < _arr.length; _i++) {
    var dependency = _arr[_i]
    replaceText(dependency + "-version", process.versions[dependency])
  }
})
