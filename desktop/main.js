'use strict'


const debug = require('debug')('wk:main')
debug('init')
process.on('exit', code => {
    debug('process exited with', code)
})

const WkTray = require('./lib/WkTray')
const WkWindow = require('./lib/WkWindow')
const { app } = require('electron')

let tray,window

// Don't show the app in the dock
if (process.platform=='darwin')
    app.dock.hide()

app.on('ready', appReady)

// Quit the app when the window is closed
app.on('window-all-closed', () => {
    debug('window-all-closed')
    app.quit()
})

app.on('before-quit',e=>{
    debug('before-quit')
})
app.on('will-quit',e=>{
    debug('will-quit')
})
app.on('quit',e=>{
    debug('quit')
})


function appReady(){
    debug('ready')

    tray = new WkTray()
    window = new WkWindow(tray.tray)

    tray.on('click',()=>{
        window.toggle()
    })

    tray.on('quit',()=>{
        app.quit()
    })
}