'use strict';

const io = require('socket.io-client');
const EventEmitter = require('events').EventEmitter;
const debug = require('debug')('wakenator:client');



class Client extends EventEmitter{
	constructor(){
		super()

		this.person = {
			host : require('os').hostname(),
			name : ''
		}

		this.socket = io.connect('http://127.0.0.1:3000');

		this.debugEvents();

		this.socket.on('connect',()=>{
			this.person.id = this.socket.id
			this.broadcastMyself()
		})

		this.socket.on('disconnect',()=>{
			this.emit('people',null);
		})

		this.socket.on('wake-up',(person)=>{
			this.emit('wake-up',person)
		})

		this.socket.on('people',(people)=>{
			debug('people',people);
			var list = [];
			if (people && people.length)
				people.forEach((person)=>{
					if (person.id != this.socket.id)
						list.push(person)
				})
			this.emit('people',list);
		})

	}

	getPerson(){
		return this.person;
	}

	wakePerson(person){
		if (!this.socket || !this.socket.id || !this.person.name)
			return;
		debug('waking',person)
		this.socket.emit('wake-person',person);
	}

	setName(name){
		this.person.name = name;
		this.broadcastMyself()
	}

	broadcastMyself(){
		if (!this.socket || !this.socket.id || !this.person.name)
			return;

		debug('broadcasting myself',this.person.name+'@'+this.person.host)

		this.socket.emit('person',this.person)
	}

	debugEvents(){

		//Socket events
		let eventNames = ['connect', 'error', 'disconnect', 'reconnect', 'reconnect_attempt', 'reconnecting', 'reconnect_error', 'reconnect_failed'];

		eventNames.forEach((eventName)=>{
			this.socket.on(eventName, ()=>debug(eventName, arguments))
		})

	}


	destroy(){
		this.socket && this.socket.disconnect && this.socket.disconnect();
	}

}



module.exports = new Client();