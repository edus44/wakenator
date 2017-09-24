'use strict'

const { Tray, Menu } = require('electron')
const path = require('path')
const assetsDirectory = path.resolve(__dirname, '../res')
const {EventEmitter} = require('events')
const debug = require('debug')('wk:tray')

module.exports = class WkTray extends EventEmitter{
    constructor(){
        super()
        debug('init')

        let icon  = path.join(assetsDirectory, 'icon-white.png')

        this.tray = new Tray(icon)
        this.tray.on('click', this.click.bind(this))


        const contextMenu = Menu.buildFromTemplate([
            {label: 'Item1', type: 'radio'},
            {label: 'Item2', type: 'radio'},
            {label: 'Item3', type: 'radio', checked: true},
            {label: 'Item4', type: 'radio'}
        ])
        this.tray.setContextMenu(contextMenu)

        // this.tray.on('right-click', this.click.bind(this))
        this.tray.setToolTip('Wakenator')
    }

    click(e,bounds){
        debug('clicked',bounds)
        this.emit('click',e,bounds)
    }
}