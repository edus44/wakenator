'use strict';

const EventEmitter = require('events').EventEmitter;
const dgram = require('dgram');

const listenPort = 5007;
const debug = require('debug')('area:broadcasting');

module.exports = class extends EventEmitter{
	constructor(options){
		super();

		let socket = this.socket = dgram.createSocket('udp4');

		socket.on('listening', function () {
		    var address = socket.address();
		    debug('Listening on ' + address.address + ":" + address.port);
		    socket.setBroadcast(true);
		});

		socket.on('message', this.messageReceived.bind(this) );

		socket.bind(listenPort);

		this.timer = setInterval(()=>{
			this.broadcastMyself()
		},1000);
	}

	destroy(){
		this.socket.close();
		this.socket = null;
		clearInterval(this.timer);
		debug('Destroyed');
	}

	send(obj){
		if (!this.socket){
			debug('Not sending, socket closed');
			return;
		}

		let str = typeof obj == 'string' ? obj : JSON.stringify(obj);

		debug('send: %s',str)

		let message = new Buffer(str);
		this.socket.send(message, 0, message.length, listenPort);
	}

	broadcastMyself(){
		debug('Broadcasting myself');

		this.send({
			id : 1,
			name : 'myself',
			ts : Date.now()
		})
	}

	messageReceived(message){
		debug('Message received: %s',message)

		let obj;
		try{
			obj = JSON.parse(message.toString());
		}catch(e){}

		if (!obj || !obj.id)
			return;

		this.emit('wake-me',obj)
	}
}
