
const io = require('socket.io-client')
const EventEmitter = require('eventemitter3')
const debug = require('debug')('wk:client')


class Client extends EventEmitter{
    constructor(){
        super()
        this.store = null
        this.socket = null
    }

    setStore(store){
        this.store = store
    }
    
    connect(server){
        this.socket && this.socket.disconnect()
        this.socket = io.connect(server)
        this._bind()
    }

    announce(data){
        this.socket.emit('announce',data)
    }

    _bind(){
        this._debugEvents()

        this.socket.on('connect',()=>{
            this.store.dispatch('people/clientConnected')
        })
        this.socket.on('disconnect',()=>{
            this.store.dispatch('people/clientDisconnected')
        })
        this.socket.on('people',(people)=>{
            this.store.dispatch('people/clientPeople',people)
        })
    }

    _debugEvents(){

        //Socket events
        let eventNames = ['connect', 'error', 'disconnect', 'reconnect', 'reconnect_attempt', 'reconnecting', 'reconnect_error', 'reconnect_failed']

        eventNames.forEach((eventName,...args)=>{
            this.socket.on(eventName, ()=>debug('io:'+eventName, args))
        })

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