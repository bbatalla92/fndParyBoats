'use strict';
(function(){

  angular.module('fndParyBoatsApp')
    .controller('searchCtrl', function($scope, util, dbService, $cookies, $stateParams) {
      // $scope.test = test();
      // Functions initiated
      $scope.setBoat = setBoat;

      $scope.loadingFlag = true;
      $scope.noCharterFlag = false;
      $scope.title = '';

      $scope.errorDesc = 'Sorry, no party boats in your area.  If you know of any, tell them about our site!'


      // Data variables
      $scope.charters = util.charterList;
      if($scope.charters.length < 1) {


        if(util.zipCode != null || util.stateSelected != null ) {

          if (util.stateSelected == null) {

            zipcodeFlags(util.zipCode);
            $cookies.put('searchKey', util.zipCode);
          } else {
            stateFlags(util.stateSelected);
            $cookies.put('searchKey', util.stateSelected);
          }
        }else if($cookies.get('searchKey') != undefined){
          var key = $cookies.get('searchKey');
          if(key.length === 2){
            stateFlags(key);
          }else{
            zipcodeFlags(key);
          }
        }
        else{
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
      }

      function zipcodeFlags(zip){

        $scope.title = zip;//;

        dbService.getCharterKeysByZip(zip).then(function (data) {
          $scope.loadingFlag = false;
          if (data == null && $scope.charters.length < 1)
            $scope.noCharterFlag = true;
          else {
            $scope.charters = data;
            util.charterList = data;
          }
        });


      }

      function stateFlags(state){
        $scope.title = state;
        dbService.getChartersByState(state).then(function (data) {
          $scope.charters = data;
          $scope.loadingFlag = false;
          util.charterList = data;
        });
      }








    })


})();
