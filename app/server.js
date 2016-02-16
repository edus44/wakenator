var io = new require('socket.io')(3002);

console.log('Listening',3002);
function getSocket(id){
	return io.sockets.connected['/#'+id];
}


function getPeople(){
	var people = [];
	for(var id in io.sockets.connected){
		var person = io.sockets.connected[id].person;
		if (person)
			people.push(person);
	}
	return people;
}


function broadcastPeople(){
	var people = getPeople();
		
	console.log('Connected:',people.length);
	io.emit('people',people);
}

function wakeFromSlack(who,to){
	var people = getPeople();

	people.forEach(function(person){
		var from = getSocket(person.id);
		if (!other || other.id == socket.id)
			return false;
		other.emit('wake',socket.person);	
	});
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


//npm install express serve-index
try {
    var express = require('express');
    var bodyParser = require('body-parser');
    var serveIndex = require('serve-index')

    var app = express();

    var slackToken = 'hXruNf1x2joh5hgLzQRR4fmX';

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.post('/slack-integration',function(req,res){
    	if (!req.body || req.body.token != slackToken)
    		return;

    	console.log(req.body.user_name , req.body.text.slice(1));
    	// var result = wakeFromSlack( req.body.user_name , req.body.text.slice(1) );
    	// res.json({text:'Hola!!!'})
    	// var text = result.name;
    	var text = req.body.user_name + req.body.text.slice(1);
    	res.json({text:text }); 
   });
    app.use('/',serveIndex(__dirname+'/../build', {'icons': true}));
    app.use(express.static(__dirname+'/../build'));
    app.listen(3003,function(){
    	console.log('listening express 3003');
    });
} catch(e) {
	console.log(e);
}