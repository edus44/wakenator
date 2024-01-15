import Debug from 'debug'
import { app } from 'electron'
Debug.enable('wk:*')

const debug = Debug('wk:main')

debug('start', {
  version: app.getVersion(),
  userData: app.getPath('userData'),
})
