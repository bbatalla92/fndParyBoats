'use strict';
(function(){

  angular.module('fndParyBoatsApp')
  .controller('profileCtrl', function($scope, util, $cookies, $state, dbService, $mdToast, $stateParams, $mdDialog){
    $scope.loadingFlag = false;
  //  console.log('boat id', $stateParams);

  if(util.previewCharter != null){
    $scope.previewMode = true;
    util.previewCharter = null;
  }else{
    $scope.previewMode = false;
  }

// ===============  Getting Charter ===========================================================
$scope.loadingFlag = true;
if($stateParams.id === undefined){
  if(util.getCharter() === undefined || util.getCharter() === null){
    if($cookies.get('charter') === undefined || $cookies.get('charter') === null){
      // No Charter Available, going to home screen
      $state.go('main');
    }else{
      // Getting Charter from cookies
      dbService.getCharterByID($cookies.get('charter')).then(function(data){
        $scope.loadingFlag = false;
        $scope.charter = data;
      });
    }
  }else{
    // Charter is set in util service
    $scope.charter = util.getCharter();
    $scope.loadingFlag = false;
    util.setCharter(null);
    $cookies.put('charter', $scope.charter.id);

  }
}else{
      // The charter ID is in the URL
      dbService.getCharterByID($stateParams.id).then(function(charter){
        $scope.charter = charter;
        $scope.loadingFlag = false;

        
        if(charter.fosterID != undefined){
          $mdDialog.show({
            controller: 'loginCtrl',
            templateUrl: '../../Dialogs/loginDialog/loginDialog.html',
            parent: angular.element(document.body),
            locals : {
              createAccount : true,
              charterID: charter.id
            }, 
            clickOutsideToClose: true

          });
        }

      })
    }
    
// ===================================================================================

$scope.previewBack = function(){
  //$cookies.set('charter', );
  util.previewCharter = $scope.charter;
  $state.go('admin');
}

$scope.previewSave = function(){
  dbService.saveCharter($scope.charter);

  $mdToast.show(
    $mdToast.simple()
    .textContent('Saved!')
    .position('bottom right')
    .hideDelay(2000)
    );
  $state.go('admin');
}


});})();
