'use strict';

angular.module('fndParyBoatsApp', [
    'fndParyBoatsApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'firebase',
    'ngGeolocation',
    'angularTrix',
    
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
