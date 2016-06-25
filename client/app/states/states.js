'use strict';

angular.module('fndParyBoatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('states', {
        url: '/states',
        templateUrl: 'app/states/states.html',
        controller: 'locationCtrl'
      });
  });
