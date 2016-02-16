'use strict'

const debug = require('debug')('wakenator:external-api')

const express = require('express')
const bodyParser = require('body-parser')



module.exports = function(app,peopleServer,token){

	app.use(bodyParser.urlencoded({extended:false}))

	app.post('/wake',function(req,res){
		if (!req.body || req.body.token != token){
			debug('request','invalid token',req.body)
			return res.json({error:'Invalid token'})
		}

		let ofName = req.body.user_name || req.body.from_name
		let toName = (req.body.text && req.body.text.slice(1)) || req.body.to_name

		let result = peopleServer.wakeWithNames(ofName,toName)
		
		debug('request','sent to',result,req.body)

		if (!result)
			res.json({error:'Names not found'})
		else
			res.json({text:'Sent to '+result})
	})
}