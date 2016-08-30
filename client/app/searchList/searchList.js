'use strict';

angular.module('fndParyBoatsApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('searchList', {
        url: '/search?:state',
        templateUrl: 'app/searchList/searchList.html',
        controller: 'searchCtrl',
        reload: true,
        
      });

      
  });
