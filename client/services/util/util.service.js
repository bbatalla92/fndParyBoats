'use strict';

(function(){
angular.module('fndParyBoatsApp')
  .factory('util', function () {
    var charter;
    var loggedInUser;

    function setCharter(chart){
      charter = chart;
    }



    function setLoggedInUser(user){
      loggedInUser = user;
    }
    function getLoggedInUser(){
      if(loggedInUser != null)
        return loggedInUser;

      return null
    }

    function getCharter(){
      return charter;
    }


    return {
      setCharter: setCharter,
      getCharter: getCharter,
      setLoggedInUser: setLoggedInUser,
      getLoggedInUser: getLoggedInUser
    };
  });

})();
