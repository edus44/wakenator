
import client from '../lib/client'
import {getHost} from '../lib/utils'

const state = {
    server:'',
    host: getHost(),
    connected:false,
    people:null,
}

const actions = {
    connect({commit},server){
        commit('SET_SERVER',server)
        client.connect(server)
    },

    clientConnected({state,commit}){
        commit('SET_CONNECTED')
        client.announce({
            host: state.host
        })
    },

    clientDisconnected({commit}){
        commit('SET_DISCONNECTED')
    },

    clientPeople({commit},people){
        commit('SET_PEOPLE',people)
    },
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
    SET_PEOPLE(state,people){
        state.people = people
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