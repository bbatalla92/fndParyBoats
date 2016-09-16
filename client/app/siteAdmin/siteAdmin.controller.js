'use strict';
(function(){

	angular.module('fndParyBoatsApp')
	.controller('siteAdminCtrl', ['$scope', 'util', 'dbService',function($scope, util, dbService){

		var user = dbService.getCurrentUser();


		$scope.charterList = [];

		dbService.getAdminBoatList(user).then(function(data){
			for(var x in data){
				dbService.getCharterByID(x).then(function(boat){
					$scope.charterList.push(boat);
				});
			}
		});


		$scope.setBoat = function(charter){
			util.setCharter(charter);
		};

		$scope.sendEmail = function(boat){
			dbService.sendNewCharterEmail(boat);
		}


	}]);})();
