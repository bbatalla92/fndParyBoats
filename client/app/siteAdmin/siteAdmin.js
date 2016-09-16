'use strict';

angular.module('fndParyBoatsApp')
.config(['$stateProvider',function ($stateProvider) {
	$stateProvider
	.state('siteAdmin', {
		url: '/siteAdmin',
		templateUrl: 'app/siteAdmin/siteAdmin.html',
		controller: 'siteAdminCtrl'
	});
}]);
