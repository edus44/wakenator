import Vue from 'vue'
import Vuex from 'vuex'
import root from './rootModule'
import user from './userModule'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    root,
    user,
  },
  plugins: [
    createPersistedState({
      paths: ['user.channel', 'user.name'],
    }),
  ],
})
