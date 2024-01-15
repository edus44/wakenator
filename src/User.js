import { signInAnonymously } from 'firebase/auth'
import { onDisconnect, onValue, ref, remove, set } from 'firebase/database'
import { auth, db } from './lib/firebase.js'
import { publicIpv4 } from 'public-ip'
import os from 'node:os'
/** @typedef {import('firebase/database').DatabaseReference} DatabaseReference */

import Debug from 'debug'
import { app } from 'electron'

const debug = Debug('wk:user')

export class User {
  /** @type {string | undefined} */
  uid

  /** @type {boolean} */
  connected = false

  /** @type {DatabaseReference | undefined} */
  ref

  /** @type {DatabaseReference | undefined} */
  metaRef

  /** @type {DatabaseReference | undefined} */
  channelRef

  /** @type {DatabaseReference | undefined} */
  wakesRef

  /** @type {string} */
  name

  /** @type {string} */
  channel

  /**
   * @param {string} name
   * @param {string} channel
   */
  constructor(name, channel) {
    this.name = name
    this.channel = channel

    onValue(ref(db, '.info/connected'), snapshot => {
      this.connected = snapshot.val()
      debug('connected', this.connected)
      if (this.connected) this.signIn()
    })
  }

  /** Sign in the user anonymously and enter the channel */
  async signIn() {
    debug('signIn')
    try {
      const { user } = await signInAnonymously(auth)
      this.uid = user.uid
      debug('uid', this.uid)
      await this.enter()
    } catch (/** @type {any} */ err) {
      debug('error connecting', err.message)
      debug('retrying in 5s')
      await new Promise(resolve => setTimeout(resolve, 5000))
      this.signIn()
    }
  }

  /**
   * @param {string} name
   * @param {string} channel
   */
  async setConfig(name, channel) {
    this.name = name
    this.channel = channel
    await this.enter()
  }

  /** Enters the channel leaving the previous one if any */
  async enter() {
    debug('enter')

    if (this.ref) {
      await onDisconnect(this.ref).cancel()
      await remove(this.ref)
    }
    if (this.metaRef) {
      await onDisconnect(this.metaRef).cancel()
      await remove(this.metaRef)
    }

    this.ref = ref(db, `/channel/${this.channel}/list/${this.uid}`)
    this.metaRef = ref(db, `/channel/${this.channel}/meta/${this.uid}`)
    this.wakesRef = ref(db, `/channel/${this.channel}/wakes/${this.uid}`)
    this.channelRef = ref(db, `/channel/${this.channel}/list`)

    onDisconnect(this.ref).remove()
    onDisconnect(this.metaRef).remove()

    await this.update()
  }

  /** Updates the user's refs */
  async update() {
    if (!this.ref || !this.metaRef) return

    const user = {
      name: this.name,
      host: os.hostname(),
      user: os.userInfo().username,
    }

    debug('update', user)
    await set(this.ref, user)

    const meta = {
      ...user,
      ip: await publicIpv4(),
      ts: new Date().toISOString(),
      v: app.getVersion(),
    }

    debug('update meta', meta)
    await set(this.metaRef, meta)
  }
}
