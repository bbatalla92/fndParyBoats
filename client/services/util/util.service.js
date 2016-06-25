'use strict';

(function(){
angular.module('fndParyBoatsApp')
  .factory('util', function () {
    var charter;
    var loggedIn = false;
    function setCharter(chart){
      charter = chart;
    }

    function getCharter(){
      return charter;
    }


    return {
      setCharter: setCharter,
      getCharter: getCharter,
      loggedIn: loggedIn
    };
  });

})();
