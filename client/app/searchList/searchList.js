'use strict';

angular.module('fndParyBoatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('searchList', {
        url: '/searchList',
        templateUrl: 'app/searchList/searchList.html',
        controller: 'searchCtrl'
      });
  });
