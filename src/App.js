import { Menu, Tray } from 'electron'
import { res } from './lib/utils.js'
import Debug from 'debug'
import os from 'node:os'
import { showAbout } from './lib/dialogs.js'
import { cleanConfiguration, showConfiguration } from './lib/configuration.js'
import Store from 'electron-store'

const debug = Debug('wk:app')

/**
 * @typedef {object} StoreState
 * @property {string} name
 * @property {string} channel
 */

export class App {
  /**
   * @type {Store<StoreState>}
   */
  store

  /**
   * @type {Tray}
   */
  tray

  constructor() {
    // Init Store
    this.store = new Store()
    const config = cleanConfiguration({
      name: this.store.get('name'),
      channel: this.store.get('channel'),
    })
    this.store.set('name', config.name || os.userInfo().username)
    this.store.set('channel', config.channel || 'default')

    // Init Tray
    this.tray = new Tray(res('./menuTemplate.png'))
    this.updateTray()
  }

  updateTray() {
    debug('updateTray')
    /**
     * @type {import('electron').MenuItemConstructorOptions[]}
     */
    const menu = [
      {
        label: `You:  ${this.store.get('name')}`,
        enabled: false,
      },
      {
        label: `Channel:  ${this.store.get('channel')}`,
        enabled: false,
      },
      { type: 'separator' },
      {
        label: 'About Wakenator',
        click: () => showAbout(),
      },
      {
        label: 'Configure',
        click: () => this.configure(),
        accelerator: 'Command+,',
      },
      {
        label: 'Quit',
        role: 'quit',
        accelerator: 'Command+Q',
      },
    ]

    this.tray.setContextMenu(Menu.buildFromTemplate(menu))
  }

  async configure() {
    const conf = await showConfiguration({
      name: this.store.get('name'),
      channel: this.store.get('channel'),
    })
    if (!conf) return
    this.store.set('name', conf.name)
    this.store.set('channel', conf.channel)
    this.updateTray()
  }
}

// const contextMenu = Menu.buildFromTemplate([
//   // { type: 'separator' },

//   {
//     label: 'Pepito',
//     icon: res(__dirname, './res/wakeTemplate.png'),
//     accelerator: '1',
//   },
//   {
//     label: 'Alice',
//     icon: res(__dirname, './res/wakeTemplate.png'),
//     accelerator: '2',
//   },
//   {
//     label: 'Bob',
//     icon: res(__dirname, './res/wakeTemplate.png'),
//     accelerator: '3',
//   },
//   // {
//   //   label: 'Eduardo',
//   //   icon: resolve(__dirname, './res/personTemplate.png'),
//   //   enabled: false,
//   // },
//   { type: 'separator' },

//   {
//     label: 'You:  Eduardo',
//     enabled: false,
//   },
//   {
//     label: 'Channel:  applivery',
//     enabled: false,
//   },

//   { type: 'separator' },
//   {
//     label: 'About Wakenator',

//     click() {
//       about()
//     },
//   },
//   {
//     label: 'Configure',
//     accelerator: 'Command+,',
//   },
//   {
//     label: 'Quit',
//     role: 'quit',
//     accelerator: 'Command+Q',
//   },
//   // { label: 'Item3', type: 'radio', checked: true },
//   // { label: 'Item4', type: 'radio' },
// ])
