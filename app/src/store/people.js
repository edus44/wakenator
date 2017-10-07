
import client from '../lib/client'

const state = {
    server:'',
    connected:false
}

const actions = {
    connect({commit},server){
        commit('SET_SERVER',server)
        client.connect(server)
    }
}

const mutations = {
    SET_SERVER(state,server){
        state.server = server
    },
    SET_CONNECTED(state){
        state.connected = true
    },
    SET_DISCONNECTED(state){
        state.connected = false
    },
}

const getters = {

}



export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}