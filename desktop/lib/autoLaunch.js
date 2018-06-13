const AutoLaunch = require('auto-launch')
const fs = require('fs')
const debug = require('debug')('wk:auto-launch')
const appImageBin = process.env.APPIMAGE

try {
  if (fs.existsSync(appImageBin)) {
    const autoLaunch = new AutoLaunch({ name: 'Wakenator', path: appImageBin })
    autoLaunch.opts.appName = 'Wakenator' // Fix auto-launch using file name
    autoLaunch.enable()
  } else {
    new AutoLaunch({ name: 'Wakenator' }).enable()
  }
} catch (err) {
  debug('err', err)
}
