import { BrowserWindow } from 'electron'
import { res } from '../lib/utils.js'
import Debug from 'debug'

/** @typedef {import('../Exchange.js').Wake} Wake */
/** @typedef {import('electron').Event} Event */

const debug = Debug('wk:wake')

/** @type {BrowserWindow | undefined} */
let lastWin

/** @param {Wake} wake */
export function showWake(wake) {
  if (lastWin) {
    debug('close last')
    lastWin.close()
  }

  debug('show', wake)
  const win = (lastWin = new BrowserWindow({
    width: 600,
    height: 600,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    hasShadow: false,
    skipTaskbar: true,
    show: false,
    // center: true,
  }))
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  win.removeMenu()

  win.webContents.openDevTools({
    mode: 'detach',
  })

  win.loadFile(res(`../wake/content/index.html`), {
    query: { wake: JSON.stringify(wake) },
  })
  win.once('ready-to-show', () => {
    debug('ready-to-show')
    win.show()
  })

  /**
   * Prevent that closing the window will close the app
   *
   * @param {Event} e
   */
  const onClose = e => {
    debug('close')
    e.preventDefault()
    win.off('close', onClose)
    win.close()
    lastWin = undefined
  }

  win.on('close', onClose)
}
