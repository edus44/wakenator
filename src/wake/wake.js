import { BrowserWindow } from 'electron'
import { res } from '../lib/utils.js'
import Debug from 'debug'

/** @typedef {import('../Exchange.js').Wake} Wake */
/** @typedef {import('electron').Event} Event */

const debug = Debug('wk:wake')

/** @param {Wake} wake */
export function showWake(wake) {
  debug('show', wake)
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    hasShadow: false,
    skipTaskbar: true,
  })
  win.visibleOnAllWorkspaces = true

  win.loadFile(res(`../wake/index.html`), {
    query: { wake: JSON.stringify(wake) },
  })

  /**
   * Try
   *
   * @param {Event} e
   */
  const onClose = e => {
    debug('close')
    e.preventDefault()
    win.off('close', onClose)
    win.close()
  }

  win.on('close', onClose)
}
