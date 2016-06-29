'use strict';
(function(){



angular.module('fndParyBoatsApp')
  .controller('locationCtrl', function(constantsService, $scope, util, dbService, $state){

    $scope.states = [];
    $scope.loadingFlag = true;

    dbService.getAllStates().then(function(data){
    //  console.log(data);
    //  console.log(Object.keys(data));
      $scope.states = Object.keys(data);
      $scope.loadingFlag = false;

    });

    $scope.stateSelected = function(state){
      util.charterList = [];
//      console.log(state);
      util.stateSelected = state;
      $state.go('searchList')
    }


  });

})();
