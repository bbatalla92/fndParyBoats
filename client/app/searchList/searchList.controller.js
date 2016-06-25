'use strict';
(function(){

  angular.module('fndParyBoatsApp')
    .controller('searchCtrl', function($scope, util, dbService) {
     // $scope.test = test();
      // Functions initiated
      $scope.setBoat = setBoat;
      $scope.loadingFlag = true;


      // Data variables
      $scope.charters = [];

      dbService.getAllCharters().then(function(data){
        $scope.charters = data;
        $scope.loadingFlag = false;
      });



      //=========functions ==============================================
      $scope.test = function(){
        console.log('test');
      };

      function setBoat(charter){
        util.setCharter(charter);
        console.log("Charter Logged", charter);
      }







    })


})();
