'use strict'

const { Menubar } = require('electron-menubar')
const { version } = require('../package')
const { loadDevTool, getIndex, getAsset } = require('./utils')
const debug = require('debug')('wk:tray')
const { ipcMain } = require('electron')

module.exports = { init }

function init() {
  // Create menubar
  const menubar = new Menubar({
    index: getIndex(),
    icon: getAsset('tray-white.png'),
    preloadWindow: true,
    tooltip: 'Wakenator v' + version,
    window: {
      fullscreenable: false,
      movable: false,
      minimizable: false,
      skipTaskbar: true,
    },
  })
  menubar.on('ready', () => menubarReady(menubar))
}

/**
 * Extend menubar when ready
 */
async function menubarReady(menubar) {
  debug('menubar-ready')

  const win = menubar.window

  // menubar.on('right-click', menubar._clicked.bind(menubar))

  if (debug.enabled) {
    await loadDevTool()
    menubar.on('after-show', () => {
      // menubar.window.setAlwaysOnTop(true)
    })
    // menubar.show()
    // menubar.window.webContents.openDevTools({ mode: 'detach' })
  }

  if (process.platform === 'darwin') {
    menubar.tray.setImage(getAsset('tray-mac.png'))
  }

  menubar.on('after-hide', () => {
    win.unmaximize()
    win.setSize(400, 400)
  })

  ipcMain.on('maximize', () => {
    menubar.hide()
    win.maximize()
    win.show()
    win.focus()
  })

  ipcMain.on('minimize', () => {
    menubar.hide()
  })
}
