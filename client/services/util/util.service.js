'use strict';

(function(){
  angular.module('fndParyBoatsApp')
  .factory('util',['$geolocation', '$q', function ($geolocation, $q) {
    var charter = undefined;
    var charterList = [];
    var featuredList = [];
    var loggedIn = false;
    var stateSelected = undefined;
    var zipCode = undefined;
    var geocoder = new google.maps.Geocoder();
    var previewCharter = undefined;

    function getLatLong(zip){
      var address = '';
      if(typeof zip === "string"){
        address = zip.toString();
      }else{
        address = zip.street + " " + zip.zipCode;
      }

      var location = $q.defer();
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

          location.lat = results[0].geometry.location.lat();
          location.long = results[0].geometry.location.lng();
          location.resolve(
          {
            lat:results[0].geometry.location.lat(),
            long:results[0].geometry.location.lng()
          });
        } else {
          console.log("Geocode was not successful for the following reason: " + status);
        }
      });
      return location.promise;
    }



    
    function getCurrentPosition(){
      var currentPostion = $q.defer();
      $geolocation.getCurrentPosition({
        timeout: 60000
      }).then(function(position) {
        currentPostion.resolve(position);
      });
      return currentPostion.promise;
    }
    function setCharter(chart){
      charter = chart;
    }

    function getCharter(){
      return charter;
    }


    return {
      setCharter: setCharter,
      getCharter: getCharter,
      loggedIn: loggedIn,
      zipCode: zipCode,
      charterList: charterList,
      featuredList: featuredList,
      stateSelected : stateSelected,
      getCurrentPosition:  getCurrentPosition,
      getLatLong : getLatLong,
      previewCharter: previewCharter  
    };
  }]);

})();
