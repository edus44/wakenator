require('./lib/autoLaunch')

const tray = require('./lib/tray')
const { app } = require('electron')
const debug = require('debug')('wk:main')
debug('init')

// Event logs
process.on('exit', code => {
  debug('process exited with', code)
})
app.on('ready', () => debug('app-ready'))
app.on('quit', () => debug('quit'))
app.on('window-all-closed', () => {
  debug('window-all-closed')
  app.quit()
})

tray.init()
