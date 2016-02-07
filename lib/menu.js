'use strict';

const debug = require('debug')('menu');
const electron = require('electron');
const app = electron.app;

const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const Tray = electron.Tray;

const launcher = require('./launcher');
const path = require('path');

const version = require('../package').version;

let tray = null;
let c = 0;

let menu = null;

var self = module.exports = {

    initialize(){

        tray = new Tray(path.resolve(__dirname,'..','res','icon.png'));
        tray.setToolTip('Wakenator v'+version);

        tray.on('click',()=>
            tray.popUpContextMenu(menu)
        )

        debug('Initialized');

        this.update();
        launcher.isEnabled().then(this.update,this.update)

    },
    
    update(){
        let template = [
            {
                label : 'Opciones',
                submenu : [
                    {
                        label : 'Cargar al inicio',
                        type:'checkbox',
                        checked : launcher.enabled,
                        click(){
                            launcher.toggle()
                                .then(self.update,self.update)
                        }
                    },
                    {
                        label : 'Salir',
                        click : app.quit
                    }
                ],
            },
            {
                type : 'separator'
            }
        ];

        template.push({
            label:'Updates:'+(c++),
            enabled : false
        })

        template.push({
            type : 'separator'
        })


        template.push({

            label:'Conectando...',
            enabled : false
        })

        menu = Menu.buildFromTemplate(template);
        tray.setContextMenu(menu);

        debug('Updated');
    }
}
