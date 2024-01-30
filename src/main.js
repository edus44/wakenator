import './lib/debug.js'
import Debug from 'debug'
import { app } from 'electron'
import { Program } from './Program.js'

const debug = Debug('wk:main')

app.dock.hide() // LSUIElement plist
app.applicationMenu = null

app.whenReady().then(() => {
  debug('ready')

  // eslint-disable-next-line no-new
  new Program()
})

// Subscribed to this event to prevent closing the app when all windows are closed.
app.on('window-all-closed', () => {
  debug('window-all-closed')
})
