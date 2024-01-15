import { join } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname

/** @param {string} path */
export function res(path) {
  return join(__dirname, '../res', path)
}
