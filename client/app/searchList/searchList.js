'use strict';

angular.module('fndParyBoatsApp')
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('searchList', {
        url: '/search/:crit',
        templateUrl: 'app/searchList/searchList.html',
        controller: 'searchCtrl',
        reload: true
        
      });

      
  }]);
