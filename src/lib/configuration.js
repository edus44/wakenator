import Debug from 'debug'
import { prompt } from './dialogs.js'

const debug = Debug('wk:configuration')

const nonAllowedChars = /[^a-zA-Z0-9-]/g

/**
 * @typedef {object} Configuration
 * @property {string} name
 * @property {string} channel
 */

/** @param {Configuration} configuration */
export async function showConfiguration({ name, channel }) {
  debug('start', { name, channel })
  const newName = await prompt({
    title: 'Configure',
    body: 'Enter your name',
    defaultText: name,
    buttonText: 'Next',
  })
  if (!newName) return debug('canceled')

  const newChannel = await prompt({
    title: 'Configure',
    body: 'Enter channel',
    defaultText: channel,
    buttonText: 'Finish',
  })

  if (!newChannel) return debug('canceled')

  return cleanConfiguration({ name: newName, channel: newChannel })
}

/** @param {Configuration} configuration */
export function cleanConfiguration({ name, channel }) {
  const configuration = {
    name: (name || '').replace(nonAllowedChars, ''),
    channel: (channel || '').replace(nonAllowedChars, '').toLocaleLowerCase(),
  }
  debug('clean', configuration)
  return configuration
}
