import { resolve } from 'node:path'

const root = new URL('..', import.meta.url).pathname

/**
 *
 * @param {string} path
 */
export function res(path) {
  return resolve(root, path)
}
