'use strict';

angular.module('fndParyBoatsApp')
  .config(['$stateProvider',function($stateProvider) {
    $stateProvider.state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'mainCtrl'
    });
  }]);
