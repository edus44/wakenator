import Debug from 'debug'
import { prompt } from './dialogs.js'

const debug = Debug('wk:configuration')

const nonAllowedChars = /[^a-zA-Z0-9-]/g

/**
 * @param {object} configuration
 * @param {string} configuration.name
 * @param {string} configuration.channel
 */
export async function showConfiguration(configuration) {
  debug('start', configuration)
  const newName = await prompt({
    title: 'Configure',
    body: 'Enter your name',
    defaultText: configuration.name,
    buttonText: 'Next',
  })
  if (!newName) return debug('canceled')

  const newChannel = await prompt({
    title: 'Configure',
    body: 'Enter channel',
    defaultText: configuration.channel,
    buttonText: 'Finish',
  })

  if (!newChannel) return debug('canceled')

  return cleanConfiguration({ name: newName, channel: newChannel })
}

/**
 * @param {object} configuration
 * @param {string} configuration.name
 * @param {string} configuration.channel
 */
export function cleanConfiguration({ name, channel }) {
  const configuration = {
    name: (name || '').replace(nonAllowedChars, ''),
    channel: (channel || '').replace(nonAllowedChars, '').toLocaleLowerCase(),
  }
  debug('clean', configuration)
  return configuration
}
