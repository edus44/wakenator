'use strict'

const app = require('express')()

app.get('/',(req,res)=>{
    res.send('working ok')
})  

app.listen(8000,()=>{
    console.log('node_env',process.env.NODE_ENV)
    console.log('listening 8000')
})

