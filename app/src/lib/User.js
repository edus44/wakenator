import { database } from '@/lib/firebase'
const debug = require('debug')('wk:channel')

export default class User {
  constructor(uid) {
    this.ref = null
    this.uid = uid
    this.name = ''
    this.channel = ''
  }
  async setChannel(channel) {
    this.channel = channel
    return this.enter()
  }
  async setName(name) {
    this.name = name
    return this.update()
  }
  getChannelRef() {
    return database.ref(`/channel/${this.channel}/list`)
  }
  async enter() {
    debug('enter', this.uid, this.channel, this.name)
    await this.exit()

    // User reference
    this.ref = database.ref(`/channel/${this.channel}/list/${this.uid}`)

    return new Promise((resolve, reject) => {
      database.ref('.info/connected').on('value', async snapshot => {
        debug('on-connected', snapshot.val())
        if (!snapshot.val()) {
          return
        }
        try {
          await this.ref.onDisconnect().remove()
          await this.update()
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    })
  }
  async update() {
    if (!this.ref) return
    const obj = {
      name: this.name,
      ...getHostData(),
    }
    debug('update', obj)
    await this.ref.set(obj)
  }
  async exit() {
    debug('exit')
    database.ref('.info/connected').off('value')
    if (!this.ref) return
    await this.ref.remove()
    await this.ref.onDisconnect().cancel()
  }
}

function getHostData() {
  if (window.require) {
    const os = window.require('os')
    return {
      host: os.hostname(),
      user: os.userInfo().username,
    }
  } else {
    return {
      host: 'browser',
      user: 'user',
    }
  }
}
