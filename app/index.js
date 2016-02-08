'use strict';

const debug = require('debug')('main');

const electron = require('electron');
const app = electron.app;

const menu = require('./lib/menu');


app.on('ready', ()=> {   
    debug('READY');
    // setTimeout(app.quit,1000);
    
    app.dock.hide();

    menu.initialize();
});


