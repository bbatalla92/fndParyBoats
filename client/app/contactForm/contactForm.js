'use strict';

angular.module('fndParyBoatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('contactForm', {
        url: '/contact',
        templateUrl: 'app/contactForm/contactForm.html',
        controller: 'contactFormCtrl'
      });
  });
