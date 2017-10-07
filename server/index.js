'use strict'

// Enable debug in in development mode
if (process.env.NODE_ENV == 'development')
    require('debug').enable('wk*')

const debug = require('debug')('wk:main')
debug('init')

// Get server deps
const http = require('http')
const people = require('./people')
const api = require('./api')

// Load server
const server = http.Server(api())
people(server)

// Start listening
server.listen(13370,()=>{
    debug('listening 13370')
})