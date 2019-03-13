import { database } from '@/lib/firebase'
import { getIp } from '@/lib/win'
const debug = require('debug')('wk:channel')

export default class User {
  constructor(uid) {
    this.ref = null
    this.metaRef = null
    this.uid = uid
    this.name = ''
    this.channel = ''
  }
  async setChannel(channel) {
    this.channel = channel
  }
  async setName(name) {
    this.name = name.trim() || '-'
    return this.update()
  }
  getChannelRef() {
    return database.ref(`/channel/${this.channel}/list`)
  }
  getWakesRef() {
    return database.ref(`/channel/${this.channel}/wakes/${this.uid}`)
  }

  async enter() {
    debug('enter', this.uid, this.channel, this.name)
    await this.exit()

    if (!this.channel) return

    this.ref = database.ref(`/channel/${this.channel}/list/${this.uid}`)
    this.metaRef = database.ref(`/channel/${this.channel}/meta/${this.uid}`)

    const onValue = async snapshot => {
      if (!snapshot.val()) {
        return
      }
      database.ref('.info/connected').off('value', onValue)
      await this.ref.onDisconnect().remove()
      await this.metaRef.onDisconnect().remove()
      await this.update()
      await this.updateMeta()
    }
    database.ref('.info/connected').on('value', onValue)
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

  async updateMeta() {
    if (!this.metaRef) return
    const metaData = await getMetaData()
    const obj = {
      name: this.name,
      ...metaData,
      ...getHostData(),
    }
    debug('update-meta', obj)
    await this.metaRef.set(obj)
  }
  async exit() {
    debug('exit')
    if (this.ref) {
      await this.ref.remove()
      await this.ref.onDisconnect().cancel()
      this.ref = null
    }
    if (this.metaRef) {
      await this.metaRef.remove()
      await this.metaRef.onDisconnect().cancel()
      this.metaRef = null
    }
  }
  async wakePerson(person) {
    const ref = database.ref(`/channel/${this.channel}/wakes/${person.uid}`)
    await ref.push().set({
      uid: this.uid,
      name: this.name,
      ...getHostData(),
    })
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

async function getMetaData() {
  return {
    ip: await getIp(),
    av: process.env.VUE_APP_DESKTOP_VERSION,
    ts: new Date().toISOString(),
  }
}
