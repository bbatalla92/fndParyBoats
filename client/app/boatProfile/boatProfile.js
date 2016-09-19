'use strict';

angular.module('fndParyBoatsApp')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('boatProfile', {
                url: '/charter/:id',
                params: {
                    preview: undefined
                },
                templateUrl: 'app/boatProfile/boatProfile.html',
                controller: 'profileCtrl'
            });
    }]);
