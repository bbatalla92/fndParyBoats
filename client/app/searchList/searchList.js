'use strict';

angular.module('fndParyBoatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('searchList', {
        url: '/search',
        templateUrl: 'app/searchList/searchList.html',
        controller: 'searchCtrl',
        reload: true
      });
  });
