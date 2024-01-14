import { Menu, Tray } from 'electron'
import { res } from './lib/utils.js'
import { watchEffect } from '@vue-reactivity/watch'
import Debug from 'debug'

import { state } from './lib/state.js'
import { EventEmitter } from 'node:events'

const debug = Debug('wk:TrayMenu')

/**
 * @typedef {import('electron').MenuItemConstructorOptions} MenuItem
 */

export class TrayMenu extends EventEmitter {
  /**
   * @type {Tray}
   */
  tray

  constructor() {
    super()
    this.tray = new Tray(res('./res/menuTemplate.png'))

    watchEffect(() => {
      debug('update')
      /**
       * @type {MenuItem[]}
       */
      const menu = [
        {
          label: `You:  ${state.name}`,
          enabled: false,
        },
        {
          label: `Channel:  ${state.channel}`,
          enabled: false,
        },
        { type: 'separator' },
        {
          label: 'About Wakenator',
          click: () => this.emit('about'),
        },
        {
          label: 'Configure',
          click: () => this.emit('configure'),
          accelerator: 'Command+,',
        },
        {
          label: 'Quit',
          role: 'quit',
          accelerator: 'Command+Q',
        },
      ]

      this.tray.setContextMenu(Menu.buildFromTemplate(menu))
    })
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
