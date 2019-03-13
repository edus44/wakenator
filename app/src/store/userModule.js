import { auth, database } from '@/lib/firebase'
import User from '@/lib/User'
const debug = require('debug')('wk:auth')

auth.onAuthStateChanged(uid => {
  debug('firebaseUser', uid)
})

let user

const state = {
  connected: false,
  uid: null,
  channel: '',
  name: '',
}

const actions = {
  async init({ commit, state }) {
    const result = await auth.signInAnonymously()
    user = new User(result.user.uid)
    await user.setName(state.name)
    await user.setChannel(state.channel)
    commit('setUid', result.user.uid)

    database.ref('.info/connected').on('value', snapshot => {
      const connected = snapshot.val()
      debug('on-connected', connected)
      commit('setConnected', connected)
      if (connected) user.enter()
    })
  },
  async reset() {
    await database.goOffline()
    await database.goOnline()
  },
  async changeChannel({ commit, state }, channel) {
    if (channel === state.channel) return
    await user.setChannel(channel)
    user.enter()
    commit('setChannel', channel)
  },
  async changeName({ commit, state }, name) {
    if (name === state.name) return
    await user.setName(name)
    commit('setName', name)
  },
  async wakePerson(store, person) {
    await user.wakePerson(person)
  },
}

const mutations = {
  setUid(state, uid) {
    state.uid = uid
  },
  setChannel(state, channel) {
    state.channel = channel
  },
  setName(state, name) {
    state.name = name
  },
  setConnected(state, connected) {
    state.connected = connected
  },
}

const getters = {
  channelRef(state) {
    return state.connected && state.channel && state.uid && user.getChannelRef()
  },
  wakesRef(state) {
    return state.connected && state.channel && state.uid && user.getWakesRef()
  },
  validConfig(state) {
    return !!(state.channel && state.name)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
