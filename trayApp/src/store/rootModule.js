const state = {
  view: 'home',
}

const actions = {}

const mutations = {
  changeView(state, view) {
    state.view = view
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
