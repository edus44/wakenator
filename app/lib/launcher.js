'use strict';


const AutoLaunch = require('auto-launch');
const debug = require('debug')('launcher');

let launcher = new AutoLaunch({
    name: 'Wakenator app'
});



var self = module.exports = {
	enabled : false,
	isEnabled(){
		debug('isEnabled');
		return new Promise((resolve,reject)=>{
			try{
				launcher.isEnabled((enabled)=>{
				    debug('isEnabled:',enabled);
				    this.enabled = enabled;
				    resolve(enabled)
				});
			}catch(e){
				debug('Error checking enabled',e);
				resolve(false);
			}
		});
	},
	enable(){
		debug('Enabling');
		return new Promise((resolve,reject)=>{
			launcher.enable((err)=>{
			    if (err){
			        debug('Error enabling',err)
			        reject(err);
			    }
			    else{
			        debug('Enabled');
			        this.enabled = true;
			        resolve(true)
			    }
			})
		})
	},

	disable(){
		debug('Disabling');
		return new Promise((resolve,reject)=>{
			launcher.disable((err)=>{
			    if (err){
			        debug('Error disabling:'+err)
			        reject(err);
			    }
			    else{
			        debug('Disabled');
			        this.enabled = false;
			        resolve(false)
			    }
			})
		})
	},

	toggle(){
		debug('Toggling');
		return self.isEnabled().then((enabled)=>{
	        if(enabled) {
	           	return this.disable()
	        }else{
	           	return this.enable()
	        }
	    });
	}
};