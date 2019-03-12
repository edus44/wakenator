const ipcRenderer = window.require && window.require('electron').ipcRenderer

function send(...args) {
  ipcRenderer && ipcRenderer.send(...args)
}

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
