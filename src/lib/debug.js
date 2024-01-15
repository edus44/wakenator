import Debug from 'debug'
import { app } from 'electron'
import fs from 'node:fs'
import path from 'node:path'
Debug.enable('wk:*')

const pkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'))
const debug = Debug('wk:main')

debug('start', {
  version: pkg.version,
  userData: app.getPath('userData'),
})
