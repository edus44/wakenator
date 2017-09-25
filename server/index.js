'use strict'

const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server,{pingInterval:60000})

app.get('/',(req,res)=>{
    res.send('working ok')
})  

server.listen(3001,()=>{
    console.log('node_env',process.env.NODE_ENV)
    console.log('listening 3001')
})


io.on('connection', function (socket) {
    console.log('connected')
});