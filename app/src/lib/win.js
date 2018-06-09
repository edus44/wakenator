export function maximize() {
  const win = getWin()
  if (!win) return
  win.setFullScreenable(true)
  win.setResizable(true)
  win.setFullScreen(true)
  win.setAlwaysOnTop(true)
}
export function minimize() {
  const win = getWin()
  if (!win) return
  win.setFullScreen(false)
  win.setFullScreenable(false)
  win.setAlwaysOnTop(false)
  win.setResizable(false)
}

function getWin() {
  if (!window.require) return
  return window.require('electron').remote.getCurrentWindow()
}
