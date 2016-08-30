'use strict';
(function(){

  angular.module('fndParyBoatsApp')
  .controller('adminCtrl', function($scope, constantsService, $state, util, dbService, $mdToast){

    (function() {


      if (dbService.getCurrentUser() == null){
        //console.log('No user logged in', util.loggedIn);
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
      distance:0,
      featured: false
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
      distance:0,
      featured: false
    };


    var fullUser = {};
    dbService.getFullUser(dbService.getCurrentUser()).then(function(data){
      fullUser = data;
      if(data.admin){
        if(util.previewCharter === null){
          $scope.charter = util.getCharter();
          util.setCharter(null);
        }else{
          $scope.charter = angular.copy(util.previewCharter);
          util.previewCharter = null;
        }

      }else{
        if(util.previewCharter === undefined || util.previewCharter === null){
          dbService.getCharterBoat().then(function(data){
          curPost = angular.copy(data);
            $scope.charter = data;
        });
        }else{
            $scope.charter = angular.copy(util.previewCharter);
            util.previewCharter = null;
      }

      }
     // $scope.closeMenu(ev);
   });
    

    $scope.cancelChanges = function(){
      $scope.charter = angular.copy(curPost);
    };

    $scope.saveChanges = function(){
      curPost = angular.copy($scope.charter);
      dbService.saveCharter($scope.charter).then(function(data){
        if($scope.charter.id === undefined){
          $scope.charter.id = data;
        }
      });

      $mdToast.show(
        $mdToast.simple()
        .textContent('Saved!')
        .position('bottom right')
        .hideDelay(2000)
        );

    };


    $scope.previewChanges = function(){
      util.setCharter($scope.charter);
      util.previewCharter = $scope.charter;
      $state.go('boatProfile');
    };


    $scope.imageUpload = function(event){
      var files = event.target.files; //FileList object

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(file);
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
