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

const resPath = path.resolve(__dirname,'..','res');

let tray = null;
let c = 0;

let menu = null;
let people = null;
let area;

var self = module.exports = {

    initialize(_area){
        area = _area;
        tray = new Tray(resPath+'/icon-white.png');
        tray.setToolTip('Wakenator v'+version);

        if (process.platform=='darwin'){
            tray.setImage(resPath+'/iconTemplate.png');
            tray.setPressedImage(resPath+'/iconHover.png');
        }

        tray.on('click',()=>
            tray.popUpContextMenu(menu)
        )

        debug('Initialized');

        this.update();
        launcher.isEnabled().then(this.update,this.update)

    },

    setPeople(p){
        people = p;
        self.update();
    },

    wake(person){
        debug('WAKE',person)
        area.socket.emit('wake',person);
    },
    
    update(){
        let template =  [];

        var optionsMenu = [
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
                label : 'Cerrar',
                click : app.quit
            }
        ]

        if (true ||  process.platform == 'linux'){
            template = template.concat(optionsMenu);
        }else{
            template.push({
                label:'Opciones',
                submenu : optionsMenu
            })
        }


        template.push({
            type : 'separator',
        })

        if (area.socket && area.socket.id)
        template.push({
            label : 'Yo: '+area.name+ ' ('+area.socket.id.slice(0,4)+')',
            enabled:'false'
        })

        if (people===null){
            template.push({
                label:'Conectando...',
                enabled : false
            })
        }else
        if (!people.length){
            template.push({
                label:'Nadie cerca',
                enabled : false
            })
        }else{
            people.forEach((person)=>{
                template.push({
                    label : person.name + ' ('+person.id.slice(0,4)+')',
                    click : ()=>self.wake(person)
                })
            });
        }

        // template.unshift({
        //     label:'Open Baloon',
        //     click(){
        //         tray.displayBalloon({
        //             title : 'Alerta de prueba',
        //             content : 'Este es el mensaje'
        //         });
        //     }
        // })

        // template.unshift({
        //     label:'Open Dialog',
        //     click(){
        //         dialog.showMessageBox({
        //             type:'none',
        //             title : 'Tiitulo',
        //             buttons : [],
        //             message : 'This is the message'
        //         })
        //     }
        // })

        // template.unshift({
        //     label:'Updates:'+(c++),
        //     enabled : false
        // })


        // template.unshift({
        //     label:'Conectando...',
        //     enabled : false
        // })

        menu = Menu.buildFromTemplate(template);

        tray.setContextMenu(menu);

        debug('Updated');
    }
}
