module.exports = options => ({
  port: 13371,
  html: {
    template: './src/index.html',
  },
  entry: './src/main.js',
  presets: [
    require('poi-preset-eslint')({ mode: '*' }),
    require('poi-preset-yaml')(),
    require('poi-preset-uglifyjs')(),
  ],
  homepage: './',
  extendWebpack(config) {
    // config.output.publicPath('./')
  },
})
