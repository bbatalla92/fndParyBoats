'use strict';

(function () {
    angular.module('fndParyBoatsApp')
        .controller('mainCtrl', ['$scope', '$mdDialog', '$state', 'util', 'dbService', function($scope, $mdDialog, $state, util, dbService) {

            $scope.active = 0;
            $scope.openLoginDialog = openLoginDialog;
            $scope.zipCode=undefined;
            $scope.search = search;
            $scope.newsLetterEmail = "";
            //$scope.test = test;
            $scope.featuredClick = featuredClick;
            $scope.featBoats = util.featuredList;
            $scope.emailAddedFlag = false;

            $scope.$watch(function () {
                $scope.userFlag = dbService.getCurrentUser();
            });


            // util.getCurrentPosition().then(function(data){
            //   if(util.featuredList.length < 1){
            //     dbService.getFeaturedCharterByZip(data.coords.latitude, data.coords.longitude)
            //       .then(function(data){
            //         $scope.featBoats = data;
            //       });
            //   }

            // });


            //======= functions ===========

            function search() {
                //console.log();
                util.stateSelected = null;
                util.charterList = [];
                util.zipCode = $scope.zipCode;
                $state.go('searchList',{crit: $scope.zipCode})
            }

            function featuredClick(x) {
                $state.go('boatProfile');
                util.setCharter(x);
            }

            function openLoginDialog(ev) {

                $mdDialog.show({
                    controller: 'loginCtrl',
                    templateUrl: 'Dialogs/loginDialog/loginDialog.html',
                    targetEvent: ev,
                    locals: {
                        createAccount: false,
                        charterID: null
                    },
                    clickOutsideToClose: true
                });
            }

            $scope.test = function () {
                console.log('Test');
            };

            $scope.saveNewsLetterEmail = function () {
                dbService.saveNewsLetterEmail($scope.newsLetterEmail);
                $scope.newsLetterEmail = "";
                $scope.emailAddedFlag = true;
            }


        }]
    )

})();
