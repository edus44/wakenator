'use strict';

const io = require('socket.io-client');
const EventEmitter = require('events').EventEmitter;
const debug = require('debug')('area:socketio');



module.exports = class extends EventEmitter{
	constructor(options){
		super();

		this.name = options.name;
		this.socket = io.connect('http://172.20.2.126:3002');


		this.debugEvents();

		this.socket.on('connect',()=>{
			this.broadcastMyself()
		})
		this.socket.on('disconnect',()=>{
			this.emit('people',null);
		})

		this.socket.on('wake',(person)=>{
			this.emit('wake-me',person)
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

	broadcastMyself(){
		if (!this.socket)
			return;

		debug('Broadcasting myself')

		this.socket.emit('person',{
			id : this.socket.id,
			name : this.name
		})
	}

	debugEvents(){

		//Socket events
		let eventNames = ['connect', 'error', 'disconnect', 'reconnect', 'reconnect_attempt', 'reconnecting', 'reconnect_error', 'reconnect_failed'];

		eventNames.forEach((eventName)=>{
			this.socket.on(eventName, ()=>debug(eventName, arguments))
		})

	}

	setName(name){
		this.name = name;
		this.broadcastMyself()
	}

	destroy(){
		// this.socket.disconnect();
		// this.socket = null;
		// debug('Destroyed');
	}

	messageReceived(message){
		debug('Message received: %s',message)

		this.emit('wake-me',obj)
	}
}
