import './lib/debug.js'
import Debug from 'debug'
import { app } from 'electron'
import { App } from './App.js'

const debug = Debug('wk:main')

app.dock.hide()

app.whenReady().then(() => {
  debug('ready')

  // eslint-disable-next-line no-new
  new App()
})
