'use strict';
(function(){

  angular.module('fndParyBoatsApp')
    .controller('searchCtrl', function($scope, util, dbService) {
      // $scope.test = test();
      // Functions initiated
      $scope.setBoat = setBoat;



      $scope.loadingFlag = true;
      $scope.noCharterFlag = false;

      // Data variables
      $scope.charters = util.charterList;
      if($scope.charters.length < 1) {

        if(util.stateSelected == null) {

            dbService.getCharterKeysByZip(util.zipCode).then(function (data) {
              $scope.loadingFlag = false;
              if (data == null && $scope.charters.length < 1)
                $scope.noCharterFlag = true;
              else {
                $scope.charters = data;
                util.charterList = data;
              }
            });

        }else{
          dbService.getChartersByState(util.stateSelected).then(function(data){
            $scope.charters = data;
            $scope.loadingFlag = false;
            util.charterList = data;
          });
        }
      }else{
        $scope.loadingFlag = false;
      }

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
