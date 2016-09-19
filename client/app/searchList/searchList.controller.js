'use strict';
(function () {

    angular.module('fndParyBoatsApp')
        .controller('searchCtrl', ['$scope', 'util', 'dbService', '$cookies','$state', function ($scope, util, dbService, $cookies, $state) {
            // $scope.test = test();
            // Functions initiated
            $scope.setBoat = setBoat;
            $scope.orderListBy = '';
            $scope.loadingFlag = true;
            $scope.noCharterFlag = false;
            $scope.title = '';
            $scope.errorDesc = 'Sorry, no party boats in your area.  If you know of any, tell them about our site!';
            // Data variables
            getSearchList();

            //=========functions ==============================================
            $scope.test = function () {
                console.log('test');
            };

            function getSearchList(){
                $scope.charters = util.charterList;
                var critLength = $state.params.crit.length;
                if (!$scope.charters.length) {

                    if ( critLength === 2 || critLength === 5) {
                        if(isState(critLength))
                            stateFlags($state.params.crit);
                        else
                            zipcodeFlags($state.params.crit)
                    } else {
                        $scope.loadingFlag = false;
                        $scope.noCharterFlag = true;
                    }
                } else {
                    $scope.loadingFlag = false;
                    if(isState(critLength))
                        $scope.title = 'in '+ $state.params.crit;
                    else
                        $scope.title = 'around '+ $state.params.crit;


                }
            }

            function isState(param){
                return param === 2;
            }

            function setBoat(charter) {
                util.setCharter(charter);
                var i = charter.id.slice(1);
                $state.go('boatProfile',{id:i});
            }

            function zipcodeFlags(zip) {
                $scope.title = 'around ' + zip;
                dbService.getCharterKeysByZip(zip).then(function (data) {
                    $scope.loadingFlag = false;
                    if (data == null && $scope.charters.length < 1)
                        $scope.noCharterFlag = true;
                    else {
                        $scope.charters = data;
                        util.charterList = data;
                        $scope.noCharterFlag = false;

                    }
                });
            }

            function stateFlags(state) {
                console.log('state?', state);
                $scope.title = 'in '+ state;
                dbService.getChartersByState(state.toUpperCase()).then(function (data) {
                    $scope.charters = data;
                    if (data === null || $scope.charters.length < 1) {
                        $scope.noCharterFlag = true;
                    }else {
                       util.charterList = data;
                        $scope.noCharterFlag = false;

                    }
                    $scope.loadingFlag = false;

                });
            }


        }])


})();
