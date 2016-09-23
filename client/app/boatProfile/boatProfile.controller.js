'use strict';
(function () {

    angular.module('fndParyBoatsApp')
        .controller('profileCtrl', ['$scope', 'util', '$cookies', '$state', 'dbService', '$mdToast', '$stateParams', '$mdDialog',
          function ($scope, util, $cookies, $state, dbService, $mdToast, $stateParams, $mdDialog) {
            $scope.loadingFlag = false;
            $scope.mapUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD7gE6eRHVSSO5ZVNoM2eNkElHp-Rig1jg';
            //  console.log('boat id', $stateParams);
            $scope.center = '';
            $scope.previewMode = false;

            if ($state.params.preview) {
                $scope.previewMode = true;
                util.previewCharter = null;
            } else {
                $scope.previewMode = false;
            }

// ===============  Getting Charter ===========================================================
            $scope.loadingFlag = true;
            getCharter();

            function getCharter(){

                if($state.params.id.charAt(0) === '-' ){
                    getCharterFromService($state.params.id, true);
                }else{
                    if(util.getCharter() != undefined){
                        $scope.loadingFlag = false;
                        $scope.charter = util.getCharter();
                    }else{
                        var str = '-' + $state.params.id.toString();
                        getCharterFromService(str, false);
                    }
                }

            }

            function getCharterFromService(id, newCharter){
                dbService.getCharterByID(id).then(function (charter) {
                    $scope.charter = charter;
                    $scope.loadingFlag = false;
                    if (charter.fosterID != undefined && newCharter) {
                        displayDialog(id);
                    }

                });
            }

            function displayDialog(id){
                $mdDialog.show({
                    controller: 'loginCtrl',
                    templateUrl: '../../Dialogs/loginDialog/loginDialog.html',
                    parent: angular.element(document.body),
                    locals: {
                        createAccount: true,
                        charterID: id
                    },
                    clickOutsideToClose: true

                });
            }


// ========================== Editing Mode =========================================================
            $scope.previewBack = function () {
                //$cookies.set('charter', );
                util.previewCharter = $scope.charter;
                $state.go('admin');
            };

            $scope.previewSave = function () {
                dbService.saveCharter($scope.charter);

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Saved!')
                        .position('bottom right')
                        .hideDelay(2000)
                );
                $state.go('admin');
            };

          $scope.openContactDialog = function(ev){
                $mdDialog.show({
                  controller: "contactCharterCtrl",
                  templateUrl: 'Dialogs/contactCharterDialog/contactCharter.html',
                  targetEvent: ev,
                  clickOutsideToClose:true,
                  locals:{
                    charterEmail: $scope.charter.email
                  }
                });
          }


        }]);
})();
