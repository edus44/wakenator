'use strict';


const AutoLaunch = require('auto-launch');
const debug = require('debug')('wakenator:startup');

let launcher = new AutoLaunch({
    name: 'Wakenator app'
});



var self = module.exports = {
	isEnabled(){
		debug('checking enabled');
		return new Promise((resolve,reject)=>{
			try{
				launcher.isEnabled((enabled)=>{
				    debug('status',enabled);
				    resolve(enabled)
				});
			}catch(err){
				debug('error checking enabled',err);
				reject(err);
			}
		});
	},
	enable(){
		debug('enabling');
		return new Promise((resolve,reject)=>{
			launcher.enable((err)=>{
			    if (err){
			        debug('error enabling',err)
			        reject(err);
			    }
			    else{
			        debug('enabled');
			        resolve(true)
			    }
			})
		})
	},

	disable(){
		debug('disabling');
		return new Promise((resolve,reject)=>{
			launcher.disable((err)=>{
			    if (err){
			        debug('error disabling:'+err)
			        reject(err);
			    }
			    else{
			        debug('disabled');
			        resolve(false)
			    }
			})
		})
	},

	toggle(){
		debug('toggling');
		return self.isEnabled().then((enabled)=>{
	        if(enabled) {
	           	return this.disable()
	        }else{
	           	return this.enable()
	        }
	    });
	}
};