/**
 * Created by Brennan on 9/22/2016.
 */
(function () {

  angular.module('fndParyBoatsApp')
    .controller('footerCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {

      $scope.openPrivacyPolicy = function (ev) {
        $mdDialog.show({
          controller: 'footerCtrl',
          templateUrl: 'Dialogs/privacyPolicyDialog/privacyPolicy.html',
          targetEvent: ev,
          clickOutsideToClose: true
        });
      };

      $scope.openTermsOfUse = function (ev) {
        $mdDialog.show({
          controller: 'footerCtrl',
          templateUrl: 'Dialogs/termsOfUse/termsOfUse.html',
          targetEvent: ev,
          clickOutsideToClose: true
        });
      };

      $scope.closePrivacyPolicy = function () {
        $mdDialog.hide();
      }

    }]);

})();
