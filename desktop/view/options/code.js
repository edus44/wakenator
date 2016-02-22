// code.js

(function() {
	'use strict';

	angular.module('optionsApp', ['ngMaterial'])
	    .controller('MainCtrl', function($scope) {

	    	//Remote objects
	    	var remote = require('remote');
	    	var options = remote.require('./lib/options');
	    	var client = remote.require('./lib/client');


	    	//Fetch options
	        $scope.opts = angular.extend({}, options.getAll());

	        //Watch for changes
	        $scope.$watch('opts.name',function(val){
	        	options.set('name',val)
	        });
	        $scope.$watch('opts.startup',function(val){
	        	options.set('startup',val)
	        });
	        $scope.$watch('opts.server',function(val){
	        	options.set('server',val)
	        });

	        //Close window
	        $scope.closeWindow = function(){
	        	win.close()
	        }


	        //People listener
	        $scope.people = client.people || null;

	        function peopleListener(val){
		        $scope.people = val
		        $scope.$apply();
	        }
	        client.on('people',peopleListener)

	        //Window handler
	        var win = remote.getCurrentWindow();
	        win.show()

	        //Free listeners
	        win.on('close',function(e){
	        	client.removeListener('people',peopleListener);
	        })
	    })

})();