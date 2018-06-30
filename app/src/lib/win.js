export function maximize() {
  send('maximize')
}
export function minimize() {
  send('minimize')
}
export function close() {
  send('close')
}
export function openURL(url) {
  send('openURL', url)
}

function send(...args) {
  if (!window.require) return
  const { ipcRenderer } = window.require('electron')
  ipcRenderer.send(...args)
}
