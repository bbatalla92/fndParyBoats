'use strict';

angular.module('fndParyBoatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('boatProfile', {
        url: '/boatProfile',
        templateUrl: 'app/boatProfile/boatProfile.html',
        controller: 'profileCtrl'
      });
  });
