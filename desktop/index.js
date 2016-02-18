'use strict';

const debug = require('debug')('wakenator:main');

const electron = require('electron');
const app = electron.app;

app.on('ready', ()=> {   
    debug('ready');
    // setTimeout(app.quit,1000);
    
    
    if (process.platform=='darwin')
        app.dock.hide() //Hide the icon in osx dock


    //Initialize options, then bootstrap the application
    const options = require('./lib/options')

    options.once('initialized',()=>{
        require('./bootstrap')
    })

})


process.on('exit', function (code) {
    console.log('process exited with',code);
});