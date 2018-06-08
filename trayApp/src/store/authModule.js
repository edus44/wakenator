import { auth } from '@/lib/firebase'
import User from '@/lib/User'
const debug = require('debug')('wk:auth')

auth.onAuthStateChanged(uid => {
  debug('firebaseUser', uid)
})

let user

const state = {
  uid: null,
  channel: '',
  name: '',
}

const actions = {
  async init({ commit, state }) {
    try {
      const result = await auth.signInAnonymously()
      user = new User(result.user.uid)
      await user.setName(state.name)
      await user.setChannel(state.channel)
      commit('setUid', result.user.uid)
    } catch (err) {
      debug('sign-in-err', err)
    }
  },
  async changeChannel({ commit, state }, channel) {
    if (channel === state.channel) return
    await user.setChannel(channel)
    commit('setChannel', channel)
  },
  async changeName({ commit, state }, name) {
    if (name === state.name) return
    await user.setName(name)
    commit('setName', name)
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
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
