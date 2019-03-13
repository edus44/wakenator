const { resolve } = require('path')
const debug = require('debug')('wk:utils')
const axios = require('axios')
const publicIp = require('public-ip')

module.exports = {
  loadDevTool,
  getIndex,
  getAsset,
  getLatestVersion,
  getIp,
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

async function getLatestVersion() {
  try {
    const res = await axios.get('https://github.com/edus44/wakenator/releases/latest', {
      maxRedirects: 0,
      validateStatus(status) {
        return status === 302
      },
    })
    const [, version] = res.headers.location.match('v([0-9.]+)$') || []
    return version
  } catch (err) {
    debug('error-getting-latest-version', err && err.message)
    return ''
  }
}

async function getIp() {
  return publicIp.v4()
}
