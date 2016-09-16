'use strict';
(function () {
    angular.module('fndParyBoatsApp')
        .controller('contactFormCtrl',['$scope', 'dbService', '$timeout', function ($scope, dbService, $timeout) {
            var contactDefault =
            {
                name: "",
                subject: "",
                email: "",
                body: ''};
            $scope.contact = angular.copy(contactDefault);

            $scope.sendEmail = function () {
                //console.log('email sent',$scope.contact);
                dbService.sendContactUsEmail($scope.contact);
                $scope.sentFlag = true;

                $timeout(function () {
                }, 1500).then(function () {
                    $scope.sentFlag = false;
                });
                $scope.contact = angular.copy(contactDefault);

            }

        }]);

})();
