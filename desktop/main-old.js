'use strict'

const debug = require('debug')('wk:main')
debug('init')
process.on('exit', function(code) {
    debug('process exited with', code)
})

const {app, BrowserWindow} = require('electron')
const path = require('path')

let win
let tray

function createWindow () {
    
    // Create the browser window.
    win = new BrowserWindow({
        width: 350,
        height: 450,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        transparent: true
    })
        
    let windowPath

    if (debug.enabled){
        windowPath = `http://localhost:13371`
    }else{
        let distPath = path.resolve(__dirname, '../window/dist/index.html').replace(/\\/g,'/')
        windowPath = `file://${distPath}`
    }

    win.loadURL(windowPath)

    //Load vue devtools
    if (debug.enabled){
        const devtoolsInstaller = require('electron-devtools-installer')
        devtoolsInstaller.default(devtoolsInstaller.VUEJS_DEVTOOLS)
            .then((name) => {
                debug('dev-tool','Added Extension:',name)
                // Open the DevTools
                win.webContents.openDevTools({mode:'detach'})
            })
            .catch((err) => debug('dev-tool','An error occurred:', err))
    }

    win.once('ready-to-show', () => {
        debug('ready-to-show','URL loaded:',win.getURL())
        win.show()
    })

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null
    })


    // Hide the window when it loses focus
    win.on('blur', () => {
      if (!win.webContents.isDevToolsOpened()) {
        win.hide()
      }
    })
}

const getWindowPosition = () => {
  const windowBounds = win.getBounds()
  const trayBounds = tray.getBounds()

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 3)

  return {x: x, y: y}
}


app.on('ready', ()=>{
    createWindow()
    createTray()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

//macOS especific
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})