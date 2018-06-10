export function maximize() {
  const win = getWin()
  if (!win) return
  win.setFullScreenable(true)
  win.setResizable(true)
  win.setFullScreen(true)
  win.setAlwaysOnTop(true)
  win.show()
}
export function minimize() {
  const win = getWin()
  if (!win) return
  win.setFullScreen(false)
  win.setFullScreenable(false)
  win.setAlwaysOnTop(false)
  win.setResizable(false)
  win.hide()
}

export function hide() {
  const win = getWin()
  if (!win) return
  win.hide()
}

function getWin() {
  if (!window.require) return
  return window.require('electron').remote.getCurrentWindow()
}
