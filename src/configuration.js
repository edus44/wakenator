import Debug from 'debug'
import { prompt } from './lib/dialogs.js'
import { state } from './lib/state.js'

const debug = Debug('wk:configuration')

const nonAlphaNumeric = /[^a-zA-Z0-9]/g

/**
 *
 */
export async function configure() {
  debug('start')
  const name = await prompt({
    title: 'Configure',
    body: 'Enter your name',
    defaultText: state.name,
    buttonText: 'Next',
  })
  if (!name) return debug('canceled')

  debug('name', name)

  const channel = await prompt({
    title: 'Configure',
    body: 'Enter channel',
    defaultText: state.channel,
    buttonText: 'Finish',
  })
  debug('channel', channel)

  if (!channel) return

  state.name = name.replace(nonAlphaNumeric, '')
  state.channel = channel.replace(nonAlphaNumeric, '').toLocaleLowerCase()
}
