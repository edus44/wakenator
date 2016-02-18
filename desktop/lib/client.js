'use strict';

const io = require('socket.io-client');
const EventEmitter = require('events').EventEmitter;
const debug = require('debug')('wakenator:client');

const ipc = require('electron').ipcMain;

const options = require('./options');
const hostname = require('os').hostname();

class Client extends EventEmitter{
	constructor(){
		super()
		this.people = null;

		options.on('watch:server',(server)=>{
			debug(server)
			this.setServer(server)
		})
		options.on('watch:name',(name)=>{
			this.setName(name)
		})

		this.start()
	}

	start(){

		this.destroy();

		let name = options.get('name')
		let server = options.get('server')


		this.person = {
			host : hostname,
			name : name || 'user'
		}

		if (!server){
			debug('no server addr specified')
			return;
		}


		debug('connecting', server)

		this.socket = io.connect(server);

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

			this.people = list;
			ipc.emit('people',list);
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
		this.person.name = name.toString() || 'user';
		this.broadcastMyself()
	}

	setServer(server){
		this.server = server;
		this.start()
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
			this.socket.on(eventName, ()=>debug('io:'+eventName, arguments))
		})

	}


	destroy(){
		this.socket && this.socket.disconnect && this.socket.disconnect();
	}

}



module.exports = new Client();