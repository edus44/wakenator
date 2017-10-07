
const io = require('socket.io-client')
const EventEmitter = require('eventemitter3')
const debug = require('debug')('wk:client');


class Client extends EventEmitter{
    constructor(){
        super()
        this.store = null
        this.socket = null
        this.server = null
    }

    connect(server){
        this.disconnect()
        this.server = server
        this.socket = io.connect(this.server)
        this.debugEvents()

        this.socket.on('connect',()=>{
            this.store.commit('people/SET_CONNECTED')
        })
        this.socket.on('disconnect',()=>{
            this.store.commit('people/SET_DISCONNECTED')
        })

    }

    setStore(store){
        this.store = store
    }


    debugEvents(){

        //Socket events
        let eventNames = ['connect', 'error', 'disconnect', 'reconnect', 'reconnect_attempt', 'reconnecting', 'reconnect_error', 'reconnect_failed']

        eventNames.forEach((eventName,...args)=>{
            this.socket.on(eventName, ()=>debug('io:'+eventName, args))
        })

    }

    disconnect(){
        this.socket && this.socket.disconnect()
    }
}


module.exports = store => {
    let socket = this.socket = io.connect('http://127.0.0.1:3001')
    // let socket = this.socket = io.connect('wss://wakenator-server.now.sh')

    socket.on('connect',()=>{
        this.status = 'connect'
        store.dispatch('people/CONNECTED')
    })
    socket.on('disconnect',()=>{
        this.status = 'disconnect'
        store.dispatch('people/DISCONNECTED')
    })
}




module.exports = new Client()