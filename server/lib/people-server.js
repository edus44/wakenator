'use strict'

const debug = require('debug')('wakenator:people-server');
const socketio = require('socket.io')


class Person{
	constructor(data){
		Object.assign(this,data);
	}
	toString(){
		// return '@'+this.name + '['+this.host+']';
		return this.name + '@'+this.host;
	}
}

class PeopleServer{


	constructor(server){

		this.io = new socketio(server);
		this.io.on('connection',(socket)=>{
			this.socketConnected(socket)
		});

		debug('initialized')
	}


	socketConnected(socket){
		debug('new socket',socket.id)

		socket.on('person',(personData)=>{
			if (!personData.name || !personData.host)
				return debug('bad person format',personData);

			let person = new Person(personData);

			debug('new person',person.toString())

			socket.person = person;
			this.broadcastPeople()
		});

		socket.on('disconnect',()=>{
			debug('person disconnected',socket.person+'')
			socket = null;
			this.broadcastPeople()
		});

		socket.on('wake',(data)=>{
			let toSocket = this.getSocketFromId(data.id)

			if (!toSocket || !socket.person || !toSocket.person || toSocket.id == socket.id )
				return false;
			
			debug('waking',toSocket.person.toString(),'to',socket.person.toString())
			toSocket.emit('wake',socket.person)
		});

	}


	broadcastPeople(){
		let people = this.getConnectedPeople()
			
		debug('people connected',people.length)
		this.io.emit('people',people)
	}


	wakeWithNames(ofName,toName){
		let ofSocket = this.getSocketFromName(ofName);
		let toSocket = this.getSocketFromName(toName);

		if (!ofSocket || !toSocket || !ofSocket.person || !toSocket.person || ofSocket.id == toSocket.id)
			return false;

		debug('waking with names',toSocket.person.toString(),'to',ofSocket.person.toString())
		toSocket.emit('wake',ofSocket.person)
		
		return toSocket.person.toString()
	}


	getSocketFromName(name){
		for(let id in this.io.sockets.connected){
			let socket = this.io.sockets.connected[id];
			if (socket.person && socket.person.name==name)
				return socket;
		}

		return null;
	}


	getSocketFromId(id){
		return this.io.sockets.connected['/#'+id.replace('/#','')];
	}


	getConnectedPeople(){
		let people = [];

		for(let id in this.io.sockets.connected){
			let person = this.io.sockets.connected[id].person;
			if (person)
				people.push(person);
		}

		return people;
	}


}


module.exports = (server)=> new PeopleServer(server)