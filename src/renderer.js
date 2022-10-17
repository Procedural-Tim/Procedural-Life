document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
  })
  
  document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
  })

  document.getElementById("generate").addEventListener('click', async () => {
await window.generation.generate();
  });