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
    'ngMap',
    'md.data.table'
  ])
  .config(['$urlRouterProvider', '$locationProvider','$mdThemingProvider',function($urlRouterProvider, $locationProvider, $mdThemingProvider) {

        var customPrimary = {
            '50': '#89d2e8',
            '100': '#74cae3',
            '200': '#5ec1df',
            '300': '#49b9db',
            '400': '#34b1d7',
            '500': '#28a4c9',
            '600': '#2493b4',
            '700': '#20819e',
            '800': '#1b7089',
            '900': '#175f74',
            'A100': '#9edaec',
            'A200': '#b4e2f0',
            'A400': '#c9eaf4',
            'A700': '#134d5f'
        };
        $mdThemingProvider
            .definePalette('customPrimary',
            customPrimary);

        var customAccent = {
            '50': '#0f493a',
            '100': '#135f4a',
            '200': '#17745b',
            '300': '#1b896c',
            '400': '#209e7d',
            '500': '#24b48d',
            '600': '#34d7ab',
            '700': '#49dbb4',
            '800': '#5edfbd',
            '900': '#74e3c5',
            'A100': '#34d7ab',
            'A200': '#28c99e',
            'A400': '#24b48d',
            'A700': '#89e8ce'
        };
        $mdThemingProvider
            .definePalette('customAccent',
            customAccent);

        var customWarn = {
            '50': '#ffb280',
            '100': '#ffa266',
            '200': '#ff934d',
            '300': '#ff8333',
            '400': '#ff741a',
            '500': '#ff6400',
            '600': '#e65a00',
            '700': '#cc5000',
            '800': '#b34600',
            '900': '#993c00',
            'A100': '#ffc199',
            'A200': '#ffd1b3',
            'A400': '#ffe0cc',
            'A700': '#803200'
        };
        $mdThemingProvider
            .definePalette('customWarn',
            customWarn);

        var customBackground = {
            '50': '#ffffff',
            '100': '#ffffff',
            '200': '#ffffff',
            '300': '#ffffff',
            '400': '#ffffff',
            '500': '#f5f5f5',
            '600': '#e8e8e8',
            '700': '#dbdbdb',
            '800': '#cfcfcf',
            '900': '#c2c2c2',
            'A100': '#ffffff',
            'A200': '#ffffff',
            'A400': '#ffffff',
            'A700': '#b5b5b5'
        };
        $mdThemingProvider
            .definePalette('customBackground',
            customBackground);

        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
            .accentPalette('customAccent')
            .warnPalette('customWarn')
            .backgroundPalette('customBackground');


    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

        var config = {
            apiKey: "AIzaSyCkDhfBJEjsAG_Ar12ZEO76w1UT-BKpe_s",
            authDomain: "findpartyboat.firebaseapp.com",
            databaseURL: "https://findpartyboat.firebaseio.com",
            storageBucket: "findpartyboat.appspot.com"
        };
        firebase.initializeApp(config);


  }]);
