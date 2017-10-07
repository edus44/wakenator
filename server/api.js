'use strict'

const express = require('express')

module.exports = ()=>{
    let app = express()

    app.get('/',(req,res)=>{
        res.send('working ok')
    })  

    return app
}