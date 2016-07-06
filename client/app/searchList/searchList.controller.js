'use strict';
(function(){

  angular.module('fndParyBoatsApp')
    .controller('searchCtrl', function($scope, util, dbService) {
      // $scope.test = test();
      // Functions initiated
      $scope.setBoat = setBoat;



      $scope.loadingFlag = true;
      $scope.noCharterFlag = false;
      $scope.title = '';

      $scope.errorDesc = 'Sorry, there are no charters in this area! If you know any, send them an email and let them know how awesome this site could be with their help!'


      // Data variables
      $scope.charters = util.charterList;
      if($scope.charters.length < 1) {


        if(util.zipCode != null || util.stateSelected != null ) {
          if (util.stateSelected == null) {
            $scope.title = util.zipCode;

            dbService.getCharterKeysByZip(util.zipCode).then(function (data) {
              $scope.loadingFlag = false;
              if (data == null && $scope.charters.length < 1)
                $scope.noCharterFlag = true;
              else {
                $scope.charters = data;
                util.charterList = data;
              }
            });

          } else {
            $scope.title = util.stateSelected;
            dbService.getChartersByState(util.stateSelected).then(function (data) {
              $scope.charters = data;
              $scope.loadingFlag = false;
              util.charterList = data;
            });
          }
        }else{
          $scope.loadingFlag = false;
          $scope.noCharterFlag = true;
          $scope.errorDesc = 'Sorry, please try searching again.'
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
