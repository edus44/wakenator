'use strict';

const debug = require('debug')('wakenator:options');
const electron = require('electron')
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;
const Positioner = require('electron-positioner')
const __basedir = require('path').dirname(require.main.filename);

class Options {

    constructor(){
        this.win = null;
    }

    show(){
        if (!this.win)
            this.create()

        debug('show')

        if (!this.win.isVisible())
            this.win.loadURL('file:///'+__basedir+'/view/options.html')

        this.win.setSize(400,400)
        this.win.positioner.move('center')
        this.win.show()
        this.win.focus()
    }

    create(){
        debug('create')

        this.win = new BrowserWindow({
            show: false,
            frame: true,

            resizable:false,
            movable:true,
            minimizable:false,
            maximizable:false,
            fullscreenable:false,

            backgroundColor:'#fff',

            alwaysOnTop : true,
            skipTaskbar : false
        })

        this.win.positioner = new Positioner(this.win)

        this.win.setVisibleOnAllWorkspaces(true)
        this.win.setMenu(null)

        this.win.on('close',(e)=>{
            if (app.closing)
                return;

            debug('close')
            this.win.hide();
            e.preventDefault()
        })

    }
}

module.exports = new Options();
