import { signInAnonymously } from 'firebase/auth'
import { onDisconnect, onValue, ref, remove, set, push, onChildAdded } from 'firebase/database'
import { auth, db } from './lib/firebase.js'
import { publicIpv4 } from 'public-ip'
import os from 'node:os'
import Debug from 'debug'
import { app } from 'electron'
import { EventEmitter } from 'node:events'
import { showWake } from './wake/wake.js'

/** @typedef {import('firebase/database').DatabaseReference} DatabaseReference */
/** @typedef {import('firebase/database').Unsubscribe} Unsubscribe */

/**
 * @typedef {object} ListItem
 * @property {string} name
 * @property {string} user
 * @property {string} host
 */

/**
 * @typedef {object} Person
 * @property {string} uid
 * @property {string} name
 * @property {string} user
 * @property {string} host
 */

/**
 * @typedef {object} Wake
 * @property {string} uid
 * @property {string} name
 * @property {string} user
 * @property {string} host
 * @property {string} ts
 */

/**
 * @typedef {object} MetaItem
 * @property {string} name
 * @property {string} user
 * @property {string} host
 * @property {string} ip
 * @property {string} ts
 * @property {string} v
 */

const debug = Debug('wk:user')

export class User extends EventEmitter {
  /** @type {string | undefined} */
  uid

  /** @type {boolean} */
  connected = false

  /** @type {DatabaseReference | undefined} */
  selfRef

  /** @type {DatabaseReference | undefined} */
  metaRef

  /** @type {DatabaseReference | undefined} */
  listRef

  /** @type {DatabaseReference | undefined} */
  wakesRef

  /** @type {Person[]} */
  people = []

  /** @type {string} */
  name

  /** @type {string} */
  channel

  /** @type {Unsubscribe | undefined} */
  unsubscribeList
  /** @type {Unsubscribe | undefined} */
  unsubscribeWakes

  /** @type {string | undefined} */
  wokenUid

  /**
   * @param {string} name
   * @param {string} channel
   */
  constructor(name, channel) {
    super()
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

    await this.leave()

    // Collect refs
    this.selfRef = ref(db, `/channel/${this.channel}/list/${this.uid}`)
    this.metaRef = ref(db, `/channel/${this.channel}/meta/${this.uid}`)
    this.wakesRef = ref(db, `/channel/${this.channel}/wakes/${this.uid}`)
    this.listRef = ref(db, `/channel/${this.channel}/list`)

    // Clear user refs on disconnect
    onDisconnect(this.selfRef).remove()
    onDisconnect(this.metaRef).remove()

    await this.update()

    // Listen for list changes
    this.unsubscribeList = onValue(this.listRef, snapshot => {
      const listItems = snapshot.val()
      this.onListChange(listItems)
    })

    // Listen for wakes
    this.unsubscribeWakes = onChildAdded(this.wakesRef, snapshot => {
      const wake = snapshot.val()
      remove(snapshot.ref)
      showWake(wake)
    })
  }

  /** @param {ListItem[] | undefined} listItems */
  async onListChange(listItems) {
    const people = !listItems
      ? []
      : Object.entries(listItems)
          .filter(([uid]) => uid && uid !== '.key' && uid !== this.uid)
          .map(([uid, item]) => ({
            uid,
            ...item,
          }))
          .sort((a, b) => a.name.localeCompare(b.name))

    debug('people', people)
    this.people = people
    this.emit('refresh')
  }

  async leave() {
    if (this.selfRef) {
      await onDisconnect(this.selfRef).cancel()
      await remove(this.selfRef)
      this.selfRef = undefined
    }
    if (this.metaRef) {
      await onDisconnect(this.metaRef).cancel()
      await remove(this.metaRef)
      this.metaRef = undefined
    }
    if (this.unsubscribeList) {
      this.unsubscribeList()
      this.unsubscribeList = undefined
    }
    if (this.unsubscribeWakes) {
      this.unsubscribeWakes()
      this.unsubscribeWakes = undefined
    }
  }

  /** Updates the user's refs */
  async update() {
    if (!this.selfRef || !this.metaRef) return

    /** @type {ListItem} */
    const listItem = {
      name: this.name,
      host: os.hostname(),
      user: os.userInfo().username,
    }

    debug('update list', listItem)
    await set(this.selfRef, listItem)

    /** @type {MetaItem} */
    const metaItem = {
      ...listItem,
      ip: await publicIpv4(),
      ts: new Date().toISOString(),
      v: app.getVersion(),
    }

    debug('update meta', metaItem)
    await set(this.metaRef, metaItem)
  }

  /** @param {Person} person */
  async wakePerson(person) {
    if (!this.uid) return
    const personWakesRef = ref(db, `/channel/${this.channel}/wakes/${person.uid}`)

    debug('wake person', person)

    /** @type {Wake} */
    const wake = {
      uid: this.uid,
      name: this.name,
      host: os.hostname(),
      user: os.userInfo().username,
      ts: new Date().toISOString(),
    }
    await set(push(personWakesRef), wake)

    this.wokenUid = person.uid
    this.emit('refresh')
    setTimeout(() => {
      this.wokenUid = undefined
      this.emit('refresh')
    }, 10000)
  }
}
