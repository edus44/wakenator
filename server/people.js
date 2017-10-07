'use strict'

const socketIo = require('socket.io')
const debug = require('debug')('wk:people')


module.exports = function(server){
    const io = socketIo(server,{pingInterval:60000})
    
    io.on('connection', function (socket) {
        debug('connected')
    })
}
