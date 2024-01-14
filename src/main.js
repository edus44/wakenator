import './lib/debug.js'
import Debug from 'debug'
import { app } from 'electron'
import { TrayMenu } from './TrayMenu.js'

import { about } from './lib/dialogs.js'
import { configure } from './configuration.js'

const debug = Debug('wk:main')

app.dock.hide()

app.whenReady().then(() => {
  debug('ready')

  const traymenu = new TrayMenu()

  traymenu.on('about', about)
  traymenu.on('configure', configure)
})
