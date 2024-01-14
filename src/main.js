import Debug from 'debug'
import { app, BrowserWindow, Menu, Tray } from 'electron'
import { resolve } from 'path'
import { prompt } from './prompt.js'

Debug.enable('wk:*')

const __dirname = new URL('.', import.meta.url).pathname

const debug = Debug('wk:main')

debug('init')

app.dock.hide()

// prompt('This is a title.', 'What would you really like to see next?', 'pepito', 'tal')

let tray = null
app.whenReady().then(() => {
  tray = new Tray(resolve(__dirname, './res/menuTemplate.png'))
  const contextMenu = Menu.buildFromTemplate([
    // { type: 'separator' },

    {
      label: 'Pepito',
      icon: resolve(__dirname, './res/personTemplate.png'),
      accelerator: '1',
    },
    {
      label: 'Lucas',
      icon: resolve(__dirname, './res/personTemplate.png'),
      accelerator: '2',
    },
    // {
    //   label: 'Eduardo',
    //   icon: resolve(__dirname, './res/personTemplate.png'),
    //   enabled: false,
    // },
    { type: 'separator' },
    {
      label: 'You: Eduardo',
      enabled: false,
    },
    {
      label: 'Channel: applivery',
      enabled: false,
    },
    { type: 'separator' },
    {
      label: 'Options',
      accelerator: 'Command+,',
    },
    {
      label: 'Quit',
      role: 'quit',
      accelerator: 'Command+Q',
    },
    // { label: 'Item3', type: 'radio', checked: true },
    // { label: 'Item4', type: 'radio' },
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    fullscreenable: false,
    movable: false,
    minimizable: false,

    // vibrancy: '',
    // vibrancy: {
    //   theme: 'light', // (default) or 'dark' or '#rrggbbaa'
    //   effect: 'acrylic', // (default) or 'blur'
    //   disableOnBlur: true, // (default)
    // },
  })
  win.loadFile('index.html')
}

app.whenReady().then(async () => {
  // createWindow()
  // const text = await prompt(
  //   'This is a title.',
  //   'What would you really like to see next?',
  //   true,
  //   'nanai'
  // )
  // debug(text)
})
