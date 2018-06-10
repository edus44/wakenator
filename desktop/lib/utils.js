const { resolve } = require('path')
const debug = require('debug')('wk:utils')

module.exports = {
  loadDevTool,
  getIndex,
  getAsset,
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

function getIndex() {
  if (debug.enabled) {
    return `http://localhost:13371`
  } else {
    const distPath = resolve(__dirname, '../appDist/index.html').replace(/\\/g, '/')
    return `file://${distPath}`
  }
}

function getAsset(file) {
  return resolve(__dirname, '../res', file)
}
