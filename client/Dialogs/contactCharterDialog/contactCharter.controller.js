/**
 * Created by Brennan on 9/20/2016.
 */
(function(){

  angular.module('fndParyBoatsApp')
    .controller('contactCharterCtrl',['$scope', 'dbService', '$mdDialog','charterEmail', function($scope, dbService, $mdDialog,charterEmail) {
    $scope.contactCharter = {joinNewsLetter: true};
    $scope.messageSent = false;
      console.log('contact',charterEmail);

    $scope.sendContactCharter = function(){
      dbService.contactCharter($scope.contactCharter.from,charterEmail,$scope.contactCharter.subject,$scope.contactCharter.message,$scope.contactCharter.joinNewsLetter);
      $scope.messageSent = true;

    };

    $scope.cancelDialog = function(){
      $mdDialog.cancel();
    }



    }]);



    })();
