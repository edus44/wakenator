'use strict';

const debug = require('debug')('wakenator:popup');

const BrowserWindow = require('electron').BrowserWindow;

var __basedir = require('path').dirname(require.main.filename);

class Popup {

    constructor(){

        this.win = new BrowserWindow({
            show: false,
            frame: false,
            width:400,
            height:400,
            center : true,
            'always-on-top' : true,
            'skip-taskbar' : true
        })

        this.win.setVisibleOnAllWorkspaces(true)

        this.win.on('blur',()=>{
            this.win.hide();
        })

        debug('initialized')
    }


    show(person){
        
        this.win.loadURL('file:///'+__basedir+'/view/wake.html?'+person.name)
        
        // positioner.move('center')
        if (!this.win.isMaximized())
            this.win.maximize()

        this.win.show()
        this.win.focus()

        // this.win.webContents.openDevTools()
        debug('show',person);
    }

    destroy(){
        this.win.destroy();
        this.win = null;
        debug('destroyed')
    }
}

module.exports = new Popup();
