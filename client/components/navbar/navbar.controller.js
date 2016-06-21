'use strict';

(function(){

angular.module('fndParyBoatsApp')
  .controller('NavbarController', function($scope, util, dbService, $state){

    $scope.$watch(function () {
      //console.log(util.getLoggedInUser());
      $scope.userFlag = util.getLoggedInUser();

    });


    $scope.logout = function(){

      dbService.userLogout();
      util.setLoggedInUser(null);
      $scope.userFlag = false;
      $state.go('')
    };

    $scope.openMenu = function($mdOpenMenu,ev) {
      $mdOpenMenu(ev);
    };


  });

})();
