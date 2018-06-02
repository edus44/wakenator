
const io = require('socket.io-client')
const EventEmitter = require('eventemitter3')
const debug = require('debug')('wk:client')


class Client extends EventEmitter{
    constructor(){
        super()
        this.socket = null
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
            this.emit('connect')
        })
        this.socket.on('disconnect',()=>{
            this.emit('disconnect')
        })
        this.socket.on('people',(people)=>{
            this.emit('people',people)
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

module.exports = new Client()