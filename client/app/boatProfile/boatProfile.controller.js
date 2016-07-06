'use strict';
(function(){

  angular.module('fndParyBoatsApp')
    .controller('profileCtrl', function($scope, util, $cookies, $state){

      $scope.charter = util.getCharter();
      if($scope.charter != undefined){
        console.log('charter not undefined',$scope.charter);
       // $cookies.put('charter', JSON.stringify(''));
      }else {
        //console.log('cookies are undefined', $cookies.get('charter'));
        $state.go('main');
      }/*else{
        console.log('else');
        console.log('else', ""+$cookies.getObject('charter'));
        //$scope.charter = $cookies.getObject('charter');
      }*/



    });

})();
