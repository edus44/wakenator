import { Menu, Tray } from 'electron'
import { res } from './lib/utils.js'
import Debug from 'debug'
import os from 'node:os'
import { showAbout } from './lib/dialogs.js'
import { cleanConfiguration, showConfiguration } from './lib/configuration.js'
import Store from 'electron-store'
import { User } from './User.js'

const debug = Debug('wk:app')

/**
 * @typedef {object} StoreState
 * @property {string} name
 * @property {string} channel
 */

export class App {
  /** @type {Store<StoreState>} */
  store

  /** @type {Tray} */
  tray

  /** @type {User} */
  user

  constructor() {
    // Init Store
    this.store = new Store()
    const config = cleanConfiguration({
      name: this.store.get('name'),
      channel: this.store.get('channel'),
    })
    this.store.set('name', config.name || os.userInfo().username)
    this.store.set('channel', config.channel || 'default')

    // Init User
    this.user = new User(this.store.get('name'), this.store.get('channel'))
    this.user.on('refresh', () => this.updateTray())

    // Init Tray
    this.tray = new Tray(res('./menuTemplate.png'))
    this.updateTray()
  }

  updateTray() {
    debug('updateTray')

    /** @type {import('electron').MenuItemConstructorOptions[]} */
    const menu = [
      { type: 'separator' },
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

    if (!this.user.connected) {
      menu.unshift({
        label: 'Connecting...',
        enabled: false,
      })
    } else if (!this.user.people.length) {
      menu.unshift({
        label: 'Nobody around...',
        enabled: false,
      })
    } else {
      this.user.people.forEach((person, i) => {
        const woken = person.uid === this.user.wokenUid
        menu.splice(i, 0, {
          label: person.name,
          icon: res(`./${woken ? 'woken' : 'wake'}Template.png`),
          accelerator: !woken && i <= 9 ? (i + 1).toString() : undefined,
          click: () => {
            this.user.wakePerson(person)
          },
          enabled: !woken,
        })
      })
    }

    this.tray.setContextMenu(Menu.buildFromTemplate(menu))
  }

  async configure() {
    const config = await showConfiguration({
      name: this.store.get('name'),
      channel: this.store.get('channel'),
    })
    if (!config) return
    this.store.set('name', config.name)
    this.store.set('channel', config.channel)
    this.user.setConfig(config.name, config.channel)
    this.updateTray()
  }
}
