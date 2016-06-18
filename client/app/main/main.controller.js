'use strict';

(function() {
  angular.module('fndParyBoatsApp')
    .controller('mainCtrl', function MainController($scope) {

        $scope.active = 0;

        $scope.zipCode = 80731;



        $scope.slides = [
          {
            image: 'assets/images/charter1.jpg',
            id: 0
          },{
            image: 'assets/images/charter2.jpg',
            id: 1
          },{
            image: 'assets/images/charter3.jpg',
            id: 2
          },{
            image: 'assets/images/charter4.jpg',
            id: 3
          },{
            image: 'assets/images/charter5.jpg',
            id: 4
          }
        ]
      }
    )

})();
