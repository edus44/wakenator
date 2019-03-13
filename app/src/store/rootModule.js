import cmp from 'semver-compare'
import { getLatestVersion } from '@/lib/win'

const currentVersion = process.env.VUE_APP_DESKTOP_VERSION

const state = {
  view: 'home',
  showUpgrade: false,
}

const actions = {
  async checkLatestVersion({ commit }) {
    const latestVersion = await getLatestVersion()
    const showUpgrade = cmp(latestVersion, currentVersion) === 1
    commit('setShowUpgrade', showUpgrade)
  },
}

const mutations = {
  changeView(state, view) {
    state.view = view
  },
  setShowUpgrade(state, showUpgrade) {
    state.showUpgrade = showUpgrade
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
