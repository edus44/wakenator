'use strict'

const debug = require('debug')('wakenator:external-api')

const express = require('express')
const bodyParser = require('body-parser')



module.exports = function(app,peopleServer,token){
	debug('initialized','token='+token)

	app.use(bodyParser.urlencoded({extended:false}))

	/**
	 * POST /wake
	 *   token : {secureToken}
	 *   (user_name|from_name) : {emisor}
	 *   (text|to_name) : {receptor} 
	 */
	app.post('/wake',function(req,res){

		//Checks form token
		if (!req.body || req.body.token != token){
			debug('request','invalid token',req.body)
			return res.json({error:'Invalid token'})
		}

		//Fetch names
		let ofName = req.body.user_name || req.body.from_name
		let toName = (req.body.text && req.body.text.replace('@','')) || req.body.to_name

		//Calls people-server
		let result = peopleServer.wakeWithNames(ofName,toName)
		
		debug('request','sent to',result,req.body)

		//Sends the result
		if (!result)
			res.json({text:'User '+toName+' not found'})
		else
			res.json({text:'Sent to '+result})
	})
}