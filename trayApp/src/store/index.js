import Vue from 'vue'
import Vuex from 'vuex'
import root from './rootModule'
import auth from './authModule'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    root,
    auth,
  },
  plugins: [
    createPersistedState({
      paths: ['auth.channel', 'auth.name'],
    }),
  ],
})
