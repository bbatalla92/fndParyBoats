/**
 * Created by Brennan on 6/19/2016.
 */
 "use strict";

 (function(){

  angular.module('fndParyBoatsApp')
  .controller('loginCtrl', function($scope, dbService, $mdDialog, $state, util, createAccount, charterID){

    if(createAccount){
      newUser();
    }else{
      loginUser();
    }

    $scope.newAccount = createAccount;
    $scope.loadingFlag = false;
    
    $scope.forgotPasswordFlag = false;
    $scope.user = {email:'', password: ''};
    $scope.newU = {email:'', password: '', conPass: ''};



    $scope.testDB = function(){
      dbService.testDB();
    };

    function newUser(){
      $scope.confirmingBoat = true;
      $scope.newAccount = true;
      $scope.title ='New Account'
    }

    function loginUser(){

      $scope.title = 'Login';
      $scope.confirmingBoat = false;
    }

    $scope.createUser = function(){
      $scope.loadingFlag = true;

      if(createAccount){
        dbService.createAccountFromCharterPage(charterID, $scope.newU).then(function(flag){
          if(flag){
            $state.go('admin');
            $mdDialog.cancel();
          }
          $scope.loadingFlag = false;
        });
      }else{
        dbService.createUser($scope.newU).then(function(data){
          if(data.message === undefined){
            $state.go('admin');
            $mdDialog.cancel();
          }else{
            $scope.newAccountError = "Sorry, that email is already in use."
          }
          $scope.loadingFlag = false;
        });
      }
    };


    $scope.login = function(){
      $scope.loadingFlag = true;
      dbService.userLogin($scope.user)
      .then(function(data){
          if(data.message != null){
            $scope.loginError = "Sorry, the email/password is incorrect.";
            $scope.loadingFlag = false;
          }else{
            $state.go('admin');
            $scope.loginError = undefined;
            $scope.loadingFlag = false;
            $mdDialog.cancel();
          }
    

        

      });


    };

    $scope.forgotPassword = function(email){
      dbService.forgotPassword(email);
      $mdDialog.cancel();
    }

    $scope.createAccountCancel = function(){

      $scope.newAccount = false;
      $scope.title='Login';
    }



  });


})();
