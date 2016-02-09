var io = new require('socket.io')(3002);

console.log('Listening',3002);
function getSocket(id){
	return io.sockets.connected['/#'+id];
}

function broadcastPeople(){
	var people = [];
	for(var id in io.sockets.connected){
		people.push(io.sockets.connected[id].person);
	}
		
	console.log('Connected:',people.length);
	io.emit('people',people);
}

io.on('connection',function(socket){
	console.log('connected');
	socket.on('person',function(person){
		console.log('Person',person);
		socket.person = person;
		broadcastPeople();
	});

	socket.on('disconnect',function(){
		broadcastPeople();
	});

	socket.on('wake',function(data){
		var other = getSocket(data.id);
		if (!other || other.id == socket.id)
			return false;
		other.emit('wake',socket.person);		
	});

});


