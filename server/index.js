'use strict'

const token = process.env.TOKEN || 'hXruNf1x2joh5hgLzQRR4fmX'
const port = process.env.PORT || 3000

const debug = require('debug')('wakenator:main')
const express = require('express')
const http = require('http')

let app = express()  
let server = http.createServer(app)  

let peopleServer = require('./lib/people-server')(server)

if (process.env.NO_EXTERNAL_API != 1){
	require('./lib/external-api')(app,peopleServer,token)
}

server.listen(port,()=>
	debug('listening on '+port
))  
