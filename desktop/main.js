'use strict'


const debug = require('debug')('wk:main')
debug('init')
process.on('exit', code => {
    debug('process exited with', code)
})

const { app, BrowserWindow, ipcMain, Tray } = require('electron')
const path = require('path')
const Positioner = require('electron-positioner')

const assetsDirectory = path.join(__dirname, 'res')


let tray
let window
let positioner

// Don't show the app in the dock
if (process.platform=='darwin')
    app.dock.hide()

app.on('ready', () => {
    createTray()
    createWindow()
})

// Quit the app when the window is closed
app.on('window-all-closed', () => {
    app.quit()
})

function createTray(){
    tray = new Tray(path.join(assetsDirectory, 'icon-white.png'))
    tray.on('click', toggleWindow)
    tray.on('right-click', toggleWindow)
    tray.setToolTip('Wakenator')

}

function getWindowPosition(){
    const trayPos = tray.getBounds()

    return positioner.calculate('trayBottomCenter', trayPos)

    // const windowBounds = window.getBounds()
    // const trayBounds = tray.getBounds()

    // debug('windowBounds',windowBounds)
    // debug('trayBounds',trayBounds)

    // // Center window horizontally below the tray icon
    // const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

    // // Position window 4 pixels vertically below the tray icon
    // const y = Math.round(trayBounds.y + trayBounds.height + 3)

    // return { x: x, y: y }
}

function createWindow(){
    window = new BrowserWindow({
        width: 350,
        height: 450,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        // transparent: true,
        // 'node-integration': false
    })

    let windowPath

    if (debug.enabled){
        windowPath = `http://localhost:13371`
    }else{
        let distPath = path.resolve(__dirname, '../window/dist/index.html').replace(/\\/g,'/')
        windowPath = `file://${distPath}`
    }

    window.loadURL(windowPath)

    //Load vue devtools
    if (debug.enabled){
        const devtoolsInstaller = require('electron-devtools-installer')
        devtoolsInstaller.default(devtoolsInstaller.VUEJS_DEVTOOLS)
            .then((name) => {
                debug('dev-tool','Added Extension:',name)
                // Open the DevTools
                window.webContents.openDevTools({mode:'detach'})
            })
            .catch((err) => debug('dev-tool','An error occurred:', err))
    }

    // Hide the window when it loses focus
    window.on('blur', () => {
        if (!window.webContents.isDevToolsOpened()) {
            window.hide()
        }
    })

    positioner = new Positioner(window)
}

function toggleWindow(e,bounds){
    if (window.isVisible()) {
        window.hide()
    } else {
        showWindow()
    }
}

function showWindow(){
    const position = getWindowPosition()
    window.setPosition(position.x, position.y, false)
    window.show()
    // window.focus()
}

ipcMain.on('show-window', () => {
    showWindow()
})