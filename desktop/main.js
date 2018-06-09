'use strict'

const { Menubar } = require('electron-menubar')
const { resolve } = require('path')
const { version } = require('./package')
const { app, Menu } = require('electron')
const debug = require('debug')('wk:main')

debug('init')

// Event logs
process.on('exit', code => debug('process exited with', code))
app.on('ready', () => debug('app-ready'))
app.on('quit', () => debug('quit'))
app.on('window-all-closed', () => {
  debug('window-all-closed')
  app.quit()
})

let index
if (debug.enabled) {
  index = `http://localhost:13371`
} else {
  const distPath = resolve(__dirname, '../app/dist/index.html').replace(/\\/g, '/')
  index = `file://${distPath}`
}

// Create menubar
const menubar = new Menubar({
  index,
  icon: resolve(__dirname, 'res/icon-white.png'),
  preloadWindow: true,
  tooltip: 'Wakenator v' + version,
  window: {
    fullscreenable: false,
    resizable: false,
  },
})
menubar.on('ready', menubarReady)

/**
 * Extend menubar when ready
 */
async function menubarReady() {
  debug('menubar-ready')

  // Set context menu
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open', click: () => menubar.show() },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ])
  menubar.tray.setContextMenu(contextMenu)

  if (debug.enabled) {
    await loadDevTool()
    menubar.on('after-show', () => {
      menubar.window.setAlwaysOnTop(true)
    })
    menubar.show()
    menubar.window.webContents.openDevTools({ mode: 'detach' })
  }
}

/**
 * Load vue dev tools
 */
async function loadDevTool() {
  try {
    const devtoolsInstaller = require('electron-devtools-installer')
    const name = await devtoolsInstaller.default(devtoolsInstaller.VUEJS_DEVTOOLS)
    debug('dev-tool', 'Added Extension:', name)
  } catch (err) {
    debug('cannot-load-devtool', err.message)
  }
}
