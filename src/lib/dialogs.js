import { spawn } from 'node:child_process'
import { app, dialog } from 'electron'
import { res } from './utils.js'

/**
 * @param {object} options - The options for the prompt.
 * @param {string} options.title - The title of the prompt.
 * @param {string} options.body - The body of the prompt.
 * @param {string} [options.defaultText] - The default text of the prompt.
 * @param {string} [options.buttonText] - The text of the button.
 * @returns {Promise<string|undefined>} The user's input or null if the prompt was cancelled.
 */
export function prompt({ title, body, defaultText = '', buttonText = 'OK' }) {
  return new Promise((resolve, reject) => {
    const boxSpawner = spawn('osascript', [
      res('./native/prompt.applescript'),
      title,
      body,
      defaultText,
      buttonText,
    ])

    boxSpawner.stdout.on('data', d => {
      const data = d.toString()
      if (data) resolve(data.trim().split('text returned:').pop())
    })

    boxSpawner.on('error', reject)
    boxSpawner.on('exit', () => resolve(undefined))
  })
}

/**
 * Show about dialog
 */
export async function about() {
  const result = await dialog.showMessageBox({
    message: 'Wakenator',
    detail: 'v' + app.getVersion(),
    icon: res('./res/logo192.png'),
    buttons: ['OK', 'Visit Website'],
    cancelId: 0,
    defaultId: 0,
  })
  if (result.response === 1) {
    spawn('open', ['https://github.com/edus44/wakenator'])
  }
  // const nativePath = './native/about.applescript'
  // spawn('osascript', [join(__dirname, nativePath), '2.0'])
}
