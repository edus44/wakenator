'use strict';

const debug = require('debug')('wakenator:menu');

const version = require('../package').version
const EventEmitter = require('events').EventEmitter

const electron = require('electron');
const Menu = require('electron').Menu;
const MenuItem = require('electron').MenuItem;
const Tray = require('electron').Tray;

const resPath = require('path').resolve(__dirname,'..','res');
const client = require('./client');

class WkMenu extends EventEmitter{

    constructor(){
        super();

        this.menu = null;
        this.people = null;
        this.startupEnabled = false;

        this.tray = new Tray(resPath+'/icon-white.png');
        this.tray.setToolTip('Wakenator v'+version);

        //Template images for osx
        if (process.platform=='darwin'){
            this.tray.setImage(resPath+'/iconTemplate.png');
            this.tray.setPressedImage(resPath+'/iconHover.png');
        }

        //Open on left-click
        this.tray.on('click',(e,bounds)=>{
            this.tray.popUpContextMenu(this.menu)
            this.emit('click')
        })

        debug('initialized');

        this.render();
    }


    setPeople(people){
        this.people = people
        this.render()
    }
    setStartupEnabled(bool){
        this.startupEnabled = bool;
        this.render()
    }


    render(){
        if (!this.tray)
            return;

        let person = client.getPerson()

        //Basics template
        let basicsTpl = [
            {
                label:person.name+'@'+person.host+' (me)',
                enabled : false
            },
            {
                type : 'separator'
            },
            {
                label : 'Options',
                click : (e,bounds)=>{
                    this.emit('options',e,bounds)
                }
            },
            // {
            //     label : 'Load at startup',
            //     type:'checkbox',
            //     checked : this.startupEnabled,
            //     click : ()=>{
            //         this.emit('startup')
            //     }
            // },
            {
                label : 'Close',
                click : ()=>{
                    this.emit('close')
                }
            }
        ];

        //People template
        let listTpl = [];

        if (this.people === null){
            listTpl.push({
                label:'Connecting...',
                enabled : false
            })
        }

        else if (!this.people.length){
            listTpl.push({
                label:'Nobody around',
                enabled : false
            })
        }

        else {
            this.people.forEach((person)=>{
                listTpl.push({
                    label : person.name + '@'+person.host,
                    click : ()=>{
                        this.emit('wake-person',person)
                    }
                })
            });
        }


        //Final compositing
        let template = []
        if (process.platform == 'darwin'){
            template = template.concat(basicsTpl.reverse())
            template = template.concat(listTpl)
        }
        else{
            template = template.concat(listTpl)
            template = template.concat(basicsTpl)
        }


        //Aplying to tray context menu
        this.menu = Menu.buildFromTemplate(template);
        this.tray.setContextMenu(this.menu);

        debug('rendered');
    }

    destroy(){
        this.tray && this.tray.destroy()
        this.tray = null
        debug('tray destroyed')
    }
}

module.exports = new WkMenu();
