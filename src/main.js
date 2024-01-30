import './lib/debug.js'
import Debug from 'debug'
import { app } from 'electron'
import { Program } from './Program.js'

const debug = Debug('wk:main')

app.dock.hide()

app.whenReady().then(() => {
  debug('ready')

  // eslint-disable-next-line no-new
  new Program()
})

app.on('window-all-closed', () => {
  debug('all-closed')
  // e.preventDefault()
})
