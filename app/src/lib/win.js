export function maximize() {
  send('maximize')
}
export function minimize() {
  send('minimize')
}

function send(...args) {
  if (!window.require) return
  const { ipcRenderer } = window.require('electron')
  ipcRenderer.send(...args)
}
