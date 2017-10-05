'use strict'

const { Tray, Menu } = require('electron')
const path = require('path')
const {EventEmitter} = require('events')
const debug = require('debug')('wk:tray')
const {version} = require('../package')

function getAsset(file){
    return path.resolve(__dirname, '../res',file)
}

module.exports = class WkTray extends EventEmitter{
    constructor(){
        super()
        debug('init')

        this.tray = new Tray(getAsset('icon-white.png'))
        this.tray.on('click', this.click.bind(this))

        if (process.platform=='darwin'){
            this.tray.setImage(getAsset('iconTemplate.png'))
            this.tray.setPressedImage(getAsset('iconHover.png'))
        }

        const contextMenu = Menu.buildFromTemplate([
            {label: 'Open',click:this.click.bind(this)},
            {type: 'separator'},
            {label: 'Quit',click:this.quit.bind(this)}
        ])
        this.tray.setContextMenu(contextMenu)

        this.tray.on('right-click', this.click.bind(this))
        this.tray.setToolTip('Wakenator v'+version)
    }

    click(e,bounds){
        debug('clicked',bounds)
        this.emit('click',e)
    }

    quit(e){
        debug('quit')
        this.emit('quit',e)
    }
}