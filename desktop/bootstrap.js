'use strict';

const debug = require('debug')('wakenator:main');

const electron = require('electron');
const app = electron.app;


//Dependencies
const options = require('./lib/options')
const menu = require('./lib/menu')
const popup = require('./lib/popup')
const client = require('./lib/client')
const startup = require('./lib/startup')

// options.show();

//Closing app
menu.on('close',app.quit)

//Startup handlers
// startup.isEnabled().then((enabled)=>{
//     menu.setStartupEnabled(enabled);
// })
// menu.on('startup',()=>{
//     startup.toggle().then((enabled)=>{
//         menu.setStartupEnabled(enabled)
//     })
// })

//Open options view
menu.on('options',(e,bounds)=>{
    options.show(bounds);
})

//Waking somebody else
menu.on('wake-person',(person)=>{
    client.wakePerson(person)
})

//People aware
client.on('people',function(people){
    menu.setPeople(people)
})

//Waking me
client.on('wake-up',(person)=>{
    popup.show(person)
})

//Quit cleanup
app.on('before-quit',()=>{
    debug('before-quit')
    app.closing = true;

    menu.destroy()
    client.destroy()
})


debug('bootstrapped')