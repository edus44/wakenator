const { autoUpdater } = require('electron-updater')
const debug = require('debug')('wk:auto-update')
let timer

if (debug.enabled) {
  autoUpdater.logger = require('electron-log')
  autoUpdater.logger.transports.file.level = 'debug'
}

autoUpdater.autoInstallOnAppQuit = false

autoUpdater.on('update-downloaded', () => {
  debug('update-downloaded')
  clearTimeout(timer)
  autoUpdater.quitAndInstall(true, true)
})
function check() {
  debug('checking')
  timer = setTimeout(check, 1000 * 60 * 60 * 2)
  autoUpdater.checkForUpdates()
}

check()
