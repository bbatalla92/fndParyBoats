'use strict';

angular.module('fndParyBoatsApp')
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('contactForm', {
        url: '/contact',
        templateUrl: 'app/contactForm/contactForm.html',
        controller: 'contactFormCtrl'
      });
  }]);
