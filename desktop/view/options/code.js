// code.js

(function() {
	'use strict';

	var ipc = require('electron').ipcRenderer;
	var remote = require('remote');
	var win = remote.getCurrentWindow();
	var options = remote.require('./lib/options');
	var client = remote.require('./lib/client');



	angular.module('optionsApp', ['ngMaterial'])
	    .controller('MainCtrl', function($scope) {


	        win.show()

	        $scope.opts = angular.extend({}, options.getAll());

	        $scope.$watch('opts.name',function(val){
	        	options.set('name',val)
	        });
	        $scope.$watch('opts.startup',function(val){
	        	options.set('startup',val)
	        });
	        $scope.$watch('opts.server',function(val){
	        	options.set('server',val)
	        });


	        $scope.closeWindow = function(){
	        	win.hide()
	        }


	        $scope.people = client.people || null;

	        ipc.on('people',function(){
	        	console.log('people',arguments);
		        $scope.people = client.people
		        $scope.$apply();
	        })
	    })

})();