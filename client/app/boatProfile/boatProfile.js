'use strict';

angular.module('fndParyBoatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('boatProfile', {
        url: '/charter?:id',
        templateUrl: 'app/boatProfile/boatProfile.html',
        controller: 'profileCtrl'
      });
  });
