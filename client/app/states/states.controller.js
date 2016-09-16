'use strict';
(function(){



angular.module('fndParyBoatsApp')
  .controller('locationCtrl', ['constantsService', '$scope', 'util', 'dbService', '$state',function(constantsService, $scope, util, dbService, $state){

    $scope.states = [];
    $scope.loadingFlag = true;

    dbService.getAllStates().then(function(data){
      $scope.states = Object.keys(data);
      $scope.loadingFlag = false;

    });

    $scope.stateSelected = function(stat){
      util.charterList = [];
      util.stateSelected = stat;
      $state.go('searchList',{crit: stat});
    }


  }]);

})();
