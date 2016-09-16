'use strict';

angular.module('fndParyBoatsApp')
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'aboutCtrl'
      });
  }]);
