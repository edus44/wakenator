module.exports = options => ({
  port: 13371,
  html: {
    template: './src/index.html',
  },
  entry: './src/main.js',
  homepage: './',
  dist: '../desktop/appDist',
  presets: [
    require('poi-preset-eslint')({ mode: '*' }),
    require('poi-preset-yaml')(),
    require('poi-preset-uglifyjs')(),
  ],
  env: {
    DESKTOP_VERSION: require('../desktop/package.json').version,
  },
})
