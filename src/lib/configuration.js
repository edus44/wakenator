import Debug from 'debug'
import { prompt } from './dialogs.js'

const debug = Debug('wk:configuration')

const nonAlphaNumeric = /[^a-zA-Z0-9]/g

/**
 *
 * @param {object} configuration
 * @param {string} configuration.name
 * @param {string} configuration.channel
 */
export async function showConfiguration({ name, channel }) {
  debug('start')
  const newName = await prompt({
    title: 'Configure',
    body: 'Enter your name',
    defaultText: name,
    buttonText: 'Next',
  })
  if (!newName) return debug('canceled')

  debug('name', name)

  const newChannel = await prompt({
    title: 'Configure',
    body: 'Enter channel',
    defaultText: channel,
    buttonText: 'Finish',
  })
  debug('channel', channel)

  if (!newChannel) return debug('canceled')

  return cleanConfiguration({ name: newName, channel: newChannel })
}

/**
 *
 * @param {object} configuration
 * @param {string} configuration.name
 * @param {string} configuration.channel
 */
export function cleanConfiguration({ name, channel }) {
  return {
    name: (name || '').replace(nonAlphaNumeric, ''),
    channel: (channel || '').replace(nonAlphaNumeric, '').toLocaleLowerCase(),
  }
}
