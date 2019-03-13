const ipcRenderer = window.require && window.require('electron').ipcRenderer

function send(...args) {
  ipcRenderer && ipcRenderer.send(...args)
}

function rpc(evName) {
  if (!ipcRenderer) return ''
  return new Promise(resolve => {
    const timer = setTimeout(() => {}, 2000)
    ipcRenderer.once(evName, (e, data) => {
      clearTimeout(timer)
      resolve(data)
    })
    ipcRenderer.send('get-' + evName)
  })
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
  send('open-url', url)
}
export function getIp() {
  return rpc('public-ip')
}
export function getLatestVersion() {
  return rpc('latest-version')
}
