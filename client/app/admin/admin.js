'use strict';

angular.module('fndParyBoatsApp')
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'adminCtrl'
      });
  }]);
