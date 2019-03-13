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
  send('open-url', url)
}
export function getIp(url) {
  if (!ipcRenderer) return ''
  return new Promise(resolve => {
    ipcRenderer.send('get-public-ip')
    const timer = setTimeout(() => {
      resolve('')
    }, 2000)
    ipcRenderer.once('public-ip', (e, ip) => {
      clearTimeout(timer)
      resolve(ip)
    })
  })
}
