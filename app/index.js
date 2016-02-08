'use strict';

const debug = require('debug')('main');

const electron = require('electron');
const app = electron.app;

const menu = require('./lib/menu');
const BroadcastingArea = require('./lib/areas/broadcasting');


app.on('ready', ()=> {   
    debug('READY');
    // setTimeout(app.quit,1000);
    
    if (process.platform=='darwin')
	    app.dock.hide()

    menu.initialize();

    var area = new BroadcastingArea();

    area.on('people-list',function(people){
    	debug('people list',arguments);
    })
    area.on('wake-me',function(data){
    	debug('wake-me',data);
    })

    setTimeout(()=>{
    	area.destroy()
    },3000);
});


