import Debug from 'debug'
import { app, BrowserWindow, Menu, Tray } from 'electron'
import { resolve } from 'path'
// import { prompt } from './prompt.js'

Debug.enable('wk:*')

const __dirname = new URL('.', import.meta.url).pathname

const debug = Debug('wk:main')

debug('init')

let tray = null
app.whenReady().then(() => {
  tray = new Tray(resolve(__dirname, './res/trayTemplate.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1sssss', icon: resolve(__dirname, './res/trayTemplate.png') },
    { type: 'separator' },
    {
      label: 'Quit',
      click() {
        app.quit()
      },
    },
    // { label: 'Item3', type: 'radio', checked: true },
    // { label: 'Item4', type: 'radio' },
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//   })
//   win.loadFile('index.html')
// }

// app.whenReady().then(async () => {
//   createWindow()

//   const text = await prompt(
//     'This is a title.',
//     'What would you really like to see next?',
//     true,
//     'nanai'
//   )
//   debug(text)
// })
