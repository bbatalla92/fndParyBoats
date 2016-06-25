'use strict';
(function(){



angular.module('fndParyBoatsApp')
  .controller('locationCtrl', function(constantsService, $scope, $dbService){

    $scope.states = constantsService.getStates();
    console.log($scope.states);



  });

})();
