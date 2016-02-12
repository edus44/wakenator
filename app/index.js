'use strict';

const debug = require('debug')('main');

const electron = require('electron');
const app = electron.app;

const menu = require('./lib/menu');
const BroadcastingArea = require('./lib/areas/broadcasting');
const SocketioArea = require('./lib/areas/socketio');
const Positioner = require('electron-positioner')



const BrowserWindow = require('electron').BrowserWindow;


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
    	debug('wake-me!!!!!!!!!!!!!',data);
    	showWindow(data)
    })

    createWindow();
});


let win;
let positioner;

app.on('will-quit',()=>{
	win.destroy()
	win=null
})


function createWindow() {
    var winOpts = {
        show: false,
        frame: false,
        width:400,
        height:400,
        center : true,
        'always-on-top' : true,
        'skip-taskbar' : true
    }

    win = new BrowserWindow(winOpts)
    positioner = new Positioner(win)

    win.setVisibleOnAllWorkspaces(true)

    win.on('blur',()=>{
    	win.hide();
    })
}

function showWindow(data){

	win.loadURL('file:///'+__dirname+'/view/wake.html?'+data.name)
	
	// positioner.move('center')
	if (!win.isMaximized())
		win.maximize()
	win.show()
	win.focus()
	// win.webContents.openDevTools()
	debug('Window showed');
}