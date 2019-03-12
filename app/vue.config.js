process.env.VUE_APP_DESKTOP_VERSION = require('../desktop/package.json').version

module.exports = {
  publicPath: './',
  outputDir: '../desktop/appDist',
  devServer: {
    port: 13371,
    clientLogLevel: 'info',
  },
  lintOnSave: 'error',
}
