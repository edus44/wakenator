'use strict'

const SocketIO = require('socket.io')
const debug = require('debug')('wk:people')


class Person{
    constructor(id,{host}){
        this.id = id
        this.host = host
    }
    toString(){
        return this.host
    }
}


class PeopleServer{

    /**
     * @param  {httpServer} server 
     */
    constructor(server){

        this.io = new SocketIO(server,{pingInterval:60000})
        this.io.on('connection',(socket)=>{
            this.bind(socket)
        })

        debug('initialized')
    }


    bind(socket){
        debug('new socket',socket.id)

        socket.on('announce',(personData)=>{
            let person = new Person(socket.id,personData)

            debug('new person',person.toString())

            socket.person = person
            this.broadcastPeople()
        })

        socket.on('disconnect',()=>{
            debug('person disconnected',socket.person+'')
            socket = null
            this.broadcastPeople()
        })

        socket.on('wake-person',(data)=>{
            let toSocket = this.getSocketFromId(data.id)

            if (!toSocket || !socket.person || !toSocket.person || toSocket.id == socket.id )
                return false
            
            debug('waking up',toSocket.person.toString(),'to',socket.person.toString())
            toSocket.emit('wake-up',socket.person)
        })

    }


    broadcastPeople(){
        let people = this.getConnectedPeople()
            
        debug('people connected',people.length)
        this.io.emit('people',people)
    }


    wakeWithNames(ofName,toName){
        let ofSocket = this.getSocketFromName(ofName)
        let toSocket = this.getSocketFromName(toName)

        if (!ofSocket || !toSocket || !ofSocket.person || !toSocket.person || ofSocket.id == toSocket.id)
            return false

        debug('waking up with names',toSocket.person.toString(),'to',ofSocket.person.toString())
        toSocket.emit('wake-up',ofSocket.person)

        return toSocket.person.toString()
    }


    getSocketFromName(name){
        for(let id in this.io.sockets.connected){
            let socket = this.io.sockets.connected[id]
            if (socket.person && socket.person.name==name)
                return socket
        }

        return null
    }


    getSocketFromId(id){
        return this.io.sockets.connected['/#'+id.replace('/#','')]
    }


    getConnectedPeople(){
        let people = []

        for(let id in this.io.sockets.connected){
            let person = this.io.sockets.connected[id].person
            if (person)
                people.push(person)
        }

        return people
    }


}


module.exports = (server)=> new PeopleServer(server)