'use strict';

const debug = require('debug')('wakenator:main');

const electron = require('electron');
const app = electron.app;

app.on('ready', ()=> {   
    debug('ready');
    // setTimeout(app.quit,1000);
    
    //Hide the icon in osx dock
    if (process.platform=='darwin')
	    app.dock.hide()

    //Dependencies
    let menu = require('./lib/menu')
    let popup = require('./lib/popup')
    let client = require('./lib/client')
    let startup = require('./lib/startup')

    client.setName('testUserName')



    //Closing app
    menu.on('close',()=>{
        debug('closing')

        menu.destroy()
        client.destroy()
        popup.destroy()

        app.quit();
    })

    //Startup handlers
    startup.isEnabled().then((enabled)=>{
        menu.setStartupEnabled(enabled);
    })
    menu.on('startup',()=>{
        startup.toggle().then((enabled)=>{
            menu.setStartupEnabled(enabled)
        })
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

})