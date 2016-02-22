'use strict';

const debug = require('debug')('wakenator:options');
const storage = require('electron-json-storage');
const electron = require('electron')
const app = electron.app;

const EventEmitter = require('events').EventEmitter;

const BrowserWindow = electron.BrowserWindow;
const Positioner = require('electron-positioner')
const __basedir = require('path').dirname(require.main.filename);

const ipc = electron.ipcMain;
const resPath = require('path').resolve(__dirname,'..','res');

const defaultOpts = {
    // host: 'http://172.20.2.126:3002',
    server: 'http://127.0.0.1:3000',
    name : 'user',
    startup : true
}

const storageKey = 'wakenatorOptions';

class Options extends EventEmitter{

    constructor(){
        super();

        this.win = null;
        this.data = defaultOpts;


        this.recover().finally(()=>{
            this.emit('initialized')
        })

        
        //Expose to remote ipc access
        this.set = this.set;
        this.get = this.get;
        this.getAll = this.getAll;
    }

    recover(){
        // storage.set('wakenatorOptions',this.data);
        return storage.get(storageKey)
            .then((data)=>{
                debug('recovered',data)
                Object.assign(this.data,data)
                this.persist()
            })
            .catch((err)=>{
                debug('error recovering',err);
                this.persist()
            });
    }

    persist(){
        debug('persist',this.data)
        storage.set(storageKey,this.data)
            .then(()=>debug('persisted'))
            .catch((err)=>debug('error persisiting',err))
    }

    get(key){
        return this.data[key];
    }

    set(key,val){  
        debug('changed',key,val);
        var old = this.data[key];
        this.data[key] = val;
        this.persist()
        this.emit('watch:'+key,val,old);
    }

    getAll(){
        return this.data;
    }

    show(){
        debug('show')

        if (this.win){
            this.win.show();
            this.win.focus();
            return;
        }

        this.win = new BrowserWindow({
            show: false,
            frame: true,
            title : 'Options - Wakenator',
            icon : resPath+'/icon-white.png',


            resizable:false,
            movable:true,
            minimizable:true,
            maximizable:false,
            fullscreenable:false,

            backgroundColor:'#fff',

            alwaysOnTop : false,
            skipTaskbar : false
        })

        this.win.positioner = new Positioner(this.win)

        this.win.setVisibleOnAllWorkspaces(true)
        this.win.setMenu(null)
        this.win.setSize(400,400)

        this.win.loadURL('file:///'+__basedir+'/view/options/index.html')

        
        this.win.positioner.move('center')

        // this.win.setSize(1000,600)
        // this.win.webContents.openDevTools()
        // this.win.show()

        this.win.focus()


        this.win.on('close',(e)=>{
            this.win = null;
            debug('close')
        })
        this.win.on('will-navigate',(e)=>{
            e.preventDefault()
        })

    }
}

module.exports = new Options();
