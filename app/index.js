'use strict';

const debug = require('debug')('main');

const electron = require('electron');
const app = electron.app;

const menu = require('./lib/menu');
const BroadcastingArea = require('./lib/areas/broadcasting');
const SocketioArea = require('./lib/areas/socketio');


app.on('ready', ()=> {   
    debug('READY');
    // setTimeout(app.quit,1000);
    
    if (process.platform=='darwin')
	    app.dock.hide()


    var area = new SocketioArea({
        name : require('os').hostname()
    });
    menu.initialize(area);

    area.on('people',function(people){
    	menu.setPeople(people)
    })
    area.on('wake-me',function(data){
    	debug('wake-me',data);
    })

    setTimeout(()=>{
    	area.destroy()
    },3000);
});


