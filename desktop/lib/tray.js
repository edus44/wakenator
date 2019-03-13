'use strict'

const { Menubar } = require('./electron-menubar')
const { version } = require('../package')
const { loadDevTool, getIndex, getAsset, getLatestVersion, getIp } = require('./utils')
const debug = require('debug')('wk:tray')
const { ipcMain, shell } = require('electron')
module.exports = { init }

function init() {
  let tooltip = 'Wakenator v' + version
  if (process.platform === 'linux') tooltip = 'Open Wakenator'
  // Create menubar
  const menubar = new Menubar({
    index: getIndex(),
    icon: getAsset('tray-white.png'),
    preloadWindow: true,
    tooltip,
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
    menubar.tray.setImage(getAsset('trayTemplate.png'))
  }

  menubar.on('after-hide', () => {
    win.unmaximize()
    win.setSize(400, 400)
  })

  ipcMain.on('maximize', () => {
    menubar.hide()
    setTimeout(() => {
      win.maximize()
      win.show()
      win.focus()
      menubar.once('after-hide', () => {
        win.webContents.send('tray-hide')
      })
    }, 100)
  })

  ipcMain.on('minimize', () => {
    menubar.hide()
  })

  ipcMain.on('close', () => {
    win.close()
  })

  ipcMain.on('open-url', (e, url) => {
    shell.openExternal(url)
  })

  // Public ip RPC
  ipcMain.on('get-public-ip', async () => {
    win.webContents.send('public-ip', await getIp())
  })

  // Latest version RPC
  ipcMain.on('get-latest-version', async () => {
    debug('gotit')
    win.webContents.send('latest-version', await getLatestVersion())
  })
}
