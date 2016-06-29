'use strict';

(function(){

angular.module('fndParyBoatsApp')
  .controller('NavbarController', function($scope, util, dbService, $state, $mdMenu){

    $scope.zipCode = '';
    $scope.$watch(function () {
      $scope.userFlag = dbService.getCurrentUser();

    });
    $scope.subheaderFlag = false;
    $scope.search = search();


    //====== Functons ======================

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

    $scope.home = function() {
      util.charterList = [];
    };

    function search(){
      console.log('navbar');
      /*util.stateSelected = null;
      util.charterList = [];
      util.zipCode = $scope.zipCode;
      $state.go('searchList')*/

    }

  });

})();
