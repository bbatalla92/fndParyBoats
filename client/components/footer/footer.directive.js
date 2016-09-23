'use strict';

angular.module('fndParyBoatsApp')
  .directive('footer', function() {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      controller: 'footerCtrl'
    };
  });
