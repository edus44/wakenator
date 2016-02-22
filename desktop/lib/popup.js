'use strict';

const debug = require('debug')('wakenator:popup');
const electron = require('electron')

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;
const Positioner = require('electron-positioner')

var __basedir = require('path').dirname(require.main.filename);

class Popup {

    constructor(){
        this.win = null;
        this.create()
    }


    show(person){
        if (!this.win)
            this.create()

        this.win.loadURL('file:///'+__basedir+'/view/wake.html?'+person.name+'@'+person.host)
        
        // positioner.move('center')
        if (!this.win.isMaximized())
            this.win.maximize()

        // this.win.show()
        // this.win.focus()

        // this.win.webContents.openDevTools()
        debug('show',person);
    }

    create(){
        this.win = new BrowserWindow({
            show: false,
            frame: false,

            resizable:false,
            movable:false,
            minimizable:false,
            maximizable:false,
            fullscreenable:false,

            alwaysOnTop : true,
            skipTaskbar : true
        })

        this.win.setVisibleOnAllWorkspaces(true)

        this.win.on('blur',()=>{
            debug('blur')
            this.win.hide();
        })
        this.win.on('close',(e)=>{
            if (app.closing)
                return;
            

            debug('close')
            this.win.hide();
            e.preventDefault()
        })

        debug('initialized')
    }


}

module.exports = new Popup();
