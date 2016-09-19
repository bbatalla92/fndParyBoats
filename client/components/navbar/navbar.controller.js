'use strict';

(function () {

    angular.module('fndParyBoatsApp')
        .controller('NavbarController', ['$scope',  '$state', '$mdMenu', '$stateParams','util', 'dbService','$mdSidenav', function ($scope, $state, $mdMenu, $stateParams,util, dbService, $mdSidenav) {
            $scope.zip = undefined;
            $scope.$watch(function () {
                $scope.userFlag = dbService.getCurrentUser();
            });

            $scope.subheaderFlag = false;
            //$scope.search = search();
            //====== Functons ======================

            $scope.myPage = function (ev) {
                dbService.getFullUser($scope.userFlag).then(function (data) {
                    if (data.admin) {
                        $state.go('siteAdmin');
                    } else {
                        $state.go('admin');
                    }
                    $scope.closeMenu(ev);
                });
            };

            $scope.openDrawer = function(){
                $mdSidenav('left').toggle();
            };

            $scope.$watch(function () {
                    $scope.currentUrl = $state.current.url;
                if ($scope.currentUrl == '/' || $scope.currentUrl == '/admin') {
                    $scope.subheaderFlag = true;
                    return;
                }

                $scope.subheaderFlag = false;

            });

            $scope.logout = function (ev) {
                dbService.userLogout();
                $scope.userFlag = false;
                $state.go('main');
                $mdMenu.hide();
            };

            $scope.openMenu = function ($mdOpenMenu, ev) {
                $mdOpenMenu(ev);
            };

            $scope.closeMenu = function (ev) {
                $mdMenu.hide();
            };
            $scope.home = function () {
                util.charterList = [];
            };
            $scope.search = function () {
                //console.log('search', $state.current.url);
                util.stateSelected = null;
                util.charterList = [];
                util.zipCode = $scope.zip;
                $scope.zip = '';
                if ($state.current.name === 'searchList') {
                    $state.go($state.current, {crit: util.zipCode}, { reload: true, inherit: false, notify: true });
                    $scope.$digest();
                } else {
                    $state.go('searchList',{crit: util.zipCode});
                }

            }
        }]);

})();
