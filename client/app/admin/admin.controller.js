'use strict';
(function(){

angular.module('fndParyBoatsApp')
  .controller('adminCtrl', function($scope, constantsService, $state, util, dbService){

    (function() {
      if (dbService.getCurrentUser() == null){
        console.log('No user logged in', util.loggedIn);
        $state.go('main');
      }
    })();




    $scope.states = constantsService.getStates();
    var curPost = {
      name: "",
      captain: '',
      website: '',
      email: '',
      phoneNumber:'',
      street:'',
      city:'',
      state:'',
      zipCode:'',
      description:'',
      image:'',
      distance:0
    };



    $scope.charter =
    {
      name: "",
      captain: '',
      website: '',
      email: '',
      phoneNumber:'',
      street:'',
      city:'',
      state:'',
      zipCode:'',
      description:'',
      image:'',
      distance:0
    };

    dbService.getCharterBoat().then(function(data){
      console.log('boat', data);
      curPost = angular.copy(data);
      $scope.charter = data;
    });

    $scope.cancelChanges = function(){
      $scope.charter = angular.copy(curPost);
      //console.log("test", curPost);
    };

    $scope.saveChanges = function(){
      curPost =  angular.copy($scope.charter);
      dbService.saveCharter($scope.charter);
    };
    $scope.previewChanges = function(){
      util.setCharter($scope.charter);
      $state.go('boatProfile');
      //console.log("Charter Logged", $scope.charter);
    };


    $scope.imageUpload = function(event){
      var files = event.target.files; //FileList object

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(file);
        console.log("image upload", file);
      }
    };
    $scope.stepsModel = [];

    $scope.imageIsLoaded = function(e){
      $scope.$apply(function() {
        $scope.stepsModel.push(e.target.result);
        $scope.charter.image =  $scope.stepsModel[0];
      });
    }















  });})();
