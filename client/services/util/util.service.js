'use strict';

(function(){
angular.module('fndParyBoatsApp')
  .factory('util', function () {
    var charter;

    function setCharter(chart){
      charter = chart;
    }

    function getCharter(){
      return charter;
    }


    return {
      setCharter: setCharter,
      getCharter: getCharter
    };
  });

})();
