'use strict';

(function(){
angular.module('fndParyBoatsApp')
  .directive('navbar', function(){

    return{
      templateUrl: 'components/navbar/navbar.html',
      restrict: 'E',
      controller: 'NavbarController',
      controllerAs: 'nav'
    }
  });

})();
