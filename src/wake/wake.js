import { BrowserWindow } from 'electron'
import { res } from '../lib/utils.js'

/** @typedef {import('../User.js').Wake} Wake */

/** @param {Wake} wake */
export function showWake(wake) {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
  })
  win.visibleOnAllWorkspaces = true

  win.loadFile(res('../wake/index.html'))
}
