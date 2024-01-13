import { spawn } from 'node:child_process'
import { join } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
/**
 * @param {string} title - The title of the prompt.
 * @param {string} body - The body of the prompt.
 * @param {boolean} mask - Whether to mask the input.
 * @param {string} defaultText - The default text of the prompt.
 * @returns {Promise<string|undefined>} The user's input or null if the prompt was cancelled.
 */
export function prompt(title, body, mask, defaultText = '') {
  return new Promise(resolve => {
    const nativePath = './native/prompt.applescript'
    const boxSpawner = spawn('osascript', [join(__dirname, nativePath), title, body, defaultText])

    boxSpawner.stdout.on('data', d => {
      const data = d.toString()
      if (data) resolve(data.trim().split('text returned:').pop())
    })

    boxSpawner.on('exit', () => resolve(undefined))
  })
}
