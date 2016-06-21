/**
 * Created by Brennan on 6/19/2016.
 */
"use strict";

(function(){

  angular.module('fndParyBoatsApp')
    .controller('loginCtrl', function($scope, dbService, $mdDialog, $state, util){

      $scope.newAccount = false;
      $scope.forgotPasswordFlag = false;
      $scope.user = {email:'', password: ''};
      $scope.newU = {email:'brennan.batalla@gmail.com', password: 'cheeto1', conPass: ''};



      $scope.testDB = function(){
        dbService.testDB();
      };

      $scope.createUser = function(){
        console.log('Creating User');
        dbService.createUser($scope.newU).then(function(data){
          console.log("return Data",data);
          if(data != null){
            $state.go('admin');
            $mdDialog.cancel();

          }
        });
      };


      $scope.login = function(){
        dbService.userLogin($scope.user).then(function(data){

          if(data != null){
            util.setLoggedInUser(data);
            $state.go('admin');
            $mdDialog.cancel();

          }


          console.log('current user2: ', util.getLoggedInUser());
        });

      };

      $scope.forgotPassword = function(email){
        console.log('Sending Email');
        dbService.forgotPassword(email);
        $mdDialog.cancel();
      }



    });


})();
