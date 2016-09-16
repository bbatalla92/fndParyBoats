'use strict';
(function () {

    angular.module('fndParyBoatsApp')
        .controller('adminCtrl', ['$scope', 'constantsService', '$state', 'util', 'dbService', '$mdToast', '$timeout', function ($scope, constantsService, $state, util, dbService, $mdToast, $timeout) {

            (function () {

                if (dbService.getCurrentUser() == null) {
                    //console.log('No user logged in', util.loggedIn);
                    $state.go('main');
                }
            })();


            $scope.savedFlag = false;
            $scope.states = constantsService.getStates();
            var curPost = {
                name: "",
                captain: '',
                website: '',
                email: '',
                phoneNumber: '',
                street: '',
                city: '',
                state: '',
                zipCode: '',
                description: '',
                image: '',
                distance: 0,
                featured: false,
                dateCreated: new Date(),
                displayGeneralInfo: false,
                boatSeason: {startMonth: '', endMonth: '', allYear: false},
                rates: [
                    {name: 'Adults', price: ''}
                ],
                departureTimes: [
                    {time: '7:00', ampm: 'am'}
                ],
                reservationRequired: false,
                onboardServices: [
                    {name: ''}
                ],
                additionalServices: [
                    {name: ''}
                ]

            };
            $scope.boatingSeasonFrom = constantsService.getMonths();
            $scope.boatingSeasonTo = constantsService.getMonths();
            $scope.charter =
            {
                name: "",
                captain: '',
                website: '',
                email: '',
                phoneNumber: '',
                street: '',
                city: '',
                state: '',
                zipCode: '',
                description: '',
                image: '',
                distance: 0,
                featured: false,
                dateCreated: new Date(),
                displayGeneralInfo: false,
                boatSeason: {startMonth: '', endMonth: '', allYear: false},
                rates: [
                    {name: 'Adults', price: ''}
                ],
                departureTimes: [
                    {time: '7:00', ampm: 'am'}
                ],
                reservationRequired: false,
                onboardServices: [
                    {name: ''}
                ],
                additionalServices: [
                    {name: ''}
                ]

            };
            getCharter();

            var fullUser = {};

            function getCharter() {
                dbService.getFullUser(dbService.getCurrentUser()).then(function (data) {

                    fullUser = data;
                    if (data.admin) {
                        if (util.previewCharter === undefined) {
                            $scope.charter = util.getCharter();
                            util.setCharter(undefined);
                            $scope.charter.description = "<div><!--block-->Hi,&nbsp;<br><br>Welcome to my site at findpartyboats.com!&nbsp; All my information can be found above.&nbsp; If you would like to see what I have to offer, please come check out my website!</div>"
                        } else {
                            $scope.charter = angular.copy(util.previewCharter);
                            util.previewCharter = null;
                        }

                    } else {
                        if (util.previewCharter === undefined || util.previewCharter === null) {
                            dbService.getCharterBoat().then(function (data) {
                                curPost = angular.copy(data);
                                $scope.charter = data;
                            });
                        } else {
                            $scope.charter = angular.copy(util.previewCharter);
                            util.previewCharter = null;
                        }

                    }
                });
            }


            $scope.cancelChanges = function () {
                $scope.charter = angular.copy(curPost);
            };

            $scope.saveChanges = function () {

                curPost = angular.copy($scope.charter);
                console.log('prop', curPost);

                if (curPost.email.includes("http://")) {
                    curPost.email = curPost.email.replace("http://", '');
                }
                dbService.saveCharter(curPost).then(function (data) {
                    if ($scope.charter.id === undefined) {
                        $scope.charter.id = data;
                    }
                });
                $scope.savedFlag = true;
                $timeout(function () {
                }, 1500).then(function () {
                    $scope.savedFlag = false;
                });

            };


            $scope.previewChanges = function () {
                util.setCharter($scope.charter);
                util.previewCharter = $scope.charter;
                $state.go('boatProfile');
            };


            $scope.imageUpload = function (event) {
                var files = event.target.files; //FileList object

                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var reader = new FileReader();
                    reader.onload = $scope.imageIsLoaded;
                    reader.readAsDataURL(file);
                }
            };
            $scope.stepsModel = [];

            $scope.imageIsLoaded = function (e) {
                $scope.$apply(function () {
                    $scope.stepsModel.push(e.target.result);
                    $scope.charter.image = $scope.stepsModel[0];
                });
            };

            $scope.addObjects = function (property) {
                var object = {};
                if($scope.charter[property] === undefined)
                    $scope.charter[property] = [];

                if (property === 'rates'){
                    object = {name: '', price: ''};
                }else if (property === 'departureTime') {
                    object = {time: '', ampm: 'am'};
                }else if (property === 'onboard')
                    object = {name: ''};
                else if (property === 'additional')
                    object = {name: ''};

                $scope.charter[property].push(angular.copy(object));
            }


        }]);
})();
