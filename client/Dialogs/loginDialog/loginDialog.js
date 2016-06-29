/**
 * Created by Brennan on 6/19/2016.
 */
"use strict";

(function(){

  angular.module('fndParyBoatsApp')
    .controller('loginCtrl', function($scope, dbService, $mdDialog, $state, util){

      $scope.newAccount = false;
      $scope.loadingFlag = false;
      $scope.forgotPasswordFlag = false;
      $scope.user = {email:'', password: ''};
      $scope.newU = {email:'', password: '', conPass: ''};



      $scope.testDB = function(){
        dbService.testDB();
      };

      $scope.createUser = function(){
        $scope.loadingFlag = true;
        console.log('Creating User');
        dbService.createUser($scope.newU).then(function(data){
          if(data){
            $state.go('admin');
            $mdDialog.cancel();
          }
          $scope.loadingFlag = false;
        });

      };


      $scope.login = function(){
        $scope.loadingFlag = true;
        dbService.userLogin($scope.user)
          .then(function(data){
            if(data != null){
              $state.go('admin');
            }

            $scope.loadingFlag = false;
            $mdDialog.cancel();

          });


      };

      $scope.forgotPassword = function(email){
        console.log('Sending Email');
        dbService.forgotPassword(email);
        $mdDialog.cancel();
      }



    });


})();
