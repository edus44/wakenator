'use strict';

const debug = require('debug')('menu');
const electron = require('electron');
const app = electron.app;

const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const Tray = electron.Tray;
const dialog = electron.dialog;

const launcher = require('./launcher');
const path = require('path');

const version = require('../package').version;

let tray = null;
let c = 0;

let menu = null;

var self = module.exports = {

    initialize(){

        tray = new Tray(path.resolve(__dirname,'..','res','icon-white.png'));
        tray.setToolTip('Wakenator v'+version);

        tray.on('click',()=>
            tray.popUpContextMenu(menu)
        )

        debug('Initialized');

        this.update();
        launcher.isEnabled().then(this.update,this.update)

    },
    
    update(){
        let template = [];

        template.push({
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
        });

        template.unshift({
            type : 'separator',
        })

        template.unshift({
            label:'Open Baloon',
            click(){
                tray.displayBalloon({
                    title : 'Alerta de prueba',
                    content : 'Este es el mensaje'
                });
            }
        })

        template.unshift({
            label:'Open Dialog',
            click(){
                dialog.showMessageBox({
                    type:'none',
                    title : 'Tiitulo',
                    buttons : [],
                    message : 'This is the message'
                })
            }
        })

        template.unshift({
            label:'Updates:'+(c++),
            enabled : false
        })


        template.unshift({
            label:'Conectando...',
            enabled : false
        })

        menu = Menu.buildFromTemplate(template);

        tray.setContextMenu(menu);

        debug('Updated');
    }
}
