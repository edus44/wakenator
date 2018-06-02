'use strict'

const { BrowserWindow } = require('electron')

const path = require('path')
const Positioner = require('electron-positioner')

const { EventEmitter } = require('events')
const debug = require('debug')('wk:window')

module.exports = class WkWindow extends EventEmitter {
  constructor(tray) {
    super()
    debug('init')

    this.tray = tray

    // Init window
    this.win = new BrowserWindow({
      width: 350,
      height: 450,
      show: false,
      frame: false,
      fullscreenable: false,
      resizable: false,
    })

    // Load url
    let windowPath

    if (debug.enabled) {
      windowPath = `http://localhost:13371`
    } else {
      const distPath = path.resolve(__dirname, '../appDist/index.html').replace(/\\/g, '/')
      windowPath = `file://${distPath}`
    }

    this.win.loadURL(windowPath)

    // Load vue devtools
    if (debug.enabled) {
      try {
        const devtoolsInstaller = require('electron-devtools-installer')
        devtoolsInstaller
          .default(devtoolsInstaller.VUEJS_DEVTOOLS)
          .then(name => {
            debug('dev-tool', 'Added Extension:', name)
            // Open the DevTools
            this.win.webContents.openDevTools({ mode: 'detach' })
            this.show()
          })
          .catch(err => debug('dev-tool', 'An error occurred:', err))
      } catch (err) {
        debug('cannot-load-devtool', err.message)
      }
    }

    // Hide the window when it loses focus
    this.win.on('blur', this.hide.bind(this))
    this.win.on('close', e => {
      // e.preventDefault()
      this.hide()
    })

    this.positioner = new Positioner(this.win)
  }

  toggle() {
    if (this.win.isVisible()) {
      this.hide()
    } else {
      this.show()
    }
  }

  hide() {
    debug('hide')
    if (!this.win.webContents.isDevToolsOpened()) {
      this.win.hide()
    }
  }

  show() {
    debug('show')
    const pos = this.positioner.calculate('trayBottomCenter', this.tray.getBounds())
    // const pos = this.positioner.calculate('center', this.tray.getBounds())
    this.win.setPosition(pos.x, pos.y, false)
    this.win.show()
    this.win.focus()
  }
}
