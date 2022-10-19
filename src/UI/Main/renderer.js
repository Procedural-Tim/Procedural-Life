/* eslint-disable-next-line */
document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", async () => {
    /* eslint-disable-next-line */
    await window.darkMode.toggle()
  })

/* eslint-disable-next-line */
document
  .getElementById("reset-to-system")
  .addEventListener("click", async () => {
    /* eslint-disable-next-line */
    await window.darkMode.system()
  })

/* eslint-disable-next-line */
document.getElementById("generate").addEventListener("click", async () => {
  /* eslint-disable-next-line */
  const button = document.getElementById("generate")
  button.disabled = true
  /* eslint-disable-next-line */
  await window.generation.generate()
  button.disabled = false
})
