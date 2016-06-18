'use strict';
(function(){

  angular.module('fndParyBoatsApp')
    .controller('profileCtrl', function($scope, util){

      $scope.charter = util.getCharter();
      console.log($scope.charter);





    });

})();
