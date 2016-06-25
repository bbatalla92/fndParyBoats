'use strict';

(function(){

angular.module('fndParyBoatsApp')
  .controller('NavbarController', function($scope, util, dbService, $state, $mdMenu){

    $scope.zipCode = '';
    $scope.$watch(function () {
      $scope.userFlag = dbService.getCurrentUser();

    });
    $scope.subheaderFlag = false;

    $scope.$watch(function () {

      if( $state.current.url == '/' || $state.current.url == '/admin') {
        $scope.subheaderFlag = true;
        return;
      }

      $scope.subheaderFlag = false;

    });

    $scope.logout = function(ev){
      dbService.userLogout();
      $scope.userFlag = false;
      $state.go('main');
      $mdMenu.hide();
    };

    $scope.openMenu = function($mdOpenMenu,ev) {
      $mdOpenMenu(ev);
    };

    $scope.closeMenu = function(ev) {
      $mdMenu.hide();
    };

  });

})();
